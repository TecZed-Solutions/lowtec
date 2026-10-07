import type { LucideIcon } from "lucide-react";
import { CreditCard, QrCode } from "lucide-react";

import type { MetodoPagamento, StatusPagamento } from "@/types/pagamento";

export const STATUS_PAGAMENTO: Record<
  StatusPagamento,
  { label: string; className: string }
> = {
  PAID: {
    label: "Aprovado",
    className: "bg-marca/10 text-marca ring-marca/25",
  },
  PENDING: {
    label: "Pendente",
    className: "bg-amber-400/10 text-amber-300 ring-amber-400/25",
  },
  FAILED: {
    label: "Recusado",
    className: "bg-red-500/10 text-red-400 ring-red-500/25",
  },
  CANCELLED: {
    label: "Cancelado",
    className: "bg-white/5 text-text3 ring-white/10",
  },
  REFUNDED: {
    label: "Reembolsado",
    className: "bg-white/5 text-text2 ring-white/10",
  },
};

export const METODO_PAGAMENTO: Record<
  MetodoPagamento,
  { label: string; icon: LucideIcon }
> = {
  PIX: { label: "Pix", icon: QrCode },
  CREDIT_CARD: { label: "Cartão de crédito", icon: CreditCard },
  DEBIT_CARD: { label: "Cartão de débito", icon: CreditCard },
};
