"use client";

import { createContext, useEffect, useState, type ReactNode } from "react";

import { usuarioService } from "@/services/usuario.service";
import type { Usuario } from "@/types/usuario";

export interface UsuarioContextValue {
  usuario: Usuario | null;
  carregando: boolean;
  recarregarUsuario: () => Promise<Usuario | null>;
  atualizarUsuario: (dados: Partial<Usuario>) => void;
  sair: () => Promise<string | null>;
}

export const UsuarioContext = createContext<UsuarioContextValue | undefined>(
  undefined,
);

async function buscarUsuario() {
  const resultado = await usuarioService.getInfoUsuario();
  return "message" in resultado ? null : resultado;
}

export function UsuarioProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let ativo = true;

    buscarUsuario().then((encontrado) => {
      if (!ativo) return;
      setUsuario(encontrado);
      setCarregando(false);
    });

    return () => {
      ativo = false;
    };
  }, []);

  const recarregarUsuario = async () => {
    const encontrado = await buscarUsuario();
    setUsuario(encontrado);
    return encontrado;
  };

  const atualizarUsuario = (dados: Partial<Usuario>) => {
    setUsuario((atual) => (atual ? { ...atual, ...dados } : atual));
  };

  const sair = async () => {
    const resultado = await usuarioService.logout();

    if (typeof resultado !== "string") {
      return resultado.message;
    }

    setUsuario(null);
    return null;
  };

  return (
    <UsuarioContext.Provider
      value={{
        usuario,
        carregando,
        recarregarUsuario,
        atualizarUsuario,
        sair,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}
