import { CreditCard, LockKeyhole, Zap } from "lucide-react";

export const OFFER = {
  badge: "+100 prompts",
  price: "XX,XX",
  fullPrice: "XX,XX",
  checkoutHref: "#comprar",
  includes: [
    "+100 prompts prontos para copiar e colar",
    "Categorias de carreira, lifestyle, cinematográfico, editorial e mais",
    "Funciona no ChatGPT, Gemini, Grok e outras IAs com foto",
    "Acesso imediato ao e-book após a compra",
  ],
} as const;

export const TRUST = [
  { icon: LockKeyhole, label: "Compra segura" },
  { icon: Zap, label: "Acesso imediato" },
  { icon: CreditCard, label: "Pix ou cartão" },
] as const;
