"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { CircleAlert, LoaderCircle } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import Button from "@/components/Button";
import { UsuarioContext } from "@/contexts/UsuarioContext";
import { useAuth } from "@/hooks/useAuth";

interface EntrarGoogleProps {
  destino: string;
  erro: string | null;
}

export default function EntrarGoogle({ destino, erro }: EntrarGoogleProps) {
  const router = useRouter();
  const { usuario, carregando } = useAuth(UsuarioContext);
  const [reiniciando, setReiniciando] = useState(false);

  useEffect(() => {
    if (!erro && usuario) router.replace(destino);
  }, [erro, usuario, destino, router]);

  const handleGoogleLogin = async () => {
    setReiniciando(true);
    await signIn("google", {
      callbackUrl: `/entrar/google?destino=${encodeURIComponent(destino)}`,
    });
  };

  const falha =
    erro ??
    (!carregando && !usuario
      ? "Não foi possível confirmar o seu login. Tente novamente."
      : null);

  if (!falha) {
    return (
      <div role="status" className="flex flex-col items-center text-center">
        <LoaderCircle
          className="text-marca size-10 animate-spin"
          aria-hidden="true"
        />
        <h1 className="font-display text-text1 mt-6 text-3xl leading-none font-black tracking-tight italic">
          Entrando com o Google
        </h1>
        <p className="text-text2 mt-3 text-sm">Só um instante…</p>
      </div>
    );
  }

  return (
    <div aria-live="polite" className="flex flex-col items-center text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-red-500/10 text-red-400">
        <CircleAlert className="size-7" aria-hidden="true" />
      </span>
      <h1 className="font-display text-text1 mt-6 text-3xl leading-none font-black tracking-tight italic">
        Não foi possível entrar
      </h1>
      <p className="text-text2 mt-3 text-sm">{falha}</p>

      <div className="mt-8 grid w-full gap-3">
        <Button
          variant="secondary"
          icon={FcGoogle}
          isLoading={reiniciando}
          onClick={handleGoogleLogin}
          className="w-full"
        >
          Tentar novamente com o Google
        </Button>
        <Link
          href="/"
          className="font-ui text-text2 hover:text-marca justify-self-center text-sm font-bold transition-colors"
        >
          Voltar para o início
        </Link>
      </div>
    </div>
  );
}
