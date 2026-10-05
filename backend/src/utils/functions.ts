import { MetodoPagamento } from "@prisma/client";

export function mapInfinitePayMethod(captureMethod: string): MetodoPagamento {
  switch (captureMethod.toLowerCase()) {
    case "pix":
      return MetodoPagamento.PIX;

    case "credit_card":
    case "credit":
      return MetodoPagamento.CREDIT_CARD;

    case "debit_card":
    case "debit":
      return MetodoPagamento.DEBIT_CARD;

    default:
      throw new Error(
        `Método de pagamento não suportado pela InfinitePay: ${captureMethod}`,
      );
  }
}
