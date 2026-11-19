"use client";

import { useState } from "react";
import { KeyRound } from "lucide-react";

import Button from "@/components/Button";
import FormAlert from "@/components/FormAlert";
import Input from "@/components/Input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MENSAGEM_SENHA, senhaValida } from "@/lib/utils";
import { usuarioService } from "@/services/usuario.service";

export default function ChangePasswordDialog() {
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const limparMensagens = () => {
    setErro(null);
    setSucesso(null);
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formulario = event.currentTarget;
    const dados = new FormData(formulario);
    const novaSenha = String(dados.get("novaSenha"));
    const confirmarSenha = String(dados.get("confirmarSenha"));

    limparMensagens();

    if (!senhaValida(novaSenha)) {
      setErro(MENSAGEM_SENHA);
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setEnviando(true);
    const resultado = await usuarioService.redefinirSenha(
      novaSenha,
      confirmarSenha,
    );
    setEnviando(false);

    if (typeof resultado !== "string") {
      setErro(resultado.message);
      return;
    }

    formulario.reset();
    setSucesso(resultado);
  };

  return (
    <Dialog
      onOpenChange={(aberto) => {
        if (!aberto) limparMensagens();
      }}
    >
      <DialogTrigger
        render={
          <Button variant="secondary" icon={KeyRound} className="w-full">
            Alterar senha
          </Button>
        }
      />

      <DialogContent className="bg-cartao text-text1 ring-marca/25 isolate max-h-[calc(100svh-2rem)] gap-6 overflow-y-auto p-6 sm:max-w-md sm:p-8">
        <DialogHeader>
          <DialogTitle className="font-display text-text1 text-3xl leading-none font-black tracking-tight italic">
            Alterar senha
          </DialogTitle>
          <DialogDescription className="text-text2">
            Escolha uma nova senha para a sua conta.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <Input
            id="nova-senha"
            label="Nova senha"
            icon={KeyRound}
            isPassword
            name="novaSenha"
            autoComplete="new-password"
            placeholder="Crie uma nova senha"
            minLength={8}
            hint="Mínimo de 8 caracteres, com letra maiúscula, minúscula e número."
            required
          />
          <Input
            id="confirmar-senha"
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
          {sucesso && <FormAlert tipo="sucesso">{sucesso}</FormAlert>}
          <Button
            type="submit"
            isLoading={enviando}
            className="mt-2 w-full py-3.5"
          >
            Salvar nova senha
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
