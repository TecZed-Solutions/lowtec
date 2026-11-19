import type { Metadata } from "next";

import AuthPageShell from "@/components/auth/AuthPageShell";

import PagamentoSucesso from "./_components/PagamentoSucesso";

export const metadata: Metadata = {
  title: "Pagamento realizado | LowTec",
  robots: { index: false, follow: false },
};

function numeroPedido(orderNsu: unknown) {
  if (typeof orderNsu !== "string") return null;
  const id = /^pedido-([0-9a-f-]{36})$/i.exec(orderNsu)?.[1];
  return id ? id.slice(0, 8).toUpperCase() : null;
}

function comprovanteSeguro(receiptUrl: unknown) {
  if (typeof receiptUrl !== "string") return null;

  try {
    const url = new URL(receiptUrl);
    const dominioInfinitePay =
      url.hostname === "infinitepay.io" ||
      url.hostname.endsWith(".infinitepay.io");
    return url.protocol === "https:" && dominioInfinitePay ? url.href : null;
  } catch {
    return null;
  }
}

export default async function PagamentoSucessoPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { order_nsu, receipt_url } = await searchParams;

  return (
    <AuthPageShell>
      <PagamentoSucesso
        pedido={numeroPedido(order_nsu)}
        comprovante={comprovanteSeguro(receipt_url)}
      />
    </AuthPageShell>
  );
}
