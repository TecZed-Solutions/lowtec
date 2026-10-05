import prisma from "../../config/prisma.js";
import {
  MetodoPagamento,
  Pagamento,
  Prisma,
  StatusPagamento,
} from "@prisma/client";
import {
  AtualizarPagamentoDTO,
  CreatePagamentoDTO,
} from "../../types/pagamento.js";

export class PagamentoService {
  async findPagamentoByGatewayId(gatewayId: string): Promise<Pagamento | null> {
    return prisma.pagamento.findUnique({
      where: { gatewayId },
    });
  }

  async getPagamentosUsuario(
    id: string,
    options?: { status?: StatusPagamento; metodo?: MetodoPagamento },
  ): Promise<Pagamento[]> {
    return prisma.pagamento.findMany({
      where: {
        usuarioId: id,
        ...options,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async create(data: CreatePagamentoDTO): Promise<Pagamento> {
    return prisma.$transaction(async (tx) => {
      const usuario = await tx.usuario.findUnique({
        where: {
          id: data.usuarioId,
        },
      });

      if (!usuario) {
        throw new Error("Usuário não encontrado.");
      }

      const produtos = await tx.produto.findMany({
        where: {
          id: {
            in: data.produtoId,
          },
        },
      });

      if (produtos.length !== data.produtoId.length) {
        throw new Error("Um ou mais produtos não foram encontrados.");
      }

      let value = new Prisma.Decimal(0);
      let discount = new Prisma.Decimal(0);

      for (const produto of produtos) {
        value = value.plus(produto.valor);
        discount = discount.plus(produto.discount);
      }

      const pagamento = await tx.pagamento.create({
        data: {
          usuarioId: data.usuarioId,
          status: data.status,
          gateway: data.gateway,
          value,
          discount,
          metadata: data.metadata,
        },
      });

      await tx.compra.createMany({
        data: produtos.map((produto) => ({
          usuarioId: data.usuarioId,
          produtoId: produto.id,
          pagamentoId: pagamento.id,
          valor: produto.valor,
          discount: produto.discount,
        })),
      });

      return pagamento;
    });
  }

  async update(id: string, data: AtualizarPagamentoDTO): Promise<Pagamento> {
    return prisma.pagamento.update({
      where: { id },
      data,
    });
  }
}

export const pagamentoService = new PagamentoService();
