"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Check, Copy, Pause, Play } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";

const CATEGORIES = [
  {
    id: "angulos",
    label: "Ângulos",
    image: "/prompt-showcase/angulos.jpg",
    prompt:
      "Mantenha o rosto da foto enviada. Retrato em plano médio, câmera levemente abaixo da linha dos olhos, rosto em 3/4 virado para a esquerda, olhar direto para a lente, 85 mm f/1.8, fundo desfocado.",
  },
  {
    id: "poses",
    label: "Poses",
    image: "/prompt-showcase/poses.jpg",
    prompt:
      "Mantenha o rosto da foto enviada. Meio corpo, braços cruzados e ombros relaxados, leve inclinação da cabeça, sorriso discreto, postura segura de liderança, blazer escuro.",
  },
  {
    id: "luz",
    label: "Luz",
    image: "/prompt-showcase/luz.jpg",
    prompt:
      "Mantenha o rosto da foto enviada. Luz suave de janela a 45 graus, rebatedor preenchendo as sombras, tons de pele naturais, contraste moderado, fundo neutro em cinza-claro.",
  },
  {
    id: "efeitos",
    label: "Efeitos",
    image: "/prompt-showcase/efeitos.avif",
    prompt:
      "Mantenha o rosto da foto enviada. Fundo escuro com luz de contorno esverdeada, profundidade de campo rasa, grão fino de filme, acabamento de capa de revista.",
  },
] as const;

export default function PromptShowcase() {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [copied, setCopied] = useState(false);

  const [autoplay] = useState(() =>
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  );

  const active = CATEGORIES[activeIndex];

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
      setCopied(false);
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Respeita prefers-reduced-motion
  useEffect(() => {
    if (!api) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      autoplay.stop();
      setPlaying(false);
    }
  }, [api, autoplay]);

  // Volta o botão "Copiado" ao normal
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const togglePlay = () => {
    if (playing) autoplay.stop();
    else autoplay.play();
    setPlaying(!playing);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(active.prompt);
      setCopied(true);
    } catch {
      // clipboard indisponível (ex.: contexto não seguro): falha silenciosa
    }
  };

  return (
    <div className="relative isolate drop-shadow-[0_30px_60px_rgba(73,229,16,0.14)]">
      {/* Moldura deslocada para dar profundidade */}
      <div
        aria-hidden="true"
        className="border-marca/40 absolute inset-0 -z-10 translate-x-3 translate-y-3 rounded-lg border border-dashed"
      />

      <div className="bg-cartao overflow-hidden rounded-lg ring-1 ring-white/10">
        <Carousel
          setApi={setApi}
          plugins={[autoplay]}
          opts={{ loop: true }}
          className="w-full"
        >
          <CarouselContent>
            {CATEGORIES.map((category) => (
              <CarouselItem key={category.id}>
                <div className="bg-fundo2 relative h-80 sm:h-96">
                  <Image
                    src={category.image}
                    alt={category.label}
                    fill
                    priority={category.id === CATEGORIES[0].id}
                    sizes="(min-width: 1024px) 28rem, 100vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="from-cartao/80 absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t to-transparent"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="bg-fundo/70 text-text1 hover:bg-fundo/90 left-4 border-white/10 backdrop-blur-sm" />
          <CarouselNext className="bg-fundo/70 text-text1 hover:bg-fundo/90 right-4 border-white/10 backdrop-blur-sm" />
        </Carousel>

        <div className="border-t border-dashed border-white/15 p-6">
          <h2 className="sr-only">Exemplos de prompts do e-book</h2>

          <div className="flex items-start justify-between gap-3">
            <div
              role="tablist"
              aria-label="Categoria do prompt"
              className="flex flex-wrap gap-2"
            >
              {CATEGORIES.map((category, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={category.id}
                    id={`tab-${category.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="prompt-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => api?.scrollTo(index)}
                    className={`font-ui focus-visible:outline-marca relative overflow-hidden rounded-sm px-3 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      isActive
                        ? "bg-marca text-fundo"
                        : "text-text2 hover:text-text1 bg-white/5"
                    }`}
                  >
                    {category.label}

                    {/* Barra de progresso do autoplay */}
                    {isActive && playing && (
                      <span
                        key={`${active.id}-${playing}`}
                        aria-hidden="true"
                        className="bg-fundo/40 absolute inset-x-0 bottom-0 h-0.5 origin-left animate-[progress_5s_linear_forwards]"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={togglePlay}
              aria-label={
                playing
                  ? "Pausar rotação automática"
                  : "Retomar rotação automática"
              }
              className="text-text2 hover:text-text1 focus-visible:outline-marca shrink-0 rounded-sm p-2 transition-colors focus-visible:outline-2"
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}
            </button>
          </div>

          <div
            id="prompt-panel"
            role="tabpanel"
            aria-labelledby={`tab-${active.id}`}
            key={active.id}
            className="mt-5 motion-safe:animate-[prompt-in_.3s_ease-out]"
          >
            <div className="border-marca text-text1 min-h-32 border-l-2 pl-4 text-[0.95rem] leading-relaxed">
              {active.prompt}
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="font-ui text-text2 hover:text-marca focus-visible:outline-marca mt-4 inline-flex items-center gap-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {copied ? (
                <Check size={16} aria-hidden="true" />
              ) : (
                <Copy size={16} aria-hidden="true" />
              )}
              <span aria-live="polite">
                {copied ? "Prompt copiado" : "Copiar prompt"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
