"use client";

import { useState } from "react";
import { Smartphone, UserPen, UserRound } from "lucide-react";

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
import { UsuarioContext } from "@/contexts/UsuarioContext";
import { useAuth } from "@/hooks/useAuth";
import { useMask } from "@/hooks/useMask";
import { usuarioService } from "@/services/usuario.service";

interface EditProfileDialogProps {
  name: string;
  phone: string | null;
}

export default function EditProfileDialog({
  name,
  phone,
}: EditProfileDialogProps) {
  const { atualizarUsuario } = useAuth(UsuarioContext);
  const { phone: mascararTelefone } = useMask();
  const [aberto, setAberto] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dados = new FormData(event.currentTarget);
    const nome = String(dados.get("nome")).trim();
    const celular = String(dados.get("celular")).replace(/\D/g, "");

    if (!nome) {
      setErro("Informe o seu nome.");
      return;
    }

    if (celular && celular.length < 10) {
      setErro("Informe o celular completo, com DDD.");
      return;
    }

    setErro(null);
    setEnviando(true);
    const resultado = await usuarioService.atualizarPerfil(
      nome,
      celular || null,
    );
    setEnviando(false);

    if ("message" in resultado) {
      setErro(resultado.message);
      return;
    }

    atualizarUsuario({ nome: resultado.nome, phone: resultado.phone });
    setAberto(false);
  };

  return (
    <Dialog
      open={aberto}
      onOpenChange={(proximo) => {
        setAberto(proximo);
        if (!proximo) setErro(null);
      }}
    >
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
            defaultValue={mascararTelefone(phone ?? "")}
            onChange={(event) => {
              event.currentTarget.value = mascararTelefone(
                event.currentTarget.value,
              );
            }}
            placeholder="(11) 91234-5678"
          />
          {erro && <FormAlert>{erro}</FormAlert>}
          <Button
            type="submit"
            isLoading={enviando}
            className="mt-2 w-full py-3.5"
          >
            Salvar alterações
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
