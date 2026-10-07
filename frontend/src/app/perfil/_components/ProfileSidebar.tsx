import { LogOut, Mail, Smartphone } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import ChangePasswordDialog from "@/components/auth/ChangePasswordDialog";
import EditProfileDialog from "@/components/auth/EditProfileDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { iniciais } from "@/lib/utils";
import type { Usuario } from "@/types/usuario";

export default function ProfileSidebar({ usuario }: { usuario: Usuario }) {
  const dados = [
    { icon: Mail, label: "E-mail", value: usuario.email },
    { icon: Smartphone, label: "Celular", value: usuario.phone },
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
          <Avatar className="ring-marca/40 ring-offset-cartao size-20 ring-2 ring-offset-4 after:border-white/10">
            <AvatarImage
              src={usuario.imageUrl ?? undefined}
              alt={`Foto de ${usuario.name}`}
            />
            <AvatarFallback
              aria-hidden="true"
              className="bg-fundo2 font-display text-marca text-2xl font-black italic"
            >
              {iniciais(usuario.name)}
            </AvatarFallback>
          </Avatar>

          <h2
            id="perfil-title"
            className="font-display text-text1 mt-5 text-2xl leading-tight font-black tracking-tight italic"
          >
            {usuario.name}
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
          <EditProfileDialog name={usuario.name} phone={usuario.phone} />

          {usuario.provider === "LOCAL" ? (
            <ChangePasswordDialog />
          ) : (
            <p className="text-text3 flex items-center justify-center gap-2 py-2 text-sm">
              <FcGoogle className="size-4" aria-hidden="true" />
              Você entra com a sua conta Google.
            </p>
          )}

          <button
            type="button"
            className="text-text3 hover:text-text1 flex cursor-pointer items-center justify-center gap-2 py-2 text-sm font-semibold transition-colors"
          >
            <LogOut className="size-4" aria-hidden="true" />
            Sair da conta
          </button>
        </div>
      </div>
    </section>
  );
}
