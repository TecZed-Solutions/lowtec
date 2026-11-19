"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  DoorOpen,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import FormAlert from "@/components/FormAlert";
import Button from "@/components/Button";
import Input from "@/components/Input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UsuarioContext } from "@/contexts/UsuarioContext";
import { useAuth } from "@/hooks/useAuth";
import { MENSAGEM_SENHA, senhaValida } from "@/lib/utils";
import { usuarioService } from "@/services/usuario.service";

type AuthMode = "login" | "registro" | "verificar";

const COPY = {
  login: {
    title: "Bem-vindo de volta",
    description: "Entre para acessar seu conteúdo.",
    submit: "Entrar",
    switchText: "Ainda não tem conta?",
    switchAction: "Criar conta",
  },
  registro: {
    title: "Crie sua conta",
    description: "Cadastre-se para comprar e acessar o e-book.",
    submit: "Criar conta",
    switchText: "Já tem uma conta?",
    switchAction: "Entrar",
  },
} as const;

interface AuthDialogProps {
  trigger?: React.ReactElement;
  redirecionarPara?: string | null;
}

export default function AuthDialog({
  trigger = <Button icon={DoorOpen}>Fazer login</Button>,
  redirecionarPara = "/perfil",
}: AuthDialogProps) {
  const router = useRouter();
  const { recarregarUsuario } = useAuth(UsuarioContext);
  const [mode, setMode] = useState<AuthMode>("login");
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [emailCadastrado, setEmailCadastrado] = useState("");
  const [entrandoGoogle, setEntrandoGoogle] = useState(false);

  useEffect(() => {
    const restaurar = (event: PageTransitionEvent) => {
      if (event.persisted) setEntrandoGoogle(false);
    };

    window.addEventListener("pageshow", restaurar);
    return () => window.removeEventListener("pageshow", restaurar);
  }, []);

  const handleGoogleLogin = async () => {
    setErro(null);
    setEntrandoGoogle(true);

    const destino =
      redirecionarPara ??
      `${window.location.pathname}${window.location.search}`;

    await signIn("google", {
      callbackUrl: `/entrar/google?destino=${encodeURIComponent(destino)}`,
    });
  };

  const trocarModo = (novoModo: AuthMode) => {
    setErro(null);
    setMode(novoModo);
  };

  const handleLogin = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dados = new FormData(event.currentTarget);
    const email = String(dados.get("email")).trim();
    const senha = String(dados.get("senha"));

    setErro(null);
    setEnviando(true);

    const resultado = await usuarioService.loginLocal(email, senha);

    if (typeof resultado !== "string") {
      setEnviando(false);
      setErro(resultado.message);
      return;
    }

    await recarregarUsuario();
    if (redirecionarPara) router.push(redirecionarPara);
  };

  const handleRegistro = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dados = new FormData(event.currentTarget);
    const nome = String(dados.get("nome")).trim();
    const email = String(dados.get("email")).trim();
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

    const resultado = await usuarioService.registroLocal(
      nome,
      email,
      senha,
      confirmarSenha,
    );

    setEnviando(false);

    if (typeof resultado !== "string") {
      setErro(resultado.message);
      return;
    }

    setEmailCadastrado(email);
    trocarModo("verificar");
  };

  return (
    <Dialog>
      <DialogTrigger render={trigger} />

      <DialogContent className="bg-cartao text-text1 ring-marca/25 isolate max-h-[calc(100svh-2rem)] gap-6 overflow-y-auto p-6 sm:max-w-md sm:p-8">
        <DialogHeader className="items-center text-center">
          <Image
            src="/logo_submark.svg"
            alt=""
            width={448}
            height={337}
            className="mb-2 h-10 w-auto"
          />
          <DialogTitle className="font-display text-text1 text-3xl leading-none font-black tracking-tight italic">
            {mode === "verificar" ? "Confira seu e-mail" : COPY[mode].title}
          </DialogTitle>
          <DialogDescription className="text-text2">
            {mode === "verificar" ? (
              <>
                Enviamos um link de confirmação para{" "}
                <strong className="text-text1">{emailCadastrado}</strong>. Abra
                o e-mail e clique no link para ativar sua conta.
              </>
            ) : (
              COPY[mode].description
            )}
          </DialogDescription>
        </DialogHeader>

        {mode === "verificar" ? (
          <>
            <p className="text-text3 text-center text-sm">
              Não chegou? Confira a caixa de spam.
            </p>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => trocarModo("login")}
            >
              Voltar para o login
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="secondary"
              icon={FcGoogle}
              isLoading={entrandoGoogle}
              onClick={handleGoogleLogin}
              className="w-full"
            >
              Continuar com Google
            </Button>

            <div className="text-text3 flex items-center gap-3 text-xs">
              <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
              ou com e-mail
              <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
            </div>

            {mode === "login" ? (
              <form onSubmit={handleLogin} className="grid gap-4">
                <Input
                  id="login-email"
                  label="E-mail"
                  icon={Mail}
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="voce@email.com"
                  required
                />
                <Input
                  id="login-senha"
                  label="Senha"
                  icon={LockKeyhole}
                  isPassword
                  name="senha"
                  autoComplete="current-password"
                  placeholder="Sua senha"
                  required
                />
                <Link
                  href="/recuperar-senha"
                  className="font-ui text-marca -mt-1 justify-self-end text-xs font-bold underline-offset-4 hover:underline"
                >
                  Esqueci minha senha
                </Link>
                {erro && <FormAlert>{erro}</FormAlert>}
                <Button
                  type="submit"
                  isLoading={enviando}
                  className="mt-2 w-full py-3.5"
                >
                  {COPY.login.submit}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Button>
              </form>
            ) : (
              <form onSubmit={handleRegistro} className="grid gap-4">
                <Input
                  id="registro-nome"
                  label="Nome"
                  icon={UserRound}
                  type="text"
                  name="nome"
                  autoComplete="name"
                  placeholder="Seu nome"
                  required
                />
                <Input
                  id="registro-email"
                  label="E-mail"
                  icon={Mail}
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="voce@email.com"
                  required
                />
                <Input
                  id="registro-senha"
                  label="Senha"
                  icon={LockKeyhole}
                  isPassword
                  name="senha"
                  autoComplete="new-password"
                  placeholder="Crie uma senha"
                  minLength={8}
                  hint="Mínimo de 8 caracteres, com letra maiúscula, minúscula e número."
                  required
                />
                <Input
                  id="registro-confirmar-senha"
                  label="Confirmar senha"
                  icon={LockKeyhole}
                  isPassword
                  name="confirmarSenha"
                  autoComplete="new-password"
                  placeholder="Repita a senha"
                  minLength={8}
                  required
                />
                {erro && <FormAlert>{erro}</FormAlert>}
                <Button
                  type="submit"
                  isLoading={enviando}
                  className="mt-2 w-full py-3.5"
                >
                  {COPY.registro.submit}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Button>
              </form>
            )}

            <p className="text-text3 text-center text-sm">
              {COPY[mode].switchText}{" "}
              <button
                type="button"
                onClick={() =>
                  trocarModo(mode === "login" ? "registro" : "login")
                }
                className="font-ui text-marca cursor-pointer font-bold underline-offset-4 hover:underline"
              >
                {COPY[mode].switchAction}
              </button>
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
