import { LockKeyhole } from "lucide-react";

import { METODO_PAGAMENTO, STATUS_PAGAMENTO } from "@/constants/pagamento";
import { cn, formatarData, formatarMoeda } from "@/lib/utils";
import type { PagamentoComCompras } from "@/types/pagamento";

function PaymentCard({ pagamento }: { pagamento: PagamentoComCompras }) {
  const status = STATUS_PAGAMENTO[pagamento.status];
  const metodo = pagamento.metodo ? METODO_PAGAMENTO[pagamento.metodo] : null;
  const temDesconto = Number(pagamento.discount) > 0;

  const detalhes = [
    {
      label: "Produto",
      value: pagamento.compras.map(({ produto }) => produto.name).join(", "),
    },
    {
      label: "Método",
      value: metodo ? (
        <span className="inline-flex items-center gap-1.5">
          <metodo.icon className="text-marca size-4" aria-hidden="true" />
          {metodo.label}
        </span>
      ) : (
        "—"
      ),
    },
    {
      label: "Pago em",
      value: pagamento.paidAt ? formatarData(pagamento.paidAt) : "—",
    },
  ];

  return (
    <li className="bg-cartao rounded-xl p-5 ring-1 ring-white/10 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-ui text-text1 font-bold">
            Pedido #{pagamento.id.slice(0, 8).toUpperCase()}
          </p>
          <p className="text-text3 mt-0.5 text-sm">
            {formatarData(pagamento.createdAt)}
          </p>
        </div>

        <span
          className={cn(
            "font-ui rounded-full px-3 py-1 text-xs font-bold ring-1",
            status.className,
          )}
        >
          {status.label}
        </span>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-dashed border-white/10 pt-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_minmax(0,1.25fr)_auto]">
        {detalhes.map(({ label, value }) => (
          <div key={label} className="min-w-0">
            <dt className="text-text3 text-xs">{label}</dt>
            <dd className="text-text1 mt-1 text-sm font-semibold">{value}</dd>
          </div>
        ))}

        <div>
          <dt className="text-text3 text-xs">Valor</dt>
          {temDesconto && (
            <dd className="text-text3 mt-1 text-xs">
              <span className="sr-only">Valor original: </span>
              <s>{formatarMoeda(pagamento.value)}</s>
            </dd>
          )}
          <dd className="font-display text-text1 mt-0.5 text-xl leading-tight font-black tracking-tight italic">
            {temDesconto && <span className="sr-only">Com desconto: </span>}
            {formatarMoeda(pagamento.value, pagamento.discount)}
          </dd>
        </div>
      </dl>
    </li>
  );
}

export default function PaymentsSection({
  pagamentos,
}: {
  pagamentos: PagamentoComCompras[];
}) {
  return (
    <section aria-labelledby="pagamentos-title">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <h2
          id="pagamentos-title"
          className="font-display text-text1 text-2xl font-black tracking-tight italic"
        >
          Pagamentos
        </h2>

        <p className="text-text3 flex items-center gap-1.5 text-sm">
          <LockKeyhole className="text-marca size-3.5" aria-hidden="true" />
          Processados com segurança pela InfinitePay
        </p>
      </div>

      {pagamentos.length > 0 ? (
        <ul className="mt-5 grid gap-4">
          {pagamentos.map((pagamento) => (
            <PaymentCard key={pagamento.id} pagamento={pagamento} />
          ))}
        </ul>
      ) : (
        <p className="bg-cartao text-text3 mt-5 rounded-xl p-6 text-center text-sm ring-1 ring-white/10">
          Nenhum pagamento por aqui ainda.
        </p>
      )}
    </section>
  );
}
