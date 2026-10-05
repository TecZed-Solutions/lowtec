import { Request, Response } from "express";
import { Prisma, StatusPagamento } from "@prisma/client";
import { pagamentoService } from "../pagamento/pagamento.service.js";
import { mapInfinitePayMethod } from "../../utils/functions.js";

export class InfinitePayController {
  async processPayment(req: Request, res: Response) {
    try {
      const {
        transaction_nsu,
        order_nsu,
        amount,
        paid_amount,
        capture_method,
      } = req.body;

      if (!order_nsu || !transaction_nsu) {
        return res.status(400).json({
          error: "Dados inválidos no webhook.",
        });
      }

      const pagamento =
        await pagamentoService.findPagamentoByGatewayId(order_nsu);

      if (!pagamento) {
        return res.status(404).json({
          error: "Pagamento não encontrado.",
        });
      }

      // Webhook repetido / pagamento já processado
      if (pagamento.status === StatusPagamento.PAID) {
        return res.status(200).json({
          message: "Pagamento já processado.",
        });
      }

      const metodo = mapInfinitePayMethod(capture_method);

      const pagamentoAtualizado = await pagamentoService.update(pagamento.id, {
        status: StatusPagamento.PAID,
        paidAt: new Date(),
        metodo,
        metadata: {
          ...(pagamento.metadata &&
          typeof pagamento.metadata === "object" &&
          !Array.isArray(pagamento.metadata)
            ? pagamento.metadata
            : {}),
          webhook: {
            transaction_nsu,
            order_nsu,
            amount,
            paid_amount,
            capture_method,
            receivedAt: new Date().toISOString(),
          },
        },
      });

      return res.status(200).json({
        message: "Pagamento processado com sucesso.",
        pagamento: pagamentoAtualizado,
      });
    } catch (error) {
      console.error("Erro ao processar webhook da InfinitePay:", error);

      return res.status(500).json({
        error: "Erro interno ao processar pagamento.",
      });
    }
  }
}

export const infinitePayController = new InfinitePayController();
