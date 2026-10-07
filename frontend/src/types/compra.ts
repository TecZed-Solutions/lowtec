import type { Produto } from "./produto";

export interface Compra {
  id: string;
  usuarioId: string;
  produtoId: string;
  pagamentoId: string;
  valor: string;
  discount: string;
  createdAt: string;
}

export interface CompraComProduto extends Compra {
  produto: Produto;
}
