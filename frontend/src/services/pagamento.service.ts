import { ApiError } from "@/types/error";
import { PagamentoComCompras, RastreioPagamento } from "@/types/pagamento";

export class PagamentoService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL;
  async create(
    produtoId: string,
    rastreio?: RastreioPagamento,
  ): Promise<string | ApiError> {
    try {
      const response = await fetch(`${this.baseUrl}/pagamento/create`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          produtoId: [produtoId],
          gateway: "INFINITEPAY",
          rastreio,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { message: data?.message || "Erro ao fazer pagamento." };
      }

      return data.checkoutUrl;
    } catch (error) {
      console.error("Erro inesperado ao fazer pagamento:", error);
      return { message: "Não foi possível conectar ao servidor." };
    }
  }

  async buscarPagamentosUsuario(): Promise<PagamentoComCompras[] | ApiError> {
    try {
      const response = await fetch(`${this.baseUrl}/pagamento/todos`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        return { message: data?.message || "Erro ao buscar pagamentos." };
      }

      return data.pagamentos;
    } catch (error) {
      console.error("Erro inesperado ao buscar pagamentos:", error);
      return { message: "Não foi possível conectar ao servidor." };
    }
  }
}

export const pagamentoService = new PagamentoService();
