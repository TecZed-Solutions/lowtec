import { ArrowRight, Check } from "lucide-react";

import CtaButton from "@/components/CtaButton";
import EbookCover from "@/components/solution/EbookCover";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";

import { OFFER, TRUST } from "@/constants/offer";

export default function Offer() {
  return (
    <section
      id="comprar"
      aria-labelledby="offer-title"
      className="bg-fundo border-marca/15 relative isolate overflow-hidden border-t border-dashed"
    >
      {/* Grade animada e brilho de fundo */}
      <AnimatedGridPattern
        width={56}
        height={56}
        numSquares={40}
        maxOpacity={0.2}
        duration={3}
        className="text-marca stroke-marca/10 -z-10 skew-y-12 mask-[radial-gradient(ellipse_at_center,#000_25%,transparent_80%)] motion-reduce:hidden"
      />

      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="relative mx-auto max-w-5xl">
          <div
            aria-hidden="true"
            className="border-marca/40 absolute inset-0 -z-10 translate-x-3 translate-y-3 rounded-xl border border-dashed"
          />

          <div className="bg-cartao ring-marca/30 grid overflow-hidden rounded-xl ring-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div className="bg-fundo2 relative isolate flex items-center justify-center overflow-hidden px-6 pt-16 pb-20 lg:py-16">
              <div
                aria-hidden="true"
                className="bg-marca/25 absolute top-1/2 left-1/2 -z-10 size-72 -translate-1/2 rounded-full blur-[90px]"
              />

              <div className="relative">
                <EbookCover />
                <span className="bg-marca font-ui text-fundo absolute -top-4 -right-6 z-10 -skew-x-12 px-3 py-1.5 text-sm font-black">
                  <span className="inline-block skew-x-12">{OFFER.badge}</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-8 p-6 sm:p-8 lg:p-12">
              <div>
                <h2
                  id="offer-title"
                  className="font-display text-text1 text-[clamp(2rem,4vw,3rem)] leading-[0.95] font-black tracking-tight text-balance italic"
                >
                  Chega de tentativa e erro.{" "}
                  <span className="from-marca to-text1 block bg-linear-to-r bg-clip-text pr-2 text-transparent">
                    Comece a acertar.
                  </span>
                </h2>
                <p className="text-text2 mt-4 leading-relaxed">
                  Leve todos os prompts e transforme a sua foto em um retrato
                  profissional ainda hoje.
                </p>
              </div>

              <ul className="flex flex-col gap-3">
                {OFFER.includes.map((item) => (
                  <li
                    key={item}
                    className="text-text1 flex items-start gap-3 text-sm sm:text-base"
                  >
                    <span className="bg-marca/15 text-marca ring-marca/30 mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ring-1">
                      <Check
                        className="size-3"
                        strokeWidth={3}
                        aria-hidden="true"
                      />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="border-t border-dashed border-white/10 pt-6">
                <p className="text-text3 text-sm">
                  De <s>R$ {OFFER.fullPrice}</s> por apenas
                </p>
                <p className="font-display text-marca mt-1 text-6xl leading-none font-black tracking-tight italic">
                  <span className="mr-1 align-top text-2xl">R$</span>
                  {OFFER.price}
                </p>
                <p className="text-text3 mt-2 text-sm">
                  Pagamento único · acesso imediato
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <CtaButton
                  href={OFFER.checkoutHref}
                  className="w-full justify-center px-6 py-5 text-base sm:text-lg"
                >
                  Quero meu e-book agora
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </CtaButton>

                <ul className="text-text3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs">
                  {TRUST.map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-center gap-1.5">
                      <Icon
                        className="text-marca size-3.5"
                        aria-hidden="true"
                      />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
