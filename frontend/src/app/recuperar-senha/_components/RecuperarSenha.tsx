"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CircleCheck, KeyRound, Mail } from "lucide-react";

import AuthDialog from "@/components/auth/AuthDialog";
import FormAlert from "@/components/FormAlert";
import Button from "@/components/Button";
import Input from "@/components/Input";
import OtpInput from "@/components/OtpInput";
import { MENSAGEM_SENHA, senhaValida } from "@/lib/utils";
import { usuarioService } from "@/services/usuario.service";

type Etapa = "email" | "codigo" | "senha" | "concluido";

export default function RecuperarSenha() {
  const [etapa, setEtapa] = useState<Etapa>("email");
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const handleEmail = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const valor = String(new FormData(event.currentTarget).get("email")).trim();
    setEmail(valor);

    const submitter = event.nativeEvent.submitter as HTMLButtonElement | null;
    if (submitter?.value === "ja-tenho-codigo") {
      setErro(null);
      setEtapa("codigo");
      return;
    }

    setErro(null);
    setEnviando(true);
    const resultado = await usuarioService.enviarTokenSenha(valor);
    setEnviando(false);

    if (typeof resultado !== "string") {
      setErro(resultado.message);
      return;
    }

    setErro(null);
    setEtapa("codigo");
  };

  const handleCodigo = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const valor = String(
      new FormData(event.currentTarget).get("codigo"),
    ).trim();

    setErro(null);
    setEnviando(true);
    const resultado = await usuarioService.verificarTokenSenha(email, valor);
    setEnviando(false);

    if (typeof resultado !== "string") {
      setErro(resultado.message);
      return;
    }

    setCodigo(valor);
    setErro(null);
    setEtapa("senha");
  };

  const handleSenha = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dados = new FormData(event.currentTarget);
    const senha = String(dados.get("senha"));
    const confirmarSenha = String(dados.get("confirmarSenha"));

    if (!senhaValida(senha)) {
      setErro(MENSAGEM_SENHA);
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setErro(null);
    setEnviando(true);
    const resultado = await usuarioService.redefinirSenhaToken(
      email,
      codigo,
      senha,
      confirmarSenha,
    );
    setEnviando(false);

    if (typeof resultado !== "string") {
      setErro(resultado.message);
      return;
    }

    setErro(null);
    setEtapa("concluido");
  };

  if (etapa === "concluido") {
    return (
      <div className="flex flex-col items-center text-center">
        <span className="bg-marca/10 text-marca flex size-14 items-center justify-center rounded-full">
          <CircleCheck className="size-7" aria-hidden="true" />
        </span>
        <h1 className="font-display text-text1 mt-6 text-3xl leading-none font-black tracking-tight italic">
          Senha redefinida
        </h1>
        <p className="text-text2 mt-3 text-sm">
          Pronto! Agora é só entrar com a sua nova senha.
        </p>
        <div className="mt-8">
          <AuthDialog />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <header className="text-center">
        <h1 className="font-display text-text1 text-3xl leading-none font-black tracking-tight italic">
          {etapa === "email" && "Esqueceu a senha?"}
          {etapa === "codigo" && "Digite o código"}
          {etapa === "senha" && "Crie uma nova senha"}
        </h1>
        <p className="text-text2 mt-3 text-sm">
          {etapa === "email" &&
            "Informe o e-mail da sua conta e enviaremos um código de 6 dígitos."}
          {etapa === "codigo" && (
            <>
              Digite o código de 6 dígitos enviado para{" "}
              <strong className="text-text1">{email}</strong>. Ele vale por 30
              minutos.
            </>
          )}
          {etapa === "senha" && "Escolha uma nova senha para a sua conta."}
        </p>
      </header>

      {etapa === "email" && (
        <form onSubmit={handleEmail} className="grid gap-4">
          <Input
            id="recuperar-email"
            label="E-mail"
            icon={Mail}
            type="email"
            name="email"
            autoComplete="email"
            placeholder="voce@email.com"
            defaultValue={email}
            required
          />
          {erro && <FormAlert>{erro}</FormAlert>}
          <Button
            type="submit"
            isLoading={enviando}
            className="mt-2 w-full py-3.5"
          >
            Enviar código
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Button>
          <button
            type="submit"
            value="ja-tenho-codigo"
            disabled={enviando}
            className="font-ui text-text3 hover:text-text1 cursor-pointer text-sm font-bold transition-colors disabled:cursor-not-allowed"
          >
            Já tenho um código
          </button>
        </form>
      )}

      {etapa === "codigo" && (
        <form onSubmit={handleCodigo} className="grid gap-4">
          <OtpInput
            id="recuperar-codigo"
            name="codigo"
            label="Código"
            autoFocus
          />
          {erro && <FormAlert>{erro}</FormAlert>}
          <Button
            type="submit"
            isLoading={enviando}
            className="mt-2 w-full py-3.5"
          >
            Verificar código
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Button>
          <button
            type="button"
            onClick={() => {
              setErro(null);
              setEtapa("email");
            }}
            disabled={enviando}
            className="font-ui text-text3 hover:text-text1 cursor-pointer text-sm font-bold transition-colors disabled:cursor-not-allowed"
          >
            Usar outro e-mail
          </button>
        </form>
      )}

      {etapa === "senha" && (
        <form onSubmit={handleSenha} className="grid gap-4">
          <Input
            id="recuperar-senha"
            label="Nova senha"
            icon={KeyRound}
            isPassword
            name="senha"
            autoComplete="new-password"
            placeholder="Crie uma nova senha"
            minLength={8}
            hint="Mínimo de 8 caracteres, com letra maiúscula, minúscula e número."
            autoFocus
            required
          />
          <Input
            id="recuperar-confirmar-senha"
            label="Confirmar nova senha"
            icon={KeyRound}
            isPassword
            name="confirmarSenha"
            autoComplete="new-password"
            placeholder="Repita a nova senha"
            minLength={8}
            required
          />
          {erro && <FormAlert>{erro}</FormAlert>}
          <Button
            type="submit"
            isLoading={enviando}
            className="mt-2 w-full py-3.5"
          >
            Salvar nova senha
          </Button>
        </form>
      )}

      {etapa === "email" && (
        <Link
          href="/"
          className="text-text3 hover:text-text1 justify-self-center text-sm transition-colors"
        >
          Voltar para o início
        </Link>
      )}
    </div>
  );
}
