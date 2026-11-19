import type { Metadata } from "next";

import AuthPageShell from "@/components/auth/AuthPageShell";

import RecuperarSenha from "./_components/RecuperarSenha";

export const metadata: Metadata = {
  title: "Recuperar senha | LowTec",
  robots: { index: false, follow: false },
};

export default function RecuperarSenhaPage() {
  return (
    <AuthPageShell>
      <RecuperarSenha />
    </AuthPageShell>
  );
}
