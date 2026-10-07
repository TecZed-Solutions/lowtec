"use client";

import { Smartphone, UserPen, UserRound } from "lucide-react";

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

interface EditProfileDialogProps {
  name: string;
  phone: string | null;
}

export default function EditProfileDialog({
  name,
  phone,
}: EditProfileDialogProps) {
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="secondary" icon={UserPen} className="w-full">
            Editar dados
          </Button>
        }
      />

      <DialogContent className="bg-cartao text-text1 ring-marca/25 isolate max-h-[calc(100svh-2rem)] gap-6 overflow-y-auto p-6 sm:max-w-md sm:p-8">
        <DialogHeader>
          <DialogTitle className="font-display text-text1 text-3xl leading-none font-black tracking-tight italic">
            Editar dados
          </DialogTitle>
          <DialogDescription className="text-text2">
            Atualize o seu nome e o seu celular.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <Input
            id="perfil-nome"
            label="Nome"
            icon={UserRound}
            type="text"
            name="nome"
            autoComplete="name"
            defaultValue={name}
            placeholder="Seu nome"
            required
          />
          <Input
            id="perfil-celular"
            label="Celular"
            icon={Smartphone}
            type="tel"
            inputMode="tel"
            name="celular"
            autoComplete="tel-national"
            defaultValue={phone ?? ""}
            placeholder="(11) 91234-5678"
          />
          <Button type="submit" className="mt-2 w-full py-3.5">
            Salvar alterações
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
