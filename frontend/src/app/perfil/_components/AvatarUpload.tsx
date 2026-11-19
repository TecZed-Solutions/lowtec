"use client";

import { useRef, useState } from "react";
import { Camera, LoaderCircle } from "lucide-react";

import FormAlert from "@/components/FormAlert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UsuarioContext } from "@/contexts/UsuarioContext";
import { useAuth } from "@/hooks/useAuth";
import { iniciais } from "@/lib/utils";
import { usuarioService } from "@/services/usuario.service";
import type { Usuario } from "@/types/usuario";

export default function AvatarUpload({ usuario }: { usuario: Usuario }) {
  const { atualizarUsuario } = useAuth(UsuarioContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  const podeAlterar = usuario.provider === "LOCAL";

  const handleArquivo = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = event.target.files?.[0];
    event.target.value = "";

    if (!arquivo) return;

    setErro(null);
    setStatus("");
    setEnviando(true);

    const resultado = await usuarioService.atualizarFoto(arquivo);

    setEnviando(false);

    if ("message" in resultado) {
      setErro(resultado.message);
      return;
    }

    atualizarUsuario({ imageUrl: resultado.imageUrl });
    setStatus("Foto de perfil atualizada.");
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative">
        <Avatar className="ring-marca/40 ring-offset-cartao size-20 ring-2 ring-offset-4 after:border-white/10">
          <AvatarImage
            src={usuario.imageUrl ?? undefined}
            alt={`Foto de ${usuario.nome}`}
          />
          <AvatarFallback
            aria-hidden="true"
            className="bg-fundo2 font-display text-marca text-2xl font-black italic"
          >
            {iniciais(usuario.nome)}
          </AvatarFallback>
        </Avatar>

        {enviando && (
          <div className="bg-fundo/70 absolute inset-0 flex items-center justify-center rounded-full">
            <LoaderCircle
              className="text-marca size-6 animate-spin"
              aria-hidden="true"
            />
          </div>
        )}

        {podeAlterar && (
          <>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={enviando}
              aria-label="Alterar foto de perfil"
              className="bg-marca text-fundo hover:bg-marca/85 ring-cartao absolute -right-1.5 -bottom-1.5 flex size-8 cursor-pointer items-center justify-center rounded-full ring-4 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Camera className="size-4" aria-hidden="true" />
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleArquivo}
              hidden
            />
          </>
        )}
      </div>

      {erro && (
        <div className="mt-5 w-full">
          <FormAlert>{erro}</FormAlert>
        </div>
      )}

      <p role="status" className="sr-only">
        {status}
      </p>
    </div>
  );
}
