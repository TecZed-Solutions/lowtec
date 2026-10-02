import { StatusPagamento } from "@prisma/client";

export interface CreateAdminDTO {
  username: string;
  name: string;
  password: string;
  twoFactor: string;
}

export interface GetPeriodoOptions {
  inicio?: Date;
  fim?: Date;
}

export interface GetPagamentosOptions extends GetPeriodoOptions {
  status?: StatusPagamento;
}

export interface GetComprasOptions extends GetPeriodoOptions {
  status?: StatusPagamento;
}
