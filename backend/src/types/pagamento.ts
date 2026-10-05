import {
  GatewayPagamento,
  MetodoPagamento,
  StatusPagamento,
} from "@prisma/client";

export interface CreatePagamentoDTO {
  usuarioId: string;
  produtoId: string[];
  status: StatusPagamento;
  gateway: GatewayPagamento;
  metadata?: object;
}

export interface AtualizarPagamentoDTO {
  status?: StatusPagamento;
  metodo?: MetodoPagamento;
  paidAt?: Date;
  gatewayId?: string;
  checkoutUrl?: string;
  metadata?: object;
}
