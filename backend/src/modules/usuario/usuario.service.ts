import { Usuario } from "@prisma/client";
import prisma from "../../config/prisma.js";
import {
  AtualizarFotoUsuarioDTO,
  AtualizarPerfilUsuarioDTO,
  AtualizarTokenUsuarioDTO,
  CriarUsuarioGoogleDTO,
  CriarUsuarioLocalDTO,
} from "../../types/usuario.js";

export class UsuarioService {
  //BUSCAR USUÁRIO
  async findById(id: string): Promise<Usuario | null> {
    return prisma.usuario.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return prisma.usuario.findUnique({
      where: { email },
    });
  }

  async findByEmailVerificationToken(token: string): Promise<Usuario | null> {
    return prisma.usuario.findFirst({
      where: {
        emailVerificationToken: token,
      },
    });
  }

  // CRIAR USUÁRIO
  async createLocal(data: CriarUsuarioLocalDTO): Promise<Usuario> {
    const usuarioExistente = await prisma.usuario.findUnique({
      where: {
        email: data.email,
      },
    });

    if (usuarioExistente) {
      throw new Error("E-mail já cadastrado.");
    }

    return prisma.usuario.create({
      data,
    });
  }

  async createGoogle(data: CriarUsuarioGoogleDTO): Promise<Usuario> {
    const usuarioExistente = await prisma.usuario.findUnique({
      where: {
        email: data.email,
      },
    });

    if (usuarioExistente) {
      throw new Error("E-mail já cadastrado.");
    }

    return prisma.usuario.create({
      data,
    });
  }
  //ATUALIZAR APENAS A SENHA
  async updateSenha(email: string, password: string): Promise<Usuario> {
    return prisma.usuario.update({
      where: { email },
      data: { password },
    });
  }

  //ATUALIZAR USUÁRIO
  async updatePerfil(
    id: string,
    data: AtualizarPerfilUsuarioDTO,
  ): Promise<
    Omit<
      Usuario,
      | "password"
      | "imageKey"
      | "emailVerificationToken"
      | "emailVerificationExpiresAt"
      | "resetTokenExpiresAt"
      | "resetPasswordToken"
    >
  > {
    return prisma.usuario.update({
      where: { id },
      data: {
        ...(data.phone !== undefined && { phone: data.phone }),
      },
      select: {
        id: true,
        email: true,
        imageUrl: true,
        phone: true,
        provider: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updateFotoPerfil(
    id: string,
    data: AtualizarFotoUsuarioDTO,
  ): Promise<{ imageUrl: string | null }> {
    const usuario = await prisma.usuario.findUniqueOrThrow({
      where: {
        id,
      },
    });

    if (usuario.provider !== "LOCAL") {
      throw new Error("Atualizar foto de perfil inválido.");
    }

    return prisma.usuario.update({
      where: { id },
      data,
      select: {
        imageUrl: true,
      },
    });
  }

  async updateToken(
    id: string,
    data: Partial<AtualizarTokenUsuarioDTO>,
  ): Promise<Usuario> {
    return prisma.usuario.update({
      where: { id },
      data,
    });
  }

  // DELETAR USUÁRIO
  async delete(id: string): Promise<Usuario> {
    return prisma.usuario.delete({
      where: { id },
    });
  }
}

//EXPORT INSTÂNCIA PARA USO NA CONTROLLER
export const usuarioService = new UsuarioService();
