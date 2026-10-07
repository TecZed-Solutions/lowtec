export default function VaguePrompt() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-6 top-6 flex flex-col gap-3"
    >
      <div className="bg-fundo/60 ring-marca/20 flex items-center gap-3 rounded-md px-4 py-3 ring-1">
        <p className="text-text1 flex-1 truncate font-mono text-sm">
          faz uma foto profissional minha, bem bonita
          <span className="bg-marca ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 motion-safe:animate-pulse" />
        </p>
        <span className="bg-marca font-ui text-fundo -skew-x-12 px-3 py-1 text-xs font-extrabold">
          <span className="inline-block skew-x-12">Gerar</span>
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {["Qual câmera?", "Qual luz?", "Qual pose?", "Qual fundo?"].map((q) => (
          <span
            key={q}
            className="border-marca/30 bg-marca/5 text-marca rounded-sm border border-dashed px-2.5 py-1 text-xs"
          >
            {q}
          </span>
        ))}
      </div>
    </div>
  );
}
