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

export type Utm = Partial<
  Record<"source" | "medium" | "campaign" | "content" | "term", string>
>;

export interface RastreioPagamento {
  fbp?: string;
  fbc?: string;
  ip?: string;
  userAgent?: string;
  utm?: Utm;
}

export interface AtualizarPagamentoDTO {
  status?: StatusPagamento;
  metodo?: MetodoPagamento;
  paidAt?: Date;
  gatewayId?: string;
  checkoutUrl?: string;
  metadata?: object;
}
