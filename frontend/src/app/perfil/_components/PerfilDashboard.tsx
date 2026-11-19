"use client";

import { Home, LoaderCircle, LogIn, RotateCw } from "lucide-react";

import AuthDialog from "@/components/auth/AuthDialog";
import Button from "@/components/Button";
import FormAlert from "@/components/FormAlert";
import {
  DashboardContext,
  DashboardProvider,
} from "@/contexts/DashboardContext";
import { UsuarioContext } from "@/contexts/UsuarioContext";
import { useAuth } from "@/hooks/useAuth";
import { primeiroNome } from "@/lib/utils";
import type { Usuario } from "@/types/usuario";

import PaymentsSection from "./PaymentsSection";
import ProductsSection from "./ProductsSection";
import ProfileSidebar from "./ProfileSidebar";
import Link from "next/link";
import Image from "next/image";
import CtaButton from "@/components/CtaButton";

function Carregando({ texto }: { texto: string }) {
  return (
    <div
      role="status"
      className="text-text2 flex items-center justify-center gap-3 py-24 text-sm"
    >
      <LoaderCircle
        className="text-marca size-5 animate-spin"
        aria-hidden="true"
      />
      {texto}
    </div>
  );
}

function SessaoEncerrada() {
  return (
    <div className="flex flex-col items-center py-24 text-center">
      <span className="bg-marca/10 text-marca flex size-14 items-center justify-center rounded-full">
        <LogIn className="size-7" aria-hidden="true" />
      </span>
      <h1 className="font-display text-text1 mt-6 text-3xl leading-none font-black tracking-tight italic">
        Sessão encerrada
      </h1>
      <p className="text-text2 mt-3 text-sm">
        Entre novamente para acessar o seu perfil.
      </p>
      <div className="mt-8">
        <AuthDialog />
      </div>
    </div>
  );
}

function ConteudoDashboard() {
  const { recarregarUsuario } = useAuth(UsuarioContext);
  const { compras, pagamentos, carregando, erro, recarregar } =
    useAuth(DashboardContext);

  const tentarNovamente = async () => {
    const sessao = await recarregarUsuario();
    if (sessao) await recarregar();
  };

  if (carregando) {
    return <Carregando texto="Carregando seus produtos e pagamentos…" />;
  }

  if (erro) {
    return (
      <div className="grid gap-4 lg:mt-13">
        <FormAlert>{erro}</FormAlert>
        <Button
          variant="secondary"
          icon={RotateCw}
          onClick={tentarNovamente}
          className="justify-self-start"
        >
          Tentar novamente
        </Button>
      </div>
    );
  }

  return (
    <>
      <ProductsSection compras={compras} />
      <PaymentsSection pagamentos={pagamentos} />
    </>
  );
}

function Perfil({ usuario }: { usuario: Usuario }) {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-text1 text-[clamp(2rem,4vw,2.75rem)] leading-none font-black tracking-tight italic">
            Olá,{" "}
            <span className="from-marca to-text1 bg-linear-to-r bg-clip-text pr-2 text-transparent">
              {primeiroNome(usuario.nome)}.
            </span>
          </h1>
          <p className="text-text2 mt-3">
            Seus produtos e histórico de pagamentos ficam aqui.
          </p>
        </div>

        <CtaButton href="/" className="self-start">
          <Home className="size-4.5" aria-hidden="true" />
          Início
        </CtaButton>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[20rem_minmax(0,1fr)]">
        <ProfileSidebar usuario={usuario} />

        <div className="flex min-w-0 flex-col gap-8">
          <ConteudoDashboard />
        </div>
      </div>
    </>
  );
}

export default function PerfilDashboard() {
  const { usuario, carregando } = useAuth(UsuarioContext);

  if (carregando) {
    return <Carregando texto="Carregando seu perfil…" />;
  }

  if (!usuario) {
    return <SessaoEncerrada />;
  }

  return (
    <DashboardProvider>
      <Perfil usuario={usuario} />
    </DashboardProvider>
  );
}
