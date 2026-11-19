import { Admin } from "@/types/admin";
import { ApiError } from "@/types/error";

export class AdminService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL;
  async login(username: string, password: string): Promise<Admin | ApiError> {
    try {
      const response = await fetch(`${this.baseUrl}/admin/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { message: data?.message || "Erro ao fazer login." };
      }

      return data.admin;
    } catch (error) {
      console.error("Erro inesperado ao fazer login:", error);
      return { message: "Não foi possível conectar ao servidor." };
    }
  }

  async verificarFactor(token: string): Promise<string | ApiError> {
    try {
      const response = await fetch(`${this.baseUrl}/admin/verificar-factor`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { message: data?.message || "Erro ao verificar fator." };
      }

      return data.message;
    } catch (error) {
      console.error("Erro inesperado ao verificar fator:", error);
      return { message: "Não foi possível conectar ao servidor." };
    }
  }

  async getfaturamento(
    inicio?: string,
    fim?: string,
  ): Promise<number | ApiError> {
    try {
      const params = new URLSearchParams();

      if (inicio) params.append("inicio", inicio);
      if (fim) params.append("fim", fim);

      const query = params.toString();

      const response = await fetch(
        `${this.baseUrl}/admin/faturamento?${query}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        return { message: data?.message || "Erro ao buscar faturamento." };
      }

      return data.faturamento;
    } catch (error) {
      console.error("Erro inesperado:", error);
      return { message: "Não foi possível conectar ao servidor." };
    }
  }

  async getQuantidadeUsuarios(): Promise<number | ApiError> {
    try {
      const response = await fetch(`${this.baseUrl}/admin/usuarios`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        return { message: data?.message || "Erro ao buscar usuários." };
      }

      return data.quantidade;
    } catch (error) {
      console.error("Erro inesperado:", error);
      return { message: "Não foi possível conectar ao servidor." };
    }
  }

  async getQuantidadeCompras(): Promise<number | ApiError> {
    try {
      const response = await fetch(`${this.baseUrl}/admin/compras`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        return { message: data?.message || "Erro ao buscar compras." };
      }

      return data.quantidade;
    } catch (error) {
      console.error("Erro inesperado:", error);
      return { message: "Não foi possível conectar ao servidor." };
    }
  }
}

export const adminService = new AdminService();
