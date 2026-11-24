import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import CtaButton from "@/components/CtaButton";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import logoSubmark from "@public/logo_submark.svg";

export default function NotFound() {
  return (
    <main className="bg-fundo relative isolate flex flex-1 flex-col overflow-hidden">
      <AnimatedGridPattern
        width={56}
        height={56}
        numSquares={30}
        maxOpacity={0.2}
        duration={3}
        className="text-marca stroke-marca/10 -z-10 skew-y-12 mask-[radial-gradient(ellipse_at_center,#000_20%,transparent_70%)] motion-reduce:hidden"
      />

      <div
        aria-hidden="true"
        className="bg-marca/15 absolute top-1/2 left-1/2 -z-10 size-96 -translate-1/2 rounded-full blur-[120px]"
      />

      <header className="mx-auto w-full max-w-7xl px-6 py-8">
        <Link
          href="/"
          aria-label="LowTec, página inicial"
          className="mx-auto block w-fit sm:mx-0"
        >
          <Image src={logoSubmark} alt="" priority className="h-12 w-auto" />
        </Link>
      </header>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-6 px-6 pb-24 text-center">
        <p className="font-display text-[clamp(7rem,24vw,13rem)] leading-none font-black tracking-tighter text-transparent italic [-webkit-text-stroke:2px_var(--color-marca)]">
          404
        </p>

        <h1 className="font-display text-text1 text-[clamp(2rem,4.5vw,3.25rem)] leading-none font-black tracking-tight italic">
          Essa versão{" "}
          <span className="from-marca to-text1 bg-linear-to-r bg-clip-text pr-2 text-transparent">
            não existe.
          </span>
        </h1>

        <p className="text-text2 text-lg leading-relaxed text-balance">
          O endereço pode estar errado ou a página mudou de lugar. Volte para o
          início e conheça as 100 versões que você pode criar.
        </p>

        <CtaButton href="/" className="mt-2">
          Voltar para o início
          <ArrowRight className="transition-transform group-hover:translate-x-1" />
        </CtaButton>
      </div>
    </main>
  );
}
