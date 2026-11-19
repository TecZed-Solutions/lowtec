import BotaoDownload from "@/components/BotaoDownload";
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

      {compras.length === 0 && (
        <p className="bg-cartao text-text3 mt-5 rounded-xl p-6 text-center text-sm ring-1 ring-white/10">
          Você ainda não tem produtos. Assim que o pagamento for confirmado, o
          e-book aparece aqui.
        </p>
      )}

      <ul className="mt-5 grid gap-4 empty:hidden">
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
                  100 prompts organizados por categoria para transformar você em
                  100 versões diferentes.
                </p>
                <p className="text-text3 mt-3 text-sm">
                  Comprado em {formatarData(createdAt)}
                </p>
              </div>

              <BotaoDownload
                produtoId={produto.id}
                className="justify-items-start"
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
