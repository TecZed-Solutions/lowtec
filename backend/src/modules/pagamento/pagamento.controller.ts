import { Request, Response } from "express";
import { AuthRequest } from "../../types/auth.js";
import {
  GatewayPagamento,
  MetodoPagamento,
  StatusPagamento,
} from "@prisma/client";
import { pagamentoService } from "./pagamento.service.js";
import { createInfinitePayLink } from "../../integration/infinitePay/index.js";
import { compraService } from "../compra/compra.service.js";

export class PagamentoController {
  async create(req: AuthRequest, res: Response) {
    try {
      if (!req.usuario) {
        return res.status(401).json({
          message: "Usuário não autenticado.",
        });
      }

      const usuarioId = req.usuario.id;

      const { produtoId, gateway } = req.body;

      if (!Array.isArray(produtoId) || produtoId.length === 0) {
        return res.status(400).json({
          message: "É necessário informar pelo menos um produto.",
        });
      }

      if (!gateway) {
        return res.status(400).json({
          message: "Método e gateway são obrigatórios.",
        });
      }

      if (!Object.values(GatewayPagamento).includes(gateway)) {
        return res.status(400).json({
          message: "Gateway de pagamento inválido.",
        });
      }

      const pagamento = await pagamentoService.create({
        usuarioId,
        produtoId,
        status: StatusPagamento.PENDING,
        gateway,
      });

      switch (gateway) {
        case GatewayPagamento.INFINITEPAY: {
          const compras = await compraService.getComprasByPagamentoId(
            pagamento.id,
          );

          const items = compras.map((compra) => ({
            description: compra.produto.name,
            quantity: 1,
            price: compra.valor.minus(compra.discount).mul(100).toNumber(),
          }));

          const order_nsu = `pedido-${pagamento.id}`;

          const infinitePay = await createInfinitePayLink(items, order_nsu);

          const pagamentoAtualizado = await pagamentoService.update(
            pagamento.id,
            {
              gatewayId: order_nsu,
              checkoutUrl: infinitePay.checkoutUrl,
              metadata: infinitePay.raw,
            },
          );

          return res.status(201).json({
            message: "Checkout criado com sucesso.",
            pagamento: pagamentoAtualizado,
            checkoutUrl: pagamentoAtualizado.checkoutUrl,
          });
        }

        default:
          return res.status(400).json({
            message: "Gateway de pagamento não suportado.",
          });
      }
    } catch (error) {
      console.error("Erro ao criar pagamento:", error);

      return res.status(500).json({
        message: "Erro interno ao criar pagamento.",
      });
    }
  }
}

export const pagamentoController = new PagamentoController();
