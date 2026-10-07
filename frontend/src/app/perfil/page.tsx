import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { COMPRAS } from "@/mock/compra";
import { PAGAMENTOS } from "@/mock/pagamento";
import { USUARIO } from "@/mock/usuario";

import PaymentsSection from "./_components/PaymentsSection";
import ProductsSection from "./_components/ProductsSection";
import ProfileSidebar from "./_components/ProfileSidebar";
import { primeiroNome } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Perfil | LowTec",
  robots: { index: false, follow: false },
};

export default function PerfilPage() {
  return (
    <div className="bg-fundo relative isolate flex-1 overflow-hidden">
      <header className="border-marca/15 border-b border-dashed">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" aria-label="LowTec, página inicial" className="w-fit">
            <Image
              src="/logo_submark.svg"
              alt=""
              width={448}
              height={337}
              priority
              className="h-10 w-auto"
            />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:py-14">
        <h1 className="font-display text-text1 text-[clamp(2rem,4vw,2.75rem)] leading-none font-black tracking-tight italic">
          Olá,{" "}
          <span className="from-marca to-text1 bg-linear-to-r bg-clip-text pr-2 text-transparent">
            {primeiroNome(USUARIO.name)}.
          </span>
        </h1>
        <p className="text-text2 mt-3">
          Seus produtos e histórico de pagamentos ficam aqui.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[20rem_minmax(0,1fr)]">
          <ProfileSidebar usuario={USUARIO} />

          <div className="flex min-w-0 flex-col gap-8">
            <ProductsSection compras={COMPRAS} />
            <PaymentsSection pagamentos={PAGAMENTOS} />
          </div>
        </div>
      </main>
    </div>
  );
}
