import type { LucideIcon } from "lucide-react";
import { ArrowRight, LayoutGrid, ListOrdered, Sparkles } from "lucide-react";

import CtaButton from "@/components/CtaButton";
import EbookCover from "@/components/EbookCover";
import { LightRays } from "@/components/ui/light-rays";
import { NumberTicker } from "@/components/ui/number-ticker";

import { CATEGORIES, STEPS, TOOLS } from "@/constants/solution";

function CardHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="bg-marca/10 text-marca flex size-10 shrink-0 items-center justify-center rounded-full">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div>
        <h3 className="font-ui text-text1 text-lg font-bold">{title}</h3>
        <p className="text-text2 mt-1 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function Solution() {
  return (
    <section
      id="ebook"
      aria-labelledby="solution-title"
      className="bg-fundo border-marca/15 relative isolate overflow-hidden border-t border-dashed"
    >
      <LightRays
        color="rgba(73, 229, 16, 0.22)"
        count={8}
        speed={14}
        length="10vh"
        className="-z-10 motion-reduce:hidden"
      />

      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <h2
            id="solution-title"
            className="font-display text-text1 text-[clamp(2rem,4.5vw,3.25rem)] leading-none font-black tracking-tight italic"
          >
            O problema não é a IA.{" "}
            <span className="from-marca to-text1 block bg-linear-to-r bg-clip-text pr-2 text-transparent">
              É o prompt.
            </span>
          </h2>

          <p className="text-text2 text-lg leading-relaxed text-balance">
            Por isso reunimos em um e-book prompts completos, organizados por
            categoria e prontos para colar. Você só escolhe o estilo e envia a
            sua foto.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-3">
          <article className="bg-cartao relative isolate flex flex-col items-center justify-between gap-12 overflow-hidden rounded-lg px-6 pt-12 pb-8 ring-1 ring-white/10 lg:row-span-2">
            <div
              aria-hidden="true"
              className="bg-marca/20 absolute top-8 left-1/2 -z-10 size-64 -translate-x-1/2 rounded-full blur-[80px]"
            />

            <EbookCover />

            <div className="text-center">
              <p className="font-display text-marca text-6xl leading-none font-black tracking-tight italic">
                <span className="sr-only">+100</span>
                <span aria-hidden="true">
                  +
                  <NumberTicker
                    value={100}
                    className="text-marca min-w-[3ch] text-left tracking-tight"
                  />
                </span>
              </p>
              <h3 className="text-text2 mt-2">
                prompts prontos para copiar e colar
              </h3>
            </div>
          </article>

          <article className="bg-cartao rounded-lg p-6 ring-1 ring-white/10 lg:col-span-2 lg:p-8">
            <CardHeader
              icon={LayoutGrid}
              title="Categorias para cada objetivo"
              description="Do retrato de carreira à capa de revista: escolha o estilo e aplique na sua foto."
            />

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {CATEGORIES.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 rounded-md bg-white/5 px-4 py-3 ring-1 ring-white/10"
                >
                  <Icon className="text-marca size-4" aria-hidden="true" />
                  <span className="font-ui text-text1 text-sm font-semibold">
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-text3 mt-4 text-sm">
              + várias outras categorias dentro do e-book.
            </p>
          </article>

          <article className="bg-cartao flex flex-col rounded-lg p-6 ring-1 ring-white/10 lg:p-8">
            <CardHeader
              icon={ListOrdered}
              title="Pronto em 3 passos"
              description="Cada prompt já define câmera, pose, luz, fundo e acabamento."
            />

            <ol className="mt-auto flex flex-col gap-3 pt-6">
              {STEPS.map((step, index) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="bg-marca font-ui text-fundo flex size-7 shrink-0 -skew-x-12 items-center justify-center text-sm font-black">
                    <span className="skew-x-12">{index + 1}</span>
                  </span>
                  <span className="text-text1 text-sm font-semibold">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </article>

          <article className="bg-cartao flex flex-col rounded-lg p-6 ring-1 ring-white/10 lg:p-8">
            <CardHeader
              icon={Sparkles}
              title="Funciona onde você já usa"
              description="Em qualquer IA que aceite uma foto de referência."
            />

            <ul className="mt-auto grid gap-3 pt-6 sm:grid-cols-2">
              {TOOLS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 rounded-md bg-white/5 px-4 py-3 ring-1 ring-white/10"
                >
                  <Icon className="text-marca size-4" aria-hidden="true" />
                  <span className="font-ui text-text1 text-sm font-semibold">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3">
          <CtaButton href="#comprar">
            Quero o e-book
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </CtaButton>
          <p className="text-text3 text-sm">Acesso imediato após a compra.</p>
        </div>
      </div>
    </section>
  );
}
