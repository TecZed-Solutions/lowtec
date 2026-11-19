import type { Clausula } from "./Documento";

interface SumarioProps {
  documentos: readonly {
    id: string;
    titulo: string;
    clausulas: readonly Clausula[];
  }[];
}

export default function Sumario({ documentos }: SumarioProps) {
  return (
    <nav aria-label="Sumário" className="grid gap-8">
      {documentos.map(({ id, titulo, clausulas }) => (
        <div key={id}>
          <a
            href={`#${id}`}
            className="font-ui text-text1 hover:text-marca text-sm font-bold transition-colors"
          >
            {titulo}
          </a>
          <ol className="mt-3 grid gap-2 border-l border-white/10 text-sm">
            {clausulas.map((clausula, index) => (
              <li key={clausula.id}>
                <a
                  href={`#${clausula.id}`}
                  className="text-text3 hover:text-marca hover:border-marca -ml-px flex gap-2 border-l border-transparent pl-4 leading-snug transition-colors"
                >
                  <span className="w-6 shrink-0 tabular-nums">
                    {index + 1}.
                  </span>
                  {clausula.titulo}
                </a>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </nav>
  );
}
