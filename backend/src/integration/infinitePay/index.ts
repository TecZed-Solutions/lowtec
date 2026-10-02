import axios from "axios";

interface Item {
  description: string;
  quantity: number;
  price: number; // em centavos
}

export async function createInfinitePayLink(
    items: Item[],
    order_nsu: string
  ) {
    try {
      const response = await axios.post(
        `${process.env.INFINITEPAY_API_URL}/links`,
        {
          handle: process.env.INFINITEPAY_HANDLE,
          items,
          order_nsu,
          redirect_url: process.env.INFINITEPAY_REDIRECT_URL,
          webhook_url: process.env.INFINITEPAY_WEBHOOK_URL,
        }
      );
  
      const data = response.data;
  
      return {
        checkoutUrl: data.url,
        raw: data
      };
  
    } catch (error: any) {
      console.error("Erro InfinitePay:", error.response?.data || error.message);
      throw new Error("Erro ao criar link de pagamento InfinitePay");
    }
  }