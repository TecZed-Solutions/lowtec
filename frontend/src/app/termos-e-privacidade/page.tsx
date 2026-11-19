import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { LEGAL_ATUALIZADO_EM, LEGAL_ROTA } from "@/config/legal";
import { LEGISLACAO } from "@/constants/legal";
import logoSubmark from "@public/logo_submark.svg";
import imagemTermos from "@public/terms-and-conditions.jpg";

import Documento from "./_components/Documento";
import Lista from "./_components/Lista";
import { POLITICA_DE_PRIVACIDADE } from "./_components/PoliticaDePrivacidade";
import Sumario from "./_components/Sumario";
import { TERMOS_DE_USO } from "./_components/TermosDeUso";

export const metadata: Metadata = {
  title: "Termos de Uso e Política de Privacidade | LowTec",
  description:
    "Regras de compra e uso do e-book Você em 100 versões e como a LowTec trata os seus dados pessoais, conforme o Código de Defesa do Consumidor e a LGPD.",
  alternates: { canonical: LEGAL_ROTA },
};

const DOCUMENTOS = [
  { id: "termos", titulo: "Termos de Uso", clausulas: TERMOS_DE_USO },
  {
    id: "privacidade",
    titulo: "Política de Privacidade",
    clausulas: POLITICA_DE_PRIVACIDADE,
  },
] as const;

const RESUMO = [
  "Você compra uma licença pessoal do e-book: pode usar os prompts à vontade, mas não pode revender nem compartilhar o arquivo.",
  "Você tem 7 dias, a partir da compra, para desistir e receber 100% do valor de volta.",
  "As ferramentas de IA, como ChatGPT e Gemini, são de outras empresas e não estão incluídas no preço.",
  "As fotos que você envia para a IA não passam pela LowTec.",
  "Coletamos só o necessário para a sua conta e a sua compra. Não vendemos os seus dados e não usamos cookies de publicidade.",
] as const;

export default function TermosEPrivacidadePage() {
  return (
    <div className="bg-fundo relative isolate flex-1 overflow-x-clip">
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-6">
        <Link href="/" aria-label="LowTec, página inicial" className="w-fit">
          <Image
            src={logoSubmark}
            alt=""
            width={448}
            height={337}
            className="h-12 w-auto"
          />
        </Link>

        <Link
          href="/"
          className="font-ui text-text2 hover:text-marca inline-flex items-center gap-1.5 text-sm font-bold transition-colors"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Voltar ao site
        </Link>
      </header>

      <main>
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="relative -z-10 h-56 sm:h-72 md:absolute md:inset-0 md:h-auto"
          >
            <Image
              src={imagemTermos}
              alt=""
              fill
              preload
              sizes="100vw"
              className="object-cover object-[center_45%]"
            />
            <div className="from-fundo/10 via-fundo/30 to-fundo md:from-fundo/70 md:via-fundo/35 md:to-fundo absolute inset-0 bg-linear-to-b" />
          </div>

          <div className="mx-auto max-w-6xl px-6 md:flex md:min-h-[clamp(30rem,42vw,38rem)] md:items-center md:py-16">
            <div className="md:bg-cartao/90 max-w-3xl pt-2 md:rounded-xl md:p-10 md:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] md:ring-1 md:ring-white/10 md:backdrop-blur-sm">
              <h1 className="font-display text-text1 mb-3 text-[clamp(2.25rem,5vw,3.5rem)] leading-[0.95] font-black tracking-tight italic">
                Termos de Uso e{" "}
                <span className="from-marca to-text1 bg-linear-to-r bg-clip-text pr-2 text-transparent">
                  Política de Privacidade
                </span>
              </h1>

              <h2
                id="resumo-titulo"
                className="font-ui text-text1 text-base font-bold"
              >
                Em resumo
              </h2>
              <Lista className="text-text2 mt-4 text-sm leading-relaxed">
                {RESUMO.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </Lista>

              <nav
                aria-label="Documentos desta página"
                className="font-ui mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold lg:hidden"
              >
                {DOCUMENTOS.map(({ id, titulo }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="text-marca underline-offset-4 hover:underline"
                  >
                    {titulo}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 py-10 lg:py-14">
          <div className="grid gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
            <aside className="hidden lg:block">
              <div className="sticky top-8 max-h-[calc(100svh-4rem)] overflow-y-auto pb-8">
                <Sumario documentos={DOCUMENTOS} />
              </div>
            </aside>

            <div className="grid max-w-3xl gap-20">
              {DOCUMENTOS.map((documento) => (
                <Documento key={documento.id} {...documento} />
              ))}

              <section
                aria-labelledby="legislacao-titulo"
                className="border-marca/15 border-t border-dashed pt-10"
              >
                <h2
                  id="legislacao-titulo"
                  className="font-ui text-text1 text-lg font-bold"
                >
                  Legislação de referência
                </h2>
                <p className="text-text2 mt-3 leading-relaxed">
                  Os textos oficiais podem ser consultados nos sites do governo
                  federal:
                </p>
                <ul className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                  {LEGISLACAO.map(({ nome, descricao, href }) => (
                    <li key={nome}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-cartao hover:ring-marca/40 group block h-full rounded-xl p-4 ring-1 ring-white/10 transition-shadow"
                      >
                        <span className="font-ui text-text1 group-hover:text-marca block font-bold transition-colors">
                          {nome}
                        </span>
                        <span className="text-text3 mt-1 block">
                          {descricao}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
