import type { PagamentoComCompras } from "@/types/pagamento";

import { COMPRAS } from "./compra";
import { PRODUTO_EBOOK } from "./produto";
import { USUARIO } from "./usuario";

export const PAGAMENTOS: PagamentoComCompras[] = [
  {
    id: "8f3a2c1e-7d4b-4a9e-b2c5-6e1f0a9d3b47",
    usuarioId: USUARIO.id,
    status: "PAID",
    paidAt: "2026-09-12T14:32:00.000Z",
    value: PRODUTO_EBOOK.valor,
    discount: PRODUTO_EBOOK.discount,
    metodo: "PIX",
    createdAt: "2026-09-12T14:28:00.000Z",
    compras: COMPRAS.map(({ produto, ...compra }) => ({
      ...compra,
      produto: { id: produto.id, name: produto.name },
    })),
  },
  {
    id: "1b9e4d7a-3c2f-4e8b-a6d1-9f5c0e2b8a63",
    usuarioId: USUARIO.id,
    status: "FAILED",
    paidAt: null,
    value: PRODUTO_EBOOK.valor,
    discount: PRODUTO_EBOOK.discount,
    metodo: "CREDIT_CARD",
    createdAt: "2026-09-12T14:15:00.000Z",
    compras: [
      {
        id: "e7c1b5d9-8a3f-4d2e-b6c4-3f9a0d1e5b78",
        usuarioId: USUARIO.id,
        produtoId: PRODUTO_EBOOK.id,
        pagamentoId: "1b9e4d7a-3c2f-4e8b-a6d1-9f5c0e2b8a63",
        valor: PRODUTO_EBOOK.valor,
        discount: PRODUTO_EBOOK.discount,
        createdAt: "2026-09-12T14:15:00.000Z",
        produto: { id: PRODUTO_EBOOK.id, name: PRODUTO_EBOOK.name },
      },
    ],
  },
];
