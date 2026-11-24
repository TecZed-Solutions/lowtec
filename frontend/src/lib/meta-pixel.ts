import { PRODUCT } from "@/config/product";
import { precoFinal } from "@/lib/utils";
import {
  EventoPixel,
  Fbq,
  Origem,
  ParametrosEvento,
  Utm,
} from "@/types/meta-pixel";
import type { RastreioPagamento } from "@/types/pagamento";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const CHAVE_ORIGEM = "lowtec:origem";
const VALIDADE_ORIGEM_MS = 90 * 24 * 60 * 60 * 1000;
const CHAVES_UTM = ["source", "medium", "campaign", "content", "term"] as const;

export const PARAMETROS_META = {
  content_ids: [PRODUCT.id],
  content_name: PRODUCT.name,
  content_type: "product",
  currency: "BRL",
  value: precoFinal(PRODUCT.valor, PRODUCT.discount),
  num_items: 1,
} satisfies ParametrosEvento;

let ultimaPagina: string | null = null;

function carregarPixel(pixelId: string) {
  const fbq: Fbq = Object.assign(
    (...args: unknown[]) => {
      if (fbq.callMethod) fbq.callMethod.call(fbq, ...args);
      else fbq.queue.push(args);
    },
    {
      queue: [] as unknown[],
      loaded: true,
      version: "2.0",
      disablePushState: true,
    },
  );
  fbq.push = fbq;

  window.fbq = fbq;
  window._fbq ??= fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("set", "autoConfig", false, pixelId);
  fbq("init", pixelId);

  return fbq;
}

function pixel() {
  if (!PIXEL_ID || typeof window === "undefined") return null;
  return window.fbq ?? carregarPixel(PIXEL_ID);
}

export function rastrear(
  evento: EventoPixel,
  parametros: ParametrosEvento = {},
) {
  pixel()?.("track", evento, parametros);
}

export function rastrearPagina(caminho: string) {
  if (caminho === ultimaPagina) return;
  ultimaPagina = caminho;
  rastrear("PageView");
}

export function salvarOrigem() {
  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get("fbclid") || undefined;
  const utm: Utm = {};

  for (const chave of CHAVES_UTM) {
    const valor = params.get(`utm_${chave}`)?.trim();
    if (valor) utm[chave] = valor.slice(0, 200);
  }

  if (!fbclid && Object.keys(utm).length === 0) return;

  const origem: Origem = { fbclid, utm, capturadoEm: Date.now() };
  try {
    localStorage.setItem(CHAVE_ORIGEM, JSON.stringify(origem));
  } catch {}
}

function lerOrigem(): Origem | null {
  try {
    const origem = JSON.parse(localStorage.getItem(CHAVE_ORIGEM) ?? "null");
    if (typeof origem?.capturadoEm !== "number") return null;
    return Date.now() - origem.capturadoEm > VALIDADE_ORIGEM_MS ? null : origem;
  } catch {
    return null;
  }
}

function lerCookie(nome: string) {
  const valor = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${nome}=`))
    ?.slice(nome.length + 1);

  return valor ? decodeURIComponent(valor) : undefined;
}

export function dadosRastreio(): RastreioPagamento {
  const origem = lerOrigem();
  const fbc =
    lerCookie("_fbc") ??
    (origem?.fbclid
      ? `fb.1.${origem.capturadoEm}.${origem.fbclid}`
      : undefined);

  return {
    fbp: lerCookie("_fbp"),
    fbc,
    ...(origem && Object.keys(origem.utm).length > 0 && { utm: origem.utm }),
  };
}
