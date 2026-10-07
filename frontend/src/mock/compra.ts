import type { CompraComProduto } from "@/types/compra";

import { PRODUTO_EBOOK } from "./produto";
import { USUARIO } from "./usuario";

export const COMPRAS: CompraComProduto[] = [
  {
    id: "a4f8c3e1-2b7d-4e9a-8c6f-0d5b1e3a7c92",
    usuarioId: USUARIO.id,
    produtoId: PRODUTO_EBOOK.id,
    pagamentoId: "8f3a2c1e-7d4b-4a9e-b2c5-6e1f0a9d3b47",
    valor: PRODUTO_EBOOK.valor,
    discount: PRODUTO_EBOOK.discount,
    createdAt: "2026-09-12T14:28:00.000Z",
    produto: PRODUTO_EBOOK,
  },
];
