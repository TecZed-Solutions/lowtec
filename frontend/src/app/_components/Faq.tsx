import { ArrowRight } from "lucide-react";

import CtaButton from "@/components/CtaButton";
import FaqChat from "@/components/faq/FaqChat";

export default function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="bg-fundo border-marca/15 relative isolate overflow-hidden border-t border-dashed"
    >
      <div
        aria-hidden="true"
        className="bg-marca/10 pointer-events-none absolute top-1/2 right-0 -z-10 hidden h-128 w-lg translate-x-1/4 -translate-y-1/2 rounded-full blur-[120px] lg:block"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,38rem)] lg:gap-16">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <h2
            id="faq-title"
            className="font-display text-text1 text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.9] font-black tracking-tight italic"
          >
            Ficou com alguma dúvida?{" "}
            <span className="from-marca to-text1 block bg-linear-to-r bg-clip-text pr-2 text-transparent">
              Pergunte.
            </span>
          </h2>

          <p className="text-text2 max-w-md text-lg leading-relaxed text-balance">
            Toque em uma pergunta e a resposta chega na hora, como numa
            conversa.
          </p>

          <CtaButton href="#comprar">
            Quero o e-book
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </CtaButton>
        </div>

        <FaqChat />
      </div>
    </section>
  );
}
