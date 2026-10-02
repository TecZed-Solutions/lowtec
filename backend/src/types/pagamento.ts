import {
  GatewayPagamento,
  MetodoPagamento,
  StatusPagamento,
} from "@prisma/client";

export interface CreatePagamentoDTO {
  usuarioId: string;
  produtoId: string[];
  status: StatusPagamento;
  metodo: MetodoPagamento;
  gateway: GatewayPagamento;
  metadata?: object;
}

export interface AtualizarPagamentoDTO {
  status?: StatusPagamento;
  paidAt?: Date;
  gatewayId?: string;
  checkoutUrl?: string;
  metadata?: object
}
