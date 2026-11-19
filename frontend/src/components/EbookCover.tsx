import Image from "next/image";

export default function EbookCover() {
  return (
    <div
      role="img"
      aria-label="Capa do e-book Você em 100 versões: 100 prompts para geração de fotos com I.A."
      className="group relative select-none perspective-distant"
    >
      {/* Sombra no chão */}
      <div
        aria-hidden="true"
        className="absolute -bottom-8 left-1/2 h-8 w-4/5 -translate-x-1/2 rounded-[50%] bg-black/70 blur-xl"
      />

      {/* Proporção da arte da capa (1055×1491) */}
      <div className="relative aspect-1055/1491 w-56 transform-[rotateY(24deg)] transition-transform duration-700 ease-out transform-3d group-hover:transform-[rotateY(8deg)] motion-reduce:transition-none sm:w-60">
        {/* Lombada */}
        <div
          aria-hidden="true"
          className="from-marca1 to-fundo2 absolute inset-y-0 -left-3 flex w-6 transform-[rotateY(-90deg)] items-center justify-center bg-linear-to-b"
        >
          <span className="font-ui text-text1/80 text-[0.55rem] font-bold tracking-[0.3em] uppercase [writing-mode:vertical-rl]">
            Você em 100 versões
          </span>
        </div>

        {/* Páginas */}
        <div
          aria-hidden="true"
          className="absolute top-[1.5%] left-[calc(100%-0.75rem)] h-[97%] w-6 transform-[rotateY(90deg)] bg-[repeating-linear-gradient(90deg,#f5f5f5_0_1px,#b8b8b8_1px_3px)]"
        />

        {/* Contracapa */}
        <div
          aria-hidden="true"
          className="bg-fundo2 absolute inset-0 transform-[translateZ(-0.75rem)] rounded-r-md"
        />

        {/* Capa */}
        <div className="bg-fundo2 absolute inset-0 transform-[translateZ(0.75rem)] overflow-hidden rounded-r-md shadow-[20px_30px_60px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
          <Image
            src="/Capa_Voce_Em_Cem_Versoes.png"
            alt=""
            fill
            sizes="(min-width: 640px) 15rem, 14rem"
            className="object-cover"
          />

          {/* Vinco da lombada */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-4 bg-linear-to-r from-black/60 to-transparent"
          />
          {/* Brilho do acabamento */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent"
          />
        </div>
      </div>
    </div>
  );
}
