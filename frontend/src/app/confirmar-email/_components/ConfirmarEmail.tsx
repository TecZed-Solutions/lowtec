"use client";

import { useEffect, useRef, useState } from "react";
import { CircleAlert, LoaderCircle, MailCheck } from "lucide-react";

import AuthDialog from "@/components/auth/AuthDialog";
import { usuarioService } from "@/services/usuario.service";

type Estado =
  | { tipo: "carregando" }
  | { tipo: "sucesso" }
  | { tipo: "erro"; mensagem: string };

export default function ConfirmarEmail({ token }: { token: string | null }) {
  const [estado, setEstado] = useState<Estado>(
    token
      ? { tipo: "carregando" }
      : {
          tipo: "erro",
          mensagem: "Link de confirmação inválido ou incompleto.",
        },
  );

  const confirmacaoEnviada = useRef(false);

  useEffect(() => {
    if (!token || confirmacaoEnviada.current) return;
    confirmacaoEnviada.current = true;

    usuarioService.verificarEmail(token).then((resultado) => {
      setEstado(
        typeof resultado === "string"
          ? { tipo: "sucesso" }
          : { tipo: "erro", mensagem: resultado.message },
      );
    });
  }, [token]);

  return (
    <div aria-live="polite" className="flex flex-col items-center text-center">
      {estado.tipo === "carregando" && (
        <>
          <LoaderCircle
            className="text-marca size-10 animate-spin"
            aria-hidden="true"
          />
          <h1 className="font-display text-text1 mt-6 text-3xl leading-none font-black tracking-tight italic">
            Confirmando seu e-mail
          </h1>
          <p className="text-text2 mt-3 text-sm">Só um instante…</p>
        </>
      )}

      {estado.tipo === "sucesso" && (
        <>
          <span className="bg-marca/10 text-marca flex size-14 items-center justify-center rounded-full">
            <MailCheck className="size-7" aria-hidden="true" />
          </span>
          <h1 className="font-display text-text1 mt-6 text-3xl leading-none font-black tracking-tight italic">
            E-mail confirmado
          </h1>
          <p className="text-text2 mt-3 text-sm">
            Sua conta está ativa. Entre para finalizar a compra do seu e-book.
          </p>
          <div className="mt-8 w-full">
            <AuthDialog redirecionarPara="/checkout" />
          </div>
        </>
      )}

      {estado.tipo === "erro" && (
        <>
          <span className="flex size-14 items-center justify-center rounded-full bg-red-500/10 text-red-400">
            <CircleAlert className="size-7" aria-hidden="true" />
          </span>
          <h1 className="font-display text-text1 mt-6 text-3xl leading-none font-black tracking-tight italic">
            Não foi possível confirmar
          </h1>
          <p className="text-text2 mt-3 text-sm">{estado.mensagem}</p>
          <p className="text-text3 mt-2 text-sm">
            Se o link expirou, crie a conta de novo com o mesmo e-mail para
            receber outro.
          </p>
          <div className="mt-8">
            <AuthDialog redirecionarPara="/checkout" />
          </div>
        </>
      )}
    </div>
  );
}
