import { Admin, Pagamento, Prisma, StatusPagamento } from "@prisma/client";
import {
  CreateAdminDTO,
  GetComprasOptions,
  GetPagamentosOptions,
  GetPeriodoOptions,
} from "../../types/admin.js";
import prisma from "../../config/prisma.js";

export class AdminService {
  async findByUsername(username: string): Promise<Admin | null> {
    return prisma.admin.findUnique({
      where: { username },
    });
  }

  async create(data: CreateAdminDTO): Promise<Admin> {
    return prisma.admin.create({
      data,
    });
  }

  async getFaturamento(options: GetPagamentosOptions = {}) {
    const where: Prisma.PagamentoWhereInput = {
      status: options.status ?? StatusPagamento.PAID,
    };

    if (options.inicio || options.fim) {
      where.paidAt = {
        ...(options.inicio && {
          gte: options.inicio,
        }),
        ...(options.fim && {
          lte: options.fim,
        }),
      };
    }

    const resultado = await prisma.pagamento.aggregate({
      where,
      _sum: {
        value: true,
      },
    });

    return resultado._sum.value ?? new Prisma.Decimal(0);
  }

  async getQuantidadeUsuarios(options: GetPeriodoOptions = {}) {
    const where: Prisma.UsuarioWhereInput = {};

    if (options.inicio || options.fim) {
      where.createdAt = {
        ...(options.inicio && {
          gte: options.inicio,
        }),
        ...(options.fim && {
          lte: options.fim,
        }),
      };
    }

    return prisma.usuario.count({
      where,
    });
  }

  async getQuantidadeCompras(options: GetComprasOptions = {}) {
    const where: Prisma.CompraWhereInput = {};

    if (options.status) {
      where.pagamento = {
        status: options.status,
      };
    }

    if (options.inicio || options.fim) {
      where.createdAt = {
        ...(options.inicio && {
          gte: options.inicio,
        }),
        ...(options.fim && {
          lte: options.fim,
        }),
      };
    }

    return prisma.compra.count({
      where,
    });
  }
}

export const adminService = new AdminService();
