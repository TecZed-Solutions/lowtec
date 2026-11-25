import { Request, Response } from "express";
import { StatusPagamento } from "@prisma/client";
import { pagamentoService } from "../pagamento/pagamento.service.js";
import { mapInfinitePayMethod } from "../../utils/functions.js";
import { notificarCompraMeta } from "../../integration/meta/index.js";
import { checkInfinitePayPayment } from "../../integration/infinitePay/index.js";

export class InfinitePayController {
  async processPayment(req: Request, res: Response) {
    try {
      const { transaction_nsu, order_nsu, invoice_slug } = req.body ?? {};

      if (
        typeof order_nsu !== "string" ||
        typeof transaction_nsu !== "string" ||
        typeof invoice_slug !== "string"
      ) {
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

      let verificacao;
      try {
        verificacao = await checkInfinitePayPayment(
          order_nsu,
          transaction_nsu,
          invoice_slug,
        );
      } catch {
        return res.status(502).json({
          error: "Não foi possível confirmar o pagamento com a InfinitePay.",
        });
      }

      if (!verificacao.paid) {
        console.warn(
          `Webhook da InfinitePay não confirmado pela consulta: ${order_nsu} / ${transaction_nsu}.`,
        );
        return res.status(400).json({
          error: "Pagamento não confirmado pela InfinitePay.",
        });
      }

      // Qualquer um pode criar um link com o nosso handle e um order_nsu
      // existente: o valor cobrado precisa ser o do pedido.
      const valorEsperado = pagamento.value.minus(pagamento.discount).mul(100);

      if (!valorEsperado.equals(verificacao.amount)) {
        console.warn(
          `Valor divergente no pagamento ${order_nsu}: esperado ${valorEsperado} centavos, InfinitePay informou ${verificacao.amount}.`,
        );
        return res.status(400).json({
          error: "Valor do pagamento divergente.",
        });
      }

      const metodo = mapInfinitePayMethod(verificacao.captureMethod);

      const pagamentoAtualizado = await pagamentoService.markAsPaid(pagamento.id, {
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
            invoice_slug,
            amount: verificacao.amount,
            paid_amount: verificacao.paidAmount,
            capture_method: verificacao.captureMethod,
            receivedAt: new Date().toISOString(),
          },
        },
      });

      if (!pagamentoAtualizado) {
        return res.status(200).json({
          message: "Pagamento já processado.",
        });
      }

      void notificarCompraMeta(pagamentoAtualizado);

      return res.status(200).json({
        message: "Pagamento processado com sucesso.",
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
