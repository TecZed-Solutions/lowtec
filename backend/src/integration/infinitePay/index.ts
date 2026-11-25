import axios from "axios";

interface Item {
  description: string;
  quantity: number;
  price: number; // em centavos
}

interface VerificacaoInfinitePay {
  paid: boolean;
  amount: number; // em centavos
  paidAmount: number;
  captureMethod: string;
}

export async function createInfinitePayLink(items: Item[], order_nsu: string) {
  try {
    const response = await axios.post(
      `${process.env.INFINITEPAY_API_URL}/links`,
      {
        handle: process.env.INFINITEPAY_HANDLE,
        items,
        order_nsu,
        redirect_url: process.env.INFINITEPAY_REDIRECT_URL,
        webhook_url: process.env.INFINITEPAY_WEBHOOK_URL,
      },
    );

    const data = response.data;

    return {
      checkoutUrl: data.url,
      raw: data,
    };
  } catch (error: any) {
    console.error("Erro InfinitePay:", error.response?.data || error.message);
    throw new Error("Erro ao criar link de pagamento InfinitePay");
  }
}

// O webhook da InfinitePay não é assinado: esta consulta é a única forma de
// confirmar que o pagamento existe e foi aprovado.
export async function checkInfinitePayPayment(
  orderNsu: string,
  transactionNsu: string,
  slug: string,
): Promise<VerificacaoInfinitePay> {
  try {
    const { data } = await axios.post(
      `${process.env.INFINITEPAY_API_URL}/payment_check`,
      {
        handle: process.env.INFINITEPAY_HANDLE,
        order_nsu: orderNsu,
        transaction_nsu: transactionNsu,
        slug,
      },
      { timeout: 8_000 },
    );

    return {
      paid: data?.success === true && data?.paid === true,
      amount: Number(data?.amount),
      paidAmount: Number(data?.paid_amount),
      captureMethod: String(data?.capture_method ?? ""),
    };
  } catch (error: any) {
    console.error(
      "Erro ao consultar pagamento na InfinitePay:",
      error.response?.data || error.message,
    );
    throw new Error("Erro ao confirmar pagamento na InfinitePay");
  }
}
