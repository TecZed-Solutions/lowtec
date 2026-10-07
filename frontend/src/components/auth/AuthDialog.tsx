"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  DoorOpen,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";

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

type AuthMode = "login" | "registro";

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

export default function AuthDialog() {
  const [mode, setMode] = useState<AuthMode>("login");
  const copy = COPY[mode];

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Dialog>
      <DialogTrigger render={<Button icon={DoorOpen}>Fazer login</Button>} />

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
            {copy.title}
          </DialogTitle>
          <DialogDescription className="text-text2">
            {copy.description}
          </DialogDescription>
        </DialogHeader>

        <Button variant="secondary" icon={FcGoogle} className="w-full">
          Continuar com Google
        </Button>

        <div className="text-text3 flex items-center gap-3 text-xs">
          <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
          ou com e-mail
          <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
        </div>

        {mode === "login" ? (
          <form onSubmit={handleSubmit} className="grid gap-4">
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
            <Button type="submit" className="mt-2 w-full py-3.5">
              {copy.submit}
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4">
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
            <Button type="submit" className="mt-2 w-full py-3.5">
              {copy.submit}
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Button>
          </form>
        )}

        <p className="text-text3 text-center text-sm">
          {copy.switchText}{" "}
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "registro" : "login")}
            className="font-ui text-marca cursor-pointer font-bold underline-offset-4 hover:underline"
          >
            {copy.switchAction}
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
}
