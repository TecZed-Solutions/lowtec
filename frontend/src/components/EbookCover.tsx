import Image from "next/image";

// Mockup 3D provisório da capa; troque o conteúdo da frente pela arte real quando existir
export default function EbookCover() {
  return (
    <div
      role="img"
      aria-label="Capa do e-book LowTec de prompts para retratos com IA"
      className="group relative select-none perspective-distant"
    >
      {/* Sombra no chão */}
      <div
        aria-hidden="true"
        className="absolute -bottom-8 left-1/2 h-8 w-4/5 -translate-x-1/2 rounded-[50%] bg-black/70 blur-xl"
      />

      <div className="relative aspect-3/4 w-56 transform-[rotateY(24deg)] transition-transform duration-700 ease-out transform-3d group-hover:transform-[rotateY(8deg)] motion-reduce:transition-none sm:w-60">
        {/* Lombada */}
        <div
          aria-hidden="true"
          className="from-marca1 to-fundo2 absolute inset-y-0 -left-3 flex w-6 transform-[rotateY(-90deg)] items-center justify-center bg-linear-to-b"
        >
          <span className="font-ui text-text1/80 text-[0.55rem] font-bold tracking-[0.3em] uppercase [writing-mode:vertical-rl]">
            LowTec
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
        <div className="bg-fundo2 absolute inset-0 flex transform-[translateZ(0.75rem)] flex-col justify-between overflow-hidden rounded-r-md p-6 shadow-[20px_30px_60px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
          <div
            aria-hidden="true"
            className="bg-marca/30 absolute -top-12 -right-12 size-44 rounded-full blur-3xl"
          />
          <div
            aria-hidden="true"
            className="from-marca/20 absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t to-transparent"
          />
          <div
            aria-hidden="true"
            className="border-marca/30 absolute inset-3 rounded-sm border border-dashed"
          />
          {/* Vinco da lombada */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-4 bg-linear-to-r from-black/60 to-transparent"
          />

          <Image
            src="/logo_submark.svg"
            alt=""
            width={448}
            height={337}
            className="relative h-7 w-auto self-start"
          />

          <div className="relative">
            <p className="font-ui text-marca text-[0.6rem] font-bold tracking-[0.3em] uppercase">
              E-book
            </p>
            <p className="font-display text-text1 mt-1 text-[2.1rem] leading-[0.9] font-black tracking-tight italic">
              Retratos
              <br />
              com{" "}
              <span className="from-marca to-text1 bg-linear-to-r bg-clip-text pr-1 text-transparent">
                IA
              </span>
            </p>
            <p className="text-text2 mt-3 text-[0.7rem] leading-snug">
              Prompts prontos para transformar a sua foto
            </p>
          </div>

          <div className="font-ui text-text3 relative flex items-center justify-between text-[0.55rem] font-bold tracking-widest uppercase">
            <span>+100 prompts</span>
            <span>LowTec</span>
          </div>
        </div>
      </div>
    </div>
  );
}
