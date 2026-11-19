import type { Metadata } from "next";

import AuthPageShell from "@/components/auth/AuthPageShell";

import EntrarGoogle from "./_components/EntrarGoogle";

export const metadata: Metadata = {
  title: "Entrar com Google | LowTec",
  robots: { index: false, follow: false },
};

interface EntrarGooglePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function destinoSeguro(destino: unknown) {
  if (typeof destino !== "string") return "/perfil";

  const interno =
    destino.startsWith("/") &&
    !destino.startsWith("//") &&
    !destino.startsWith("/\\");

  return interno ? destino : "/perfil";
}

function mensagemErro(erro: unknown, error: unknown) {
  if (erro === "conta-local") {
    return "Este e-mail já tem cadastro com senha. Entre com o seu e-mail e senha.";
  }

  if (typeof erro === "string" || typeof error === "string") {
    return "Não foi possível entrar com o Google. Tente novamente.";
  }

  return null;
}

export default async function EntrarGooglePage({
  searchParams,
}: EntrarGooglePageProps) {
  const { destino, erro, error } = await searchParams;

  return (
    <AuthPageShell>
      <EntrarGoogle
        destino={destinoSeguro(destino)}
        erro={mensagemErro(erro, error)}
      />
    </AuthPageShell>
  );
}
