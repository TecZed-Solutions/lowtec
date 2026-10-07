import type { Compra } from "./compra";
import type { Produto } from "./produto";

export type StatusPagamento =
  "PENDING" | "PAID" | "FAILED" | "CANCELLED" | "REFUNDED";
export type MetodoPagamento = "PIX" | "CREDIT_CARD" | "DEBIT_CARD";

export interface Pagamento {
  id: string;
  usuarioId: string;
  status: StatusPagamento;
  paidAt: string | null;
  value: string;
  discount: string;
  metodo: MetodoPagamento | null;
  createdAt: string;
}

export interface PagamentoComCompras extends Pagamento {
  compras: (Compra & { produto: Pick<Produto, "id" | "name"> })[];
}
