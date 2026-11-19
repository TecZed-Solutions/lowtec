import { ApiError } from "@/types/error";
import { Usuario } from "@/types/usuario";

export class UsuarioService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL;

  async getInfoUsuario(): Promise<Usuario | ApiError> {
    try {
      const response = await fetch(`${this.baseUrl}/usuario/me`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        return { message: data?.message || "Erro ao buscar usuário." };
      }

      return data.usuario;
    } catch (error) {
      console.error("Erro inesperado ao buscar usuário:", error);
      return { message: "Não foi possível conectar ao servidor." };
    }
  }

  async registroLocal(
    nome: string,
    email: string,
    password: string,
    confirmPassword: string,
  ): Promise<string | ApiError> {
    try {
      const response = await fetch(`${this.baseUrl}/usuario/registro`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, password, confirmPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { message: data?.message || "Erro ao realizar cadastro." };
      }

      return data.message;
    } catch (error) {
      console.error("Erro inesperado ao realizar cadastro:", error);
      return { message: "Não foi possível conectar ao servidor." };
    }
  }

  async verificarEmail(token: string): Promise<string | ApiError> {
    try {
      const response = await fetch(`${this.baseUrl}/usuario/verificar-email`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { message: data?.message || "Erro ao confirmar e-mail." };
      }

      return data.message;
    } catch (error) {
      console.error("Erro inesperado ao confirmar e-mail:", error);
      return { message: "Não foi possível conectar ao servidor." };
    }
  }

  async loginLocal(
    email: string,
    password: string,
  ): Promise<string | ApiError> {
    try {
      const response = await fetch(`${this.baseUrl}/usuario/login-local`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { message: data?.message || "Erro ao realizar login." };
      }

      return data.message;
    } catch (error) {
      console.error("Erro inesperado ao realizar login:", error);
      return { message: "Não foi possível conectar ao servidor." };
    }
  }

  async loginGoogle(credential: string): Promise<string | ApiError> {
    try {
      const response = await fetch(`${this.baseUrl}/usuario/login-google`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          message: data?.message || "Não foi possível autenticar com o Google.",
        };
      }

      return data.message;
    } catch (error) {
      console.error("Erro inesperado ao autenticar com o Google:", error);
      return { message: "Não foi possível conectar ao servidor." };
    }
  }

  async logout(): Promise<string | ApiError> {
    try {
      const response = await fetch(`${this.baseUrl}/usuario/logout`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        return { message: data?.message || "Erro ao realizar logout." };
      }

      return data.message;
    } catch (error) {
      console.error("Erro inesperado ao realizar logout:", error);
      return { message: "Não foi possível conectar ao servidor." };
    }
  }

  async enviarTokenSenha(email: string): Promise<string | ApiError> {
    try {
      const response = await fetch(
        `${this.baseUrl}/usuario/enviar-reset-token`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          message: data?.message || "Erro ao solicitar recuperação de senha.",
        };
      }

      return data.message;
    } catch (error) {
      console.error(
        "Erro inesperado ao solicitar recuperação de senha:",
        error,
      );
      return { message: "Não foi possível conectar ao servidor." };
    }
  }

  async verificarTokenSenha(
    email: string,
    resetToken: string,
  ): Promise<string | ApiError> {
    try {
      const response = await fetch(
        `${this.baseUrl}/usuario/verificar-reset-token`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, resetToken }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        return { message: data?.message || "Erro ao verificar código." };
      }

      return data.message;
    } catch (error) {
      console.error("Erro inesperado ao verificar código:", error);
      return { message: "Não foi possível conectar ao servidor." };
    }
  }

  async redefinirSenhaToken(
    email: string,
    resetToken: string,
    password: string,
    confirmPassword: string,
  ): Promise<string | ApiError> {
    try {
      const response = await fetch(
        `${this.baseUrl}/usuario/atualizar-senha-token`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            resetToken,
            password,
            confirmPassword,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        return { message: data?.message || "Erro ao redefinir senha." };
      }

      return data.message;
    } catch (error) {
      console.error("Erro inesperado ao redefinir senha:", error);
      return { message: "Não foi possível conectar ao servidor." };
    }
  }

  async redefinirSenha(
    password: string,
    confirmPassword: string,
  ): Promise<string | ApiError> {
    try {
      const response = await fetch(`${this.baseUrl}/usuario/atualizar-senha`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, confirmPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { message: data?.message || "Erro ao redefinir senha." };
      }

      return data.message;
    } catch (error) {
      console.error("Erro inesperado ao redefinir senha:", error);
      return { message: "Não foi possível conectar ao servidor." };
    }
  }

  async atualizarFoto(
    arquivo: File,
  ): Promise<Pick<Usuario, "imageUrl"> | ApiError> {
    if (!["image/jpeg", "image/png", "image/webp"].includes(arquivo.type)) {
      return {
        message: "Formato de imagem não permitido. Use JPG, PNG ou WebP.",
      };
    }

    if (arquivo.size > 5 * 1024 * 1024) {
      return { message: "A imagem deve ter no máximo 5 MB." };
    }

    try {
      const formData = new FormData();
      formData.append("avatar", arquivo);

      const response = await fetch(`${this.baseUrl}/usuario/atualizar-foto`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        return { message: data?.message || "Erro ao atualizar avatar." };
      }

      return data.usuario;
    } catch (error) {
      console.error("Erro inesperado ao atualizar avatar:", error);
      return { message: "Não foi possível conectar ao servidor." };
    }
  }

  async atualizarPerfil(
    nome?: string,
    phone?: string | null,
  ): Promise<Usuario | ApiError> {
    try {
      const response = await fetch(`${this.baseUrl}/usuario/atualizar-perfil`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { message: data?.message || "Erro ao atualizar perfil." };
      }

      return data.usuario;
    } catch (error) {
      console.error("Erro inesperado ao atualizar perfil:", error);
      return { message: "Não foi possível conectar ao servidor." };
    }
  }
}

export const usuarioService = new UsuarioService();
