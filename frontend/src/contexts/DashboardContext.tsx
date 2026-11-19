"use client";

import { createContext, useEffect, useState, type ReactNode } from "react";

import { compraService } from "@/services/compra.service";
import { pagamentoService } from "@/services/pagamento.service";
import type { CompraComProduto } from "@/types/compra";
import type { PagamentoComCompras } from "@/types/pagamento";

export interface DashboardContextValue {
  compras: CompraComProduto[];
  pagamentos: PagamentoComCompras[];
  carregando: boolean;
  erro: string | null;
  recarregar: () => Promise<void>;
}

export const DashboardContext = createContext<
  DashboardContextValue | undefined
>(undefined);

type ResultadoDashboard =
  | {
      ok: true;
      compras: CompraComProduto[];
      pagamentos: PagamentoComCompras[];
    }
  | { ok: false; erro: string };

async function buscarDashboard(): Promise<ResultadoDashboard> {
  const [compras, pagamentos] = await Promise.all([
    compraService.getComprasUsuario(),
    pagamentoService.buscarPagamentosUsuario(),
  ]);

  if (!Array.isArray(compras)) {
    return { ok: false, erro: compras.message };
  }

  if (!Array.isArray(pagamentos)) {
    return { ok: false, erro: pagamentos.message };
  }

  return { ok: true, compras, pagamentos };
}

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [resultado, setResultado] = useState<ResultadoDashboard | null>(null);

  useEffect(() => {
    let ativo = true;

    buscarDashboard().then((encontrado) => {
      if (ativo) setResultado(encontrado);
    });

    return () => {
      ativo = false;
    };
  }, []);

  const recarregar = async () => {
    setResultado(null);
    setResultado(await buscarDashboard());
  };

  return (
    <DashboardContext.Provider
      value={{
        compras: resultado?.ok ? resultado.compras : [],
        pagamentos: resultado?.ok ? resultado.pagamentos : [],
        carregando: resultado === null,
        erro: resultado && !resultado.ok ? resultado.erro : null,
        recarregar,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
