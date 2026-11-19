import type { Metadata } from "next";

import AuthPageShell from "@/components/auth/AuthPageShell";

import ConfirmarEmail from "./_components/ConfirmarEmail";

export const metadata: Metadata = {
  title: "Confirmar e-mail | LowTec",
  robots: { index: false, follow: false },
};

export default async function ConfirmarEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { token } = await searchParams;

  return (
    <AuthPageShell>
      <ConfirmarEmail token={typeof token === "string" ? token : null} />
    </AuthPageShell>
  );
}
