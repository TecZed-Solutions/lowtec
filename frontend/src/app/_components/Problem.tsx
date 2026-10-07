import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

import { PAINS } from "@/constants/problem";

export default function Problem() {
  return (
    <section
      id="problema"
      aria-labelledby="problem-title"
      className="bg-fundo border-marca/15 relative isolate overflow-hidden border-t border-dashed"
    >
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <h2
            id="problem-title"
            className="font-display text-text1 text-[clamp(2rem,4.5vw,3.25rem)] leading-none font-black tracking-tight italic"
          >
            Você sabe o que quer criar.{" "}
            <span className="from-marca to-text1 block bg-linear-to-r bg-clip-text pr-2 text-transparent">
              A IA é que não entende.
            </span>
          </h2>

          <p className="text-text2 text-lg leading-relaxed text-balance">
            Sem o prompt certo, cada foto vira tentativa e erro. Se você já
            tentou, provavelmente passou por isso:
          </p>
        </div>

        <BentoGrid className="mt-12 auto-rows-96 lg:mt-16 lg:auto-rows-80">
          {PAINS.map(({ Visual, ...pain }) => (
            <BentoCard
              key={pain.name}
              href="#ebook"
              background={<Visual />}
              {...pain}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
