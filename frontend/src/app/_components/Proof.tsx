import Comparison from "@/components/Comparison";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal";

// Troque pelos arquivos e pelo prompt reais do seu e-book.
const EXAMPLE = {
  before: "/proof/angulos.jpg",
  after: "/proof/luz.jpg",
  fileName: "foto-original.jpg",
  prompt:
    "Mantenha o rosto da foto enviada. Retrato profissional de estúdio, meio corpo, câmera na altura dos olhos, rosto em 3/4 com olhar direto para a lente, blazer escuro, luz suave de janela a 45 graus com rebatedor, fundo cinza-claro neutro, 85 mm f/1.8, tons de pele naturais. Mantenha o rosto da foto enviada. Retrato profissional de estúdio, meio corpo, câmera na altura dos olhos, rosto em 3/4 com olhar direto para a lente, blazer escuro, luz suave de janela a 45 graus com rebatedor, fundo cinza-claro neutro, 85 mm f/1.8, tons de pele naturais...",
} as const;

export default function Proof() {
  return (
    <section
      id="proof"
      aria-labelledby="results-title"
      className="bg-fundo border-marca/15 relative border-t border-dashed"
    >
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto flex max-w-2xl flex-col gap-4 text-center lg:mx-0 lg:text-left">
          <h2
            id="results-title"
            className="font-display text-text1 text-[clamp(2rem,4.5vw,3.25rem)] leading-none font-black tracking-tight italic"
          >
            A mesma foto, com um prompt de estúdio.
          </h2>
          <p className="text-text2 text-lg leading-relaxed">
            Passe o mouse ou arraste o controle para comparar a foto original
            com o resultado. Ao lado, o prompt usado para chegar nele.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-14 lg:mt-16 lg:grid-cols-2 lg:gap-16">
          <div className="relative isolate mx-auto h-max w-full max-w-md lg:mx-0">
            <div
              aria-hidden="true"
              className="border-marca/40 absolute inset-0 -z-10 -translate-x-3 -translate-y-3 rounded-lg border border-dashed"
            />

            <div className="relative overflow-hidden rounded-lg ring-1 ring-white/10">
              <Comparison imageOne={EXAMPLE.before} imageTwo={EXAMPLE.after} />
            </div>
          </div>

          <div role="group" aria-label="Prompt usado para gerar a imagem">
            <Terminal className="bg-cartao max-h-none min-h-80 max-w-none border-white/10">
              <TypingAnimation duration={25} className="text-text2">
                {`$ anexar ${EXAMPLE.fileName}`}
              </TypingAnimation>

              <AnimatedSpan className="text-marca">
                ✔ Foto anexada.
              </AnimatedSpan>

              <TypingAnimation
                duration={18}
                className="text-text1 whitespace-pre-wrap"
              >
                {EXAMPLE.prompt}
              </TypingAnimation>

              <AnimatedSpan className="text-marca">
                ✔ Resultado gerado.
              </AnimatedSpan>
            </Terminal>
          </div>
        </div>
      </div>
    </section>
  );
}
