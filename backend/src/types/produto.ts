export interface CreateProdutoDTO {
  name: string;
  valor: number | string;
  discount?: number | string;
  downloadUrl: string;
}
