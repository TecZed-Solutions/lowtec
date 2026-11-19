"use client";

import { Mail, Smartphone } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import ChangePasswordDialog from "@/components/auth/ChangePasswordDialog";
import EditProfileDialog from "@/components/auth/EditProfileDialog";
import { useMask } from "@/hooks/useMask";
import type { Usuario } from "@/types/usuario";

import AvatarUpload from "./AvatarUpload";
import BotaoSair from "./BotaoSair";

export default function ProfileSidebar({ usuario }: { usuario: Usuario }) {
  const { phone: mascararTelefone } = useMask();

  const dados = [
    { icon: Mail, label: "E-mail", value: usuario.email },
    {
      icon: Smartphone,
      label: "Celular",
      value: usuario.phone ? mascararTelefone(usuario.phone) : null,
    },
  ];

  return (
    // lg:mt-13 = título "Meus produtos" (text-2xl → 2rem) + mt-5 da lista: alinha com o card do produto
    <section
      aria-labelledby="perfil-title"
      className="lg:sticky lg:top-8 lg:mt-13 lg:self-start"
    >
      <div className="bg-cartao relative isolate overflow-hidden rounded-xl p-6 ring-1 ring-white/10">
        <div
          aria-hidden="true"
          className="bg-marca/15 absolute -top-16 left-1/2 -z-10 size-48 -translate-x-1/2 rounded-full blur-[70px]"
        />

        <div className="flex flex-col items-center text-center">
          <AvatarUpload usuario={usuario} />

          <h2
            id="perfil-title"
            className="font-display text-text1 mt-5 text-2xl leading-tight font-black tracking-tight italic"
          >
            {usuario.nome}
          </h2>
        </div>

        <dl className="mt-6 grid gap-4 border-t border-dashed border-white/10 pt-6">
          {dados.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <span className="bg-marca/10 text-marca flex size-9 shrink-0 items-center justify-center rounded-lg">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <dt className="text-text3 text-xs">{label}</dt>
                <dd className="text-text1 text-sm font-semibold break-all">
                  {value ?? (
                    <span className="text-text3 font-normal">
                      Não informado
                    </span>
                  )}
                </dd>
              </div>
            </div>
          ))}
        </dl>

        <div className="mt-6 grid gap-3 border-t border-dashed border-white/10 pt-6">
          <EditProfileDialog name={usuario.nome} phone={usuario.phone} />

          {usuario.provider === "LOCAL" ? (
            <ChangePasswordDialog />
          ) : (
            <p className="text-text3 flex items-center justify-center gap-2 py-2 text-sm">
              <FcGoogle className="size-4" aria-hidden="true" />
              Você entra com a sua conta Google.
            </p>
          )}

          <BotaoSair />
        </div>
      </div>
    </section>
  );
}
