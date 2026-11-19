"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  CircleCheck,
  Clock,
  ExternalLink,
  LoaderCircle,
  RotateCw,
  UserRound,
} from "lucide-react";

import AuthDialog from "@/components/auth/AuthDialog";
import BotaoDownload from "@/components/BotaoDownload";
import Button from "@/components/Button";
import { PRODUCT } from "@/config/product";
import { UsuarioContext } from "@/contexts/UsuarioContext";
import { useAuth } from "@/hooks/useAuth";
import { formatarMoeda } from "@/lib/utils";
import { compraService } from "@/services/compra.service";
import capaEbook from "@public/Capa_Voce_Em_Cem_Versoes.png";

type Status = "verificando" | "confirmado" | "pendente";

const MAX_TENTATIVAS = 10;
const INTERVALO_MS = 3000;

interface PagamentoSucessoProps {
  pedido: string | null;
  comprovante: string | null;
}

function ResumoPedido({ pedido, comprovante }: PagamentoSucessoProps) {
  return (
    <div className="bg-fundo2 mt-8 flex w-full items-center gap-4 rounded-lg p-4 text-left ring-1 ring-white/10">
      <Image
        src={capaEbook}
        alt=""
        width={1055}
        height={1491}
        sizes="3rem"
        className="h-auto w-12 shrink-0 rounded-r-sm ring-1 ring-white/10"
      />

      <div className="min-w-0 flex-1">
        <p className="text-text1 font-semibold">{PRODUCT.name}</p>
        <p className="text-text3 mt-0.5 text-xs">
          {pedido ? `Pedido #${pedido} · ` : ""}
          {formatarMoeda(PRODUCT.valor, PRODUCT.discount)}
        </p>
        {comprovante && (
          <a
            href={comprovante}
            target="_blank"
            rel="noopener noreferrer"
            className="font-ui text-marca mt-1.5 inline-flex items-center gap-1 text-xs font-bold underline-offset-4 hover:underline"
          >
            Ver comprovante
            <ExternalLink className="size-3" aria-hidden="true" />
            <span className="sr-only">(abre em nova aba)</span>
          </a>
        )}
      </div>
    </div>
  );
}

function LinkPerfil() {
  return (
    <Link
      href="/perfil"
      className="text-text1 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 text-sm font-bold transition-colors hover:bg-white/10"
    >
      <UserRound className="size-4.5" aria-hidden="true" />
      Ir para a Área do Usuário
    </Link>
  );
}

export default function PagamentoSucesso({
  pedido,
  comprovante,
}: PagamentoSucessoProps) {
  const { usuario, carregando } = useAuth(UsuarioContext);
  const usuarioId = usuario?.id;
  const [status, setStatus] = useState<Status>("verificando");
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    if (!usuarioId || status !== "verificando") return;

    let ativo = true;

    const timer = setTimeout(
      async () => {
        const compras = await compraService.getComprasUsuario();
        if (!ativo) return;

        const pago =
          Array.isArray(compras) &&
          compras.some((compra) => compra.produtoId === PRODUCT.id);

        if (pago) {
          setStatus("confirmado");
        } else if (tentativa + 1 >= MAX_TENTATIVAS) {
          setStatus("pendente");
        } else {
          setTentativa(tentativa + 1);
        }
      },
      tentativa === 0 ? 0 : INTERVALO_MS,
    );

    return () => {
      ativo = false;
      clearTimeout(timer);
    };
  }, [usuarioId, status, tentativa]);

  const verificarNovamente = () => {
    setTentativa(0);
    setStatus("verificando");
  };

  const resumo = <ResumoPedido pedido={pedido} comprovante={comprovante} />;

  if (carregando || (usuario && status === "verificando")) {
    return (
      <div role="status" className="flex flex-col items-center text-center">
        <LoaderCircle
          className="text-marca size-10 animate-spin"
          aria-hidden="true"
        />
        <h1 className="font-display text-text1 mt-6 text-3xl leading-none font-black tracking-tight italic">
          Confirmando seu pagamento
        </h1>
        <p className="text-text2 mt-3 text-sm">
          A InfinitePay está nos avisando sobre a sua compra. Isso costuma levar
          poucos segundos.
        </p>
        {resumo}
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="flex flex-col items-center text-center">
        <span className="bg-marca/10 text-marca flex size-14 items-center justify-center rounded-full">
          <CircleCheck className="size-7" aria-hidden="true" />
        </span>
        <h1 className="font-display text-text1 mt-6 text-3xl leading-none font-black tracking-tight italic">
          Obrigado pela compra!
        </h1>
        <p className="text-text2 mt-3 text-sm">
          Entre na conta que você usou na compra para baixar o seu e-book.
        </p>
        {resumo}
        <div className="mt-8 w-full">
          <AuthDialog
            redirecionarPara={null}
            trigger={
              <Button className="w-full py-3.5">
                Entrar para baixar
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  if (status === "pendente") {
    return (
      <div
        aria-live="polite"
        className="flex flex-col items-center text-center"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-amber-400/10 text-amber-300">
          <Clock className="size-7" aria-hidden="true" />
        </span>
        <h1 className="font-display text-text1 mt-6 text-3xl leading-none font-black tracking-tight italic">
          Pagamento em confirmação
        </h1>
        <p className="text-text2 mt-3 text-sm">
          Ainda não recebemos a confirmação da InfinitePay. Isso pode levar
          alguns minutos. Assim que chegar, o e-book fica disponível na sua Área
          do Usuário.
        </p>
        {resumo}
        <div className="mt-8 grid w-full gap-3">
          <Button
            variant="secondary"
            icon={RotateCw}
            onClick={verificarNovamente}
            className="w-full"
          >
            Verificar novamente
          </Button>
          <LinkPerfil />
        </div>
      </div>
    );
  }

  return (
    <div aria-live="polite" className="flex flex-col items-center text-center">
      <span className="bg-marca/10 text-marca ring-marca/30 flex size-14 items-center justify-center rounded-full ring-1">
        <CircleCheck className="size-7" aria-hidden="true" />
      </span>
      <h1 className="font-display text-text1 mt-6 text-3xl leading-none font-black tracking-tight italic">
        Pagamento{" "}
        <span className="from-marca to-text1 bg-linear-to-r bg-clip-text pr-1 text-transparent">
          confirmado!
        </span>
      </h1>
      <p className="text-text2 mt-3 text-sm">
        Seu e-book já está liberado. Baixe agora ou acesse quando quiser pela
        sua Área do Usuário.
      </p>
      {resumo}
      <div className="mt-8 grid w-full gap-3">
        <BotaoDownload produtoId={PRODUCT.id} />
        <LinkPerfil />
      </div>
    </div>
  );
}
