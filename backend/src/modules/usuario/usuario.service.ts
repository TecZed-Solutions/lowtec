import { Usuario } from "@prisma/client";
import prisma from "../../config/prisma.js";
import {
  AtualizarUsuarioDTO,
  CriarUsuarioGoogleDTO,
  CriarUsuarioLocalDTO,
} from "../../types/usuario.js";

export class UsuarioService {
  //BUSCAR USUÁRIO POR EMAIL
  async findByEmail(email: string): Promise<Usuario | null> {
    return prisma.usuario.findUnique({
      where: { email },
    });
  }

  async findByEmailVerificationToken(
    token: string
  ): Promise<Usuario | null> {
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

  //ATUALIZAR USUÁRIO
  async update(
    id: string,
    data: Partial<AtualizarUsuarioDTO>,
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
