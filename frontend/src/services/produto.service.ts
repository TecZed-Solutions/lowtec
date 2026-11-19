import { ApiError } from "@/types/error";

export class ProdutoService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL;
  async download(produtoId: string): Promise<string | ApiError> {
    try {
      const response = await fetch(
        `${this.baseUrl}/produto/${encodeURIComponent(produtoId)}/download`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        return { message: data?.message || "Erro ao baixar o produto." };
      }

      return data.downloadUrl;
    } catch (error) {
      console.error("Erro inesperado ao baixar o produto:", error);
      return { message: "Não foi possível conectar ao servidor." };
    }
  }
}

export const produtoService = new ProdutoService();
