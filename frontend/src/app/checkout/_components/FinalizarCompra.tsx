"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BadgeCheck, LoaderCircle } from "lucide-react";

import AuthDialog from "@/components/auth/AuthDialog";
import Button from "@/components/Button";
import CtaButton from "@/components/CtaButton";
import FormAlert from "@/components/FormAlert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LEGAL_ROTA } from "@/config/legal";
import { PRODUCT } from "@/config/product";
import { UsuarioContext } from "@/contexts/UsuarioContext";
import { useAuth } from "@/hooks/useAuth";
import { iniciais } from "@/lib/utils";
import { compraService } from "@/services/compra.service";
import { pagamentoService } from "@/services/pagamento.service";

function Verificando({ texto }: { texto: string }) {
  return (
    <p
      role="status"
      className="text-text2 flex items-center justify-center gap-2 py-4 text-sm"
    >
      <LoaderCircle
        className="text-marca size-4 animate-spin"
        aria-hidden="true"
      />
      {texto}
    </p>
  );
}

export default function FinalizarCompra() {
  const { usuario, carregando } = useAuth(UsuarioContext);
  const usuarioId = usuario?.id;
  const [jaComprou, setJaComprou] = useState<boolean | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!usuarioId) return;

    let ativo = true;

    compraService.getComprasUsuario().then((compras) => {
      if (!ativo) return;
      setJaComprou(
        Array.isArray(compras) &&
          compras.some((compra) => compra.produtoId === PRODUCT.id),
      );
    });

    return () => {
      ativo = false;
    };
  }, [usuarioId]);

  useEffect(() => {
    const restaurar = (event: PageTransitionEvent) => {
      if (event.persisted) setEnviando(false);
    };

    window.addEventListener("pageshow", restaurar);
    return () => window.removeEventListener("pageshow", restaurar);
  }, []);

  const handlePagar = async () => {
    setErro(null);
    setEnviando(true);

    const resultado = await pagamentoService.create(PRODUCT.id);

    if (typeof resultado !== "string") {
      setEnviando(false);
      setErro(resultado.message);
      return;
    }

    window.location.assign(resultado);
  };

  if (carregando) {
    return <Verificando texto="Verificando sua sessão…" />;
  }

  if (!usuario) {
    return (
      <div className="grid gap-4">
        <p className="text-text2 text-center text-sm">
          Entre na sua conta para concluir a compra. O e-book fica salvo na sua
          Área do Usuário.
        </p>
        <AuthDialog
          redirecionarPara={null}
          trigger={
            <Button className="w-full py-3.5">
              Entrar para comprar
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Button>
          }
        />
      </div>
    );
  }

  if (jaComprou === null) {
    return <Verificando texto="Verificando suas compras…" />;
  }

  if (jaComprou) {
    return (
      <div className="grid gap-4">
        <p className="bg-marca/10 text-text1 ring-marca/30 flex items-start gap-3 rounded-lg p-4 text-sm ring-1">
          <BadgeCheck
            className="text-marca mt-0.5 size-4.5 shrink-0"
            aria-hidden="true"
          />
          Você já tem este e-book. Ele está disponível na sua Área do Usuário.
        </p>
        <CtaButton href="/perfil" className="w-full justify-center py-3.5">
          Ir para a Área do Usuário
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </CtaButton>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <div className="bg-fundo2 flex items-center gap-3 rounded-lg p-3 ring-1 ring-white/10">
        <Avatar className="ring-marca/40 ring-offset-fundo2 size-11 ring-2 ring-offset-2 after:border-white/10">
          <AvatarImage src={usuario.imageUrl ?? undefined} alt="" />
          <AvatarFallback
            aria-hidden="true"
            className="bg-cartao font-display text-marca text-base font-black italic"
          >
            {iniciais(usuario.nome)}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <p className="text-text3 text-xs">Comprando como</p>
          <p className="text-text1 text-sm font-semibold break-words">
            {usuario.nome}
          </p>
          <p className="text-text3 text-xs break-all">{usuario.email}</p>
        </div>
      </div>

      {erro && <FormAlert>{erro}</FormAlert>}

      <Button
        onClick={handlePagar}
        isLoading={enviando}
        className="w-full py-3.5"
      >
        {enviando ? "Gerando pagamento…" : "Ir para o pagamento"}
        {!enviando && (
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        )}
      </Button>

      <p className="text-text3 text-center text-xs">
        Você será levado ao ambiente seguro da InfinitePay para pagar com Pix ou
        cartão.
      </p>

      <p className="text-text3 text-center text-xs leading-relaxed">
        Ao continuar, você concorda com os{" "}
        <Link
          href={`${LEGAL_ROTA}#termos`}
          target="_blank"
          className="text-text2 hover:text-marca underline underline-offset-4"
        >
          Termos de Uso
        </Link>
        : licença de uso pessoal e intransferível, ferramentas de IA não
        incluídas e até 7 dias para desistir com reembolso integral.
      </p>
    </div>
  );
}
