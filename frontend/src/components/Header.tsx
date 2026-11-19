"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { LayoutDashboard } from "lucide-react";

import AuthDialog from "@/components/auth/AuthDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UsuarioContext } from "@/contexts/UsuarioContext";
import { useAuth } from "@/hooks/useAuth";
import { iniciais } from "@/lib/utils";

export default function Header() {
  const { usuario } = useAuth(UsuarioContext);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-12 flex items-center justify-between"
    >
      <Link href="/" aria-label="Lowtec, página inicial" className="w-fit">
        <Image
          src="/logo_submark.svg"
          alt=""
          width={448}
          height={337}
          priority
          className="h-14 w-auto"
        />
      </Link>

      {usuario ? (
        <div className="flex items-center gap-4">
          <Avatar className="size-14">
            <AvatarImage src={usuario.imageUrl ?? undefined} alt="" />
            <AvatarFallback
              aria-hidden="true"
              className="bg-fundo2 font-display text-marca text-lg font-black italic"
            >
              {iniciais(usuario.nome)}
            </AvatarFallback>
          </Avatar>

          <Link
            href="/perfil"
            className="group flex items-center gap-3 sm:gap-4"
          >
            <span className="bg-marca font-ui text-fundo group-hover:bg-marca/85 inline-flex -skew-x-12 items-center px-5 py-3 text-sm font-extrabold shadow-[0_10px_40px_-10px_rgba(73,229,16,0.6)] transition-colors sm:px-8 sm:py-4 sm:text-base">
              <span className="inline-flex skew-x-12 items-center gap-2">
                <LayoutDashboard
                  className="hidden size-4.5 sm:block"
                  aria-hidden="true"
                />
                Área do Usuário
              </span>
            </span>
          </Link>
        </div>
      ) : (
        <AuthDialog />
      )}
    </motion.header>
  );
}
