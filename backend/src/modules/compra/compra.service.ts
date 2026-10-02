import { Compra, StatusPagamento } from "@prisma/client";
import prisma from "../../config/prisma.js";
export class CompraService {
  async getComprasByPagamentoId(pagamentoId: string) {
    return prisma.compra.findMany({
      where: {
        pagamentoId,
      },
      include: {
        produto: true,
      },
    });
  }

  async getComprasUsuario(id: string): Promise<Compra[]> {
    return prisma.compra.findMany({
      where: {
        usuarioId: id,
        pagamento: {
          status: StatusPagamento.PAID,
        },
      },
      include: {
        produto: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}

export const compraService = new CompraService();
