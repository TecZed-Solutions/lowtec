import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, LockKeyhole } from "lucide-react";

import { PRODUCT } from "@/config/product";
import { OFFER, TRUST } from "@/constants/offer";
import { formatarMoeda } from "@/lib/utils";
import capaEbook from "@public/Capa_Voce_Em_Cem_Versoes.png";
import logoSubmark from "@public/logo_submark.svg";

import FinalizarCompra from "./_components/FinalizarCompra";

export const metadata: Metadata = {
  title: "Checkout | LowTec",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  const temDesconto = Number(PRODUCT.discount) > 0;

  const linhas = [
    { label: "Subtotal", value: formatarMoeda(PRODUCT.valor) },
    ...(temDesconto
      ? [{ label: "Desconto", value: `− ${formatarMoeda(PRODUCT.discount)}` }]
      : []),
  ];

  return (
    <div className="bg-fundo relative isolate flex-1 overflow-hidden">
      <div
        aria-hidden="true"
        className="bg-marca/10 absolute -top-40 left-1/2 -z-10 size-120 -translate-x-1/2 rounded-full blur-[120px]"
      />

      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 pt-8">
        <Link href="/" aria-label="Lowtec, página inicial" className="w-fit">
          <Image
            src={logoSubmark}
            alt=""
            width={448}
            height={337}
            priority
            className="h-12 w-auto"
          />
        </Link>

        <p className="text-text3 flex items-center gap-1.5 text-sm">
          <LockKeyhole className="text-marca size-4" aria-hidden="true" />
          Checkout seguro
        </p>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10 lg:py-14">
        <Link
          href="/#comprar"
          className="font-ui text-text2 hover:text-marca inline-flex items-center gap-1.5 text-sm font-bold transition-colors"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Voltar
        </Link>

        <h1 className="font-display text-text1 mt-4 text-[clamp(2rem,4vw,2.75rem)] leading-none font-black tracking-tight italic">
          Resumo do{" "}
          <span className="from-marca to-text1 bg-linear-to-r bg-clip-text pr-2 text-transparent">
            pedido
          </span>
        </h1>
        <p className="text-text2 mt-3">
          Confira os detalhes antes de ir para o pagamento.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <section
            aria-labelledby="checkout-produto"
            className="bg-cartao rounded-xl p-6 ring-1 ring-white/10 sm:p-8"
          >
            <div className="flex items-center gap-5">
              <div className="bg-fundo2 relative w-20 shrink-0 overflow-hidden rounded-r-md shadow-[10px_16px_40px_-16px_rgba(0,0,0,0.9)] ring-1 ring-white/10 sm:w-24">
                <Image
                  src={capaEbook}
                  alt="Capa do e-book Você em 100 versões"
                  width={1055}
                  height={1491}
                  sizes="6rem"
                  className="h-auto w-full"
                />
              </div>

              <div className="min-w-0">
                <h2
                  id="checkout-produto"
                  className="font-display text-text1 text-2xl leading-tight font-black tracking-tight italic sm:text-3xl"
                >
                  {PRODUCT.name}
                </h2>
                <p className="text-text3 mt-2 text-sm">
                  E-book digital · Quantidade: 1
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-dashed border-white/10 pt-6">
              <h3 className="font-ui text-text1 text-sm font-bold">
                O que está incluso
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {OFFER.includes.map((item) => (
                  <li
                    key={item}
                    className="text-text2 flex items-start gap-3 text-sm"
                  >
                    <span className="bg-marca/15 text-marca ring-marca/30 mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ring-1">
                      <Check
                        className="size-3"
                        strokeWidth={3}
                        aria-hidden="true"
                      />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section
            aria-labelledby="checkout-pagamento"
            className="bg-cartao ring-marca/30 rounded-xl p-6 ring-1 lg:sticky lg:top-8 lg:self-start"
          >
            <h2
              id="checkout-pagamento"
              className="font-display text-text1 text-2xl font-black tracking-tight italic"
            >
              Pagamento
            </h2>

            <dl className="mt-5 grid gap-3 text-sm">
              {linhas.map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <dt className="text-text3">{label}</dt>
                  <dd className="text-text1 font-semibold">{value}</dd>
                </div>
              ))}
              <div className="mt-2 flex items-end justify-between border-t border-dashed border-white/10 pt-4">
                <dt className="font-ui text-text1 font-bold">Total</dt>
                <dd className="font-display text-marca text-4xl leading-none font-black tracking-tight italic">
                  {formatarMoeda(PRODUCT.valor, PRODUCT.discount)}
                </dd>
              </div>
            </dl>

            <p className="text-text3 mt-2 text-right text-xs">
              Pagamento único
            </p>

            <div className="mt-6">
              <FinalizarCompra />
            </div>

            <ul className="text-text3 mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-dashed border-white/10 pt-5 text-xs">
              {TRUST.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-1.5">
                  <Icon className="text-marca size-3.5" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
