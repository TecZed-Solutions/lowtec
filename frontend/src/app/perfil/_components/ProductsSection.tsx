import { Download } from "lucide-react";

import CtaButton from "@/components/CtaButton";
import EbookCover from "@/components/EbookCover";
import { formatarData } from "@/lib/utils";
import type { CompraComProduto } from "@/types/compra";

export default function ProductsSection({
  compras,
}: {
  compras: CompraComProduto[];
}) {
  return (
    <section aria-labelledby="produtos-title">
      <h2
        id="produtos-title"
        className="font-display text-text1 text-2xl font-black tracking-tight italic"
      >
        Meus produtos
      </h2>

      <ul className="mt-5 grid gap-4">
        {compras.map(({ id, createdAt, produto }) => (
          <li
            key={id}
            className="bg-cartao grid overflow-hidden rounded-xl ring-1 ring-white/10 sm:grid-cols-[18rem_minmax(0,1fr)]"
          >
            <div className="bg-fundo2 relative isolate flex items-center justify-center overflow-hidden px-6 pt-12 pb-16">
              <div
                aria-hidden="true"
                className="bg-marca/25 absolute top-1/2 left-1/2 -z-10 size-56 -translate-1/2 rounded-full blur-[80px]"
              />
              <EbookCover />
            </div>

            <div className="flex flex-col justify-center gap-6 p-6 sm:p-8">
              <div>
                <h3 className="font-display text-text1 text-3xl leading-none font-black tracking-tight italic">
                  {produto.name}
                </h3>
                {/* O model Produto não tem descrição; fixa, como a capa */}
                <p className="text-text2 mt-3 leading-relaxed">
                  +100 prompts organizados por categoria para transformar a sua
                  foto em um retrato profissional.
                </p>
                <p className="text-text3 mt-3 text-sm">
                  Comprado em {formatarData(createdAt)}
                </p>
              </div>

              <CtaButton
                href={produto.downloadUrl}
                download
                className="self-start"
              >
                <Download className="size-4.5" aria-hidden="true" />
                Baixar e-book
              </CtaButton>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
