import type { PagamentoComCompras } from "@/types/pagamento";

import { PRODUTO_EBOOK } from "./produto";

const COMPRAS_EBOOK = [
  { produto: { id: PRODUTO_EBOOK.id, name: PRODUTO_EBOOK.name } },
];

export const PAGAMENTOS: PagamentoComCompras[] = [
  {
    id: "8f3a2c1e-7d4b-4a9e-b2c5-6e1f0a9d3b47",
    status: "PAID",
    paidAt: "2026-09-12T14:32:00.000Z",
    value: PRODUTO_EBOOK.valor,
    discount: PRODUTO_EBOOK.discount,
    metodo: "PIX",
    createdAt: "2026-09-12T14:28:00.000Z",
    compras: COMPRAS_EBOOK,
  },
  {
    id: "1b9e4d7a-3c2f-4e8b-a6d1-9f5c0e2b8a63",
    status: "FAILED",
    paidAt: null,
    value: PRODUTO_EBOOK.valor,
    discount: PRODUTO_EBOOK.discount,
    metodo: "CREDIT_CARD",
    createdAt: "2026-09-12T14:15:00.000Z",
    compras: COMPRAS_EBOOK,
  },
];
