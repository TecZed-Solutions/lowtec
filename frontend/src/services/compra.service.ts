import { CompraComProduto } from "@/types/compra";
import { ApiError } from "@/types/error";

export class CompraService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL;
  async getComprasUsuario(): Promise<CompraComProduto[] | ApiError> {
    try {
      const response = await fetch(`${this.baseUrl}/compra/todas`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        return { message: data?.message || "Erro ao buscar compras." };
      }

      return data.compras;
    } catch (error) {
      console.error("Erro inesperado:", error);
      return { message: "Não foi possível conectar ao servidor." };
    }
  }
}
export const compraService = new CompraService();
