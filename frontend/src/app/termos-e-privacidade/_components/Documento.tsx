import type { ReactNode } from "react";

export interface Clausula {
  id: string;
  titulo: string;
  conteudo: ReactNode;
}

interface DocumentoProps {
  id: string;
  titulo: string;
  clausulas: readonly Clausula[];
}

export default function Documento({ id, titulo, clausulas }: DocumentoProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-titulo`}
      className="border-marca/15 scroll-mt-8 border-t border-dashed pt-10"
    >
      <h2
        id={`${id}-titulo`}
        className="font-display text-text1 text-[clamp(2rem,4vw,2.75rem)] leading-none font-black tracking-tight italic"
      >
        {titulo}
      </h2>

      <ol className="mt-10 grid gap-12">
        {clausulas.map((clausula, index) => (
          <li key={clausula.id} id={clausula.id} className="scroll-mt-8">
            <h3 className="font-ui text-text1 flex gap-3 text-lg leading-snug font-bold">
              <span className="text-marca tabular-nums">{index + 1}.</span>
              {clausula.titulo}
            </h3>
            <div className="text-text2 [&_strong]:text-text1 [&_a]:text-marca [&_a:hover]:text-text1 mt-4 grid gap-4 leading-relaxed [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-semibold">
              {clausula.conteudo}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
