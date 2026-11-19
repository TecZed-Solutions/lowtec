import { ArrowRight, LockKeyhole, MessageCircle, Zap } from "lucide-react";

import CtaButton from "@/components/CtaButton";
import Header from "@/components/Header";
import HeroPattern from "@/components/hero/HeroPattern";
import ProductShowcase from "@/components/hero/ProductShowcase";

const items = [
  {
    icon: LockKeyhole,
    title: "Compra segura",
    description: "Pagamento protegido",
  },
  {
    icon: Zap,
    title: "Acesso imediato",
    description: "Receba após a compra",
  },
  {
    icon: MessageCircle,
    title: "Suporte direto",
    description: "Fale com a nossa equipe",
  },
];

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="bg-fundo relative isolate min-h-svh overflow-hidden"
    >
      <HeroPattern />

      {/* Brilho atrás do showcase */}
      <div
        aria-hidden="true"
        className="bg-marca/15 pointer-events-none absolute -top-48 -left-64 -z-10 hidden h-128 w-lg rounded-full blur-[120px] lg:block"
      />

      <div
        aria-hidden="true"
        className="bg-marca/15 pointer-events-none absolute top-1/2 right-0 -z-10 hidden h-128 w-lg translate-x-1/4 -translate-y-1/2 rounded-full blur-[120px] lg:block"
      />

      <div className="relative z-10 mx-auto flex min-h-svh max-w-7xl flex-col px-6 py-8">
        <Header />

        <div className="grid flex-1 items-center gap-14 py-12 lg:grid-cols-2 lg:gap-16">
          <div className="motion-safe:animate-fade-in-left flex flex-col items-center gap-7 lg:items-start">
            <h1
              id="hero-title"
              className="font-display text-text1 text-center text-[clamp(2.5rem,6.5vw,4.75rem)] leading-[0.95] font-black tracking-tight italic lg:text-left"
            >
              Transforme a sua foto em um{" "}
              <span className="from-marca to-text1 bg-linear-to-r bg-clip-text pr-2 text-transparent">
                retrato profissional.
              </span>
            </h1>

            <p className="text-text2 max-w-xl text-center text-lg leading-relaxed lg:text-left">
              Com 100 prompts prontos, uma foto sua vira retrato de LinkedIn,
              viagem pelo mundo, ensaio de luxo ou cena de filme, preservando o
              seu rosto. É só escolher, copiar e colar na IA.
            </p>

            <div className="motion-safe:animate-fade-in-up flex flex-col items-center gap-5 lg:items-start">
              <CtaButton href="/checkout">
                Adquirir agora
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </CtaButton>

              <div className="grid w-full max-w-lg grid-cols-1 gap-3 sm:grid-cols-3">
                {items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="bg-marca/10 text-marca flex size-9 shrink-0 items-center justify-center rounded-full">
                        <Icon className="size-4" />
                      </div>
                      <div>
                        <p className="text-text1 text-sm font-bold">
                          {item.title}
                        </p>
                        <p className="text-text2 text-xs">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="motion-safe:animate-fade-in-right mx-auto w-full max-w-md lg:mr-0 lg:ml-auto">
            <ProductShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}
