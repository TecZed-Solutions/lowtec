"use client";

import { KeyRound } from "lucide-react";

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

export default function ChangePasswordDialog() {
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Dialog>
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
          <Button type="submit" className="mt-2 w-full py-3.5">
            Salvar nova senha
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
