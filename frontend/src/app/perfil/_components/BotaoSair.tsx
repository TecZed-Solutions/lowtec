"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoaderCircle, LogOut } from "lucide-react";

import FormAlert from "@/components/FormAlert";
import { UsuarioContext } from "@/contexts/UsuarioContext";
import { useAuth } from "@/hooks/useAuth";

export default function BotaoSair() {
  const router = useRouter();
  const { sair } = useAuth(UsuarioContext);
  const [saindo, setSaindo] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleSair = async () => {
    setErro(null);
    setSaindo(true);

    const falha = await sair();

    if (falha) {
      setSaindo(false);
      setErro(falha);
      return;
    }

    router.replace("/");
  };

  return (
    <>
      <button
        type="button"
        onClick={handleSair}
        disabled={saindo}
        className="text-text3 hover:text-text1 flex cursor-pointer items-center justify-center gap-2 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saindo ? (
          <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <LogOut className="size-4" aria-hidden="true" />
        )}
        Sair da conta
      </button>
      {erro && <FormAlert>{erro}</FormAlert>}
    </>
  );
}
