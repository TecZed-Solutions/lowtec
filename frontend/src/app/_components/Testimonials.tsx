import { ArrowRight } from "lucide-react";

import CtaButton from "@/components/CtaButton";
import PrintCard from "@/components/testimonials/PrintCard";
import TestimonialCard from "@/components/testimonials/TestimonialCard";
import { Marquee } from "@/components/ui/marquee";

import { TESTIMONIAL_PRINTS, TESTIMONIALS } from "@/constants/testimonials";

const PRINT_TILT = ["-rotate-3 lg:translate-y-6", "rotate-3 -ml-6"] as const;

export default function Testimonials() {
  return (
    <section
      id="depoimentos"
      aria-labelledby="testimonials-title"
      className="bg-fundo border-marca/15 relative isolate overflow-hidden border-t border-dashed"
    >
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <h2
            id="testimonials-title"
            className="font-display text-text1 text-[clamp(2rem,4.5vw,3.25rem)] leading-none font-black tracking-tight text-balance italic"
          >
            Resultados reais de{" "}
            <span className="from-marca to-text1 bg-linear-to-r bg-clip-text pr-2 text-transparent">
              quem já comprou.
            </span>
          </h2>

          <p className="text-text2 text-lg leading-relaxed text-balance">
            Prints e comentários enviados por clientes que já estão usando os
            prompts do e-book.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-12 lg:mt-16 lg:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] lg:gap-16">
          <div className="relative isolate mx-auto flex w-full max-w-md justify-center lg:pb-6">
            <div
              aria-hidden="true"
              className="bg-marca/15 pointer-events-none absolute inset-10 -z-10 rounded-full blur-[90px]"
            />

            {TESTIMONIAL_PRINTS.map(
              (print, index) =>
                print && (
                  <PrintCard
                    key={index}
                    print={print}
                    label={`Print do cliente ${index + 1}`}
                    className={`w-1/2 max-w-56 ${PRINT_TILT[index]}`}
                  />
                ),
            )}
          </div>

          <div className="min-w-0">
            <div
              aria-hidden="true"
              className="-mx-6 flex flex-col mask-[linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)] sm:mx-0"
            >
              <Marquee pauseOnHover className="[--duration:45s]">
                {TESTIMONIALS.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.name}
                    className="w-72 sm:w-80"
                    {...testimonial}
                  />
                ))}
              </Marquee>
              <Marquee pauseOnHover reverse className="[--duration:45s]">
                {[...TESTIMONIALS].reverse().map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.name}
                    className="w-72 sm:w-80"
                    {...testimonial}
                  />
                ))}
              </Marquee>
            </div>

            <ul className="sr-only">
              {TESTIMONIALS.map(({ name, detail, text }) => (
                <li key={name}>
                  {name}, {detail}: {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 lg:mt-16">
          <CtaButton href="#comprar">
            Quero o meu resultado
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </CtaButton>
          <p className="text-text3 text-sm">Acesso imediato após a compra.</p>
        </div>
      </div>
    </section>
  );
}
