import { ArrowRight, MoveHorizontal } from "lucide-react";

import Comparison from "@/components/Comparison";
import CtaButton from "@/components/CtaButton";
import { DotPattern } from "@/components/ui/dot-pattern";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal";

const EXAMPLE = {
  before: "/proof/luz.jpg",
  after: "/proof/angulos.jpg",
  fileName: "foto-original.jpg",
  prompt:
    "Mantenha o rosto da foto enviada. Retrato profissional de estúdio, meio corpo, câmera na altura dos olhos, rosto em 3/4 com olhar direto para a lente, blazer escuro, luz suave de janela a 45 graus com rebatedor, fundo cinza-claro neutro, 85 mm f/1.8, tons de pele naturais...",
} as const;

export default function Proof() {
  return (
    <section
      id="proof"
      aria-labelledby="results-title"
      className="bg-fundo border-marca/15 relative isolate overflow-hidden border-t border-dashed"
    >
      <DotPattern
        width={24}
        height={24}
        cr={1.2}
        className="text-marca/30 -z-10 mask-[radial-gradient(ellipse_at_center,#000_30%,transparent_80%)]"
      />

      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <h2
            id="results-title"
            className="font-display text-text1 text-[clamp(2rem,4.5vw,3.25rem)] leading-none font-black tracking-tight italic"
          >
            A mesma foto, agora com{" "}
            <span className="from-marca to-text1 bg-linear-to-r bg-clip-text pr-2 text-transparent">
              cara de estúdio.
            </span>
          </h2>

          <p className="text-text2 text-lg leading-relaxed text-balance">
            Compare a foto original com o resultado e veja o prompt exato que
            fez a diferença.
          </p>
        </div>

        <div className="relative isolate mt-12 lg:mt-16">
          <div
            aria-hidden="true"
            className="bg-marca/15 pointer-events-none absolute inset-x-12 inset-y-8 -z-20 rounded-full blur-[100px]"
          />

          <figure>
            <div className="relative">
              {/* Moldura deslocada para dar profundidade */}
              <div
                aria-hidden="true"
                className="border-marca/40 absolute inset-0 -z-10 -translate-x-3 -translate-y-3 rounded-lg border border-dashed"
              />

              <div className="relative aspect-4/5 overflow-hidden rounded-lg ring-1 ring-white/10 sm:aspect-video">
                <Comparison
                  imageOne={EXAMPLE.before}
                  imageTwo={EXAMPLE.after}
                />
              </div>
            </div>

            <figcaption className="text-text3 mt-4 flex items-center justify-center gap-2 text-sm lg:justify-start">
              <MoveHorizontal
                className="text-marca size-4"
                aria-hidden="true"
              />
              Passe o mouse ou arraste para comparar
            </figcaption>
          </figure>

          {/* No desktop o terminal sobrepõe o canto inferior direito da imagem */}
          <div
            className="relative z-20 mx-auto mt-8 w-full max-w-xl select-none lg:absolute lg:-right-24 lg:-bottom-24 lg:mt-0 lg:w-md xl:w-lg"
            role="group"
            aria-label="Prompt usado para gerar a imagem"
          >
            <Terminal className="bg-cartao border-marca/25 max-h-none max-w-none">
              <TypingAnimation duration={25} className="text-text2 min-h-lh">
                {`$ anexar ${EXAMPLE.fileName}`}
              </TypingAnimation>

              <AnimatedSpan className="text-marca">
                ✔ Foto anexada.
              </AnimatedSpan>

              {/* Cópia invisível reserva a altura final e evita salto durante a digitação */}
              <div className="grid">
                <span
                  aria-hidden="true"
                  className="invisible col-start-1 row-start-1 text-sm tracking-tight whitespace-pre-wrap"
                >
                  {EXAMPLE.prompt}
                </span>
                <TypingAnimation
                  duration={18}
                  className="text-text1 col-start-1 row-start-1 whitespace-pre-wrap"
                >
                  {EXAMPLE.prompt}
                </TypingAnimation>
              </div>

              <AnimatedSpan className="text-marca">
                ✔ Retrato de estúdio gerado.
              </AnimatedSpan>
            </Terminal>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 lg:mt-28">
          <CtaButton href="#comprar">
            Quero esse resultado
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </CtaButton>
          <p className="text-text3 text-sm">
            Acesso imediato ao e-book após a compra.
          </p>
        </div>
      </div>
    </section>
  );
}
