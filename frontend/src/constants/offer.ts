import { CreditCard, LockKeyhole, Zap } from "lucide-react";

export const OFFER = {
  badge: "100 prompts",
  checkoutHref: "/checkout",
  includes: [
    "100 prompts prontos para copiar e colar",
    "5 categorias, do retrato para o LinkedIn a cenas impossíveis",
    "Funciona no ChatGPT, Gemini, Grok e outras IAs com foto",
    "Acesso imediato ao e-book após a compra",
  ],
} as const;

export const TRUST = [
  { icon: LockKeyhole, label: "Compra segura" },
  { icon: Zap, label: "Acesso imediato" },
  { icon: CreditCard, label: "Pix ou cartão" },
] as const;
