import axios from "axios";
import { createHash } from "node:crypto";
import { RastreioPagamento, Utm } from "../../types/pagamento.js";
import { Pagamento } from "@prisma/client";
import { usuarioService } from "../../modules/usuario/usuario.service.js";
import { compraService } from "../../modules/compra/compra.service.js";

const VERSAO_API = "v26.0";
const FORMATO_COOKIE_META = /^fb\.[0-2]\.\d{10,13}\.[\w.-]+$/;
const CHAVES_UTM = ["source", "medium", "campaign", "content", "term"] as const;

interface UsuarioCompra {
  id: string;
  email: string;
  nome: string;
  phone: string | null;
}

interface CompraMeta {
  eventId: string;
  pagoEm: Date;
  valor: number;
  produtoIds: string[];
  usuario: UsuarioCompra;
  rastreio: RastreioPagamento;
}

function texto(valor: unknown, limite: number) {
  if (typeof valor !== "string") return undefined;
  const limpo = valor.trim();
  return limpo ? limpo.slice(0, limite) : undefined;
}

function cookieMeta(valor: unknown) {
  return typeof valor === "string" &&
    valor.length <= 500 &&
    FORMATO_COOKIE_META.test(valor)
    ? valor
    : undefined;
}

function objeto(valor: unknown): Record<string, unknown> {
  return valor && typeof valor === "object" && !Array.isArray(valor)
    ? (valor as Record<string, unknown>)
    : {};
}

function sha256(valor: string) {
  return createHash("sha256").update(valor).digest("hex");
}

// IP e navegador precisam ser os do comprador: por isso são capturados na
// criação do pagamento, e não no webhook (que vem dos servidores da InfinitePay).
export function montarRastreio(
  entrada: unknown,
  ip: string | undefined,
  userAgent: string | undefined,
): RastreioPagamento {
  const dados = objeto(entrada);
  const utmEntrada = objeto(dados.utm);
  const utm: Utm = {};

  for (const chave of CHAVES_UTM) {
    const valor = texto(utmEntrada[chave], 200);
    if (valor) utm[chave] = valor;
  }

  return {
    fbp: cookieMeta(dados.fbp),
    fbc: cookieMeta(dados.fbc),
    ip: texto(ip?.replace(/^::ffff:/, ""), 64),
    userAgent: texto(userAgent, 512),
    ...(Object.keys(utm).length > 0 && { utm }),
  };
}

export function lerRastreio(metadata: unknown): RastreioPagamento {
  const rastreio = objeto(objeto(metadata).rastreio);

  return {
    fbp: rastreio.fbp as string,
    fbc: rastreio.fbc as string,
    ip: rastreio.ip as string,
    userAgent: rastreio.userAgent as string,
  };
}

function partesNome(nome: string) {
  return nome
    .trim()
    .split(/\s+/)
    .map((parte) =>
      parte
        .normalize("NFC")
        .toLowerCase()
        .replace(/[^\p{L}]/gu, ""),
    )
    .filter(Boolean);
}

// A Meta espera só dígitos, com o código do país (55).
function telefone(phone: string | null) {
  const digitos = phone?.replace(/\D/g, "") ?? "";
  if (digitos.length === 10 || digitos.length === 11) return `55${digitos}`;
  if (
    (digitos.length === 12 || digitos.length === 13) &&
    digitos.startsWith("55")
  )
    return digitos;
  return undefined;
}

function urlSucesso() {
  try {
    return process.env.FRONTEND_URL
      ? new URL("/checkout/sucesso", process.env.FRONTEND_URL).href
      : undefined;
  } catch {
    return undefined;
  }
}

// Roda em segundo plano: uma falha na Meta não pode afetar a resposta do webhook.
export async function notificarCompraMeta(pagamento: Pagamento) {
  try {
    if (!pagamento.gatewayId) return;

    const [usuario, compras] = await Promise.all([
      usuarioService.findById(pagamento.usuarioId),
      compraService.getComprasByPagamentoId(pagamento.id),
    ]);

    if (!usuario) return;

    await enviarCompraMeta({
      eventId: pagamento.gatewayId,
      pagoEm: pagamento.paidAt ?? new Date(),
      valor: pagamento.value.minus(pagamento.discount).toNumber(),
      produtoIds: compras.map((compra) => compra.produtoId),
      usuario,
      rastreio: lerRastreio(pagamento.metadata),
    });
  } catch (error) {
    console.error("Erro ao preparar a compra para a Meta:", error);
  }
}

export async function enviarCompraMeta(pagamento: CompraMeta) {
  const pixelId = process.env.META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;

  if (!pixelId || !token) {
    console.warn(
      `Conversions API da Meta não configurada (META_PIXEL_ID/META_CAPI_TOKEN). Compra ${pagamento.eventId} não enviada.`,
    );
    return;
  }

  const { usuario, rastreio } = pagamento;
  const [firstName, ...sobrenomes] = partesNome(usuario.nome);
  const lastName = sobrenomes.at(-1);
  const phone = telefone(usuario.phone);

  const evento = {
    event_name: "Purchase",
    event_time: Math.floor(pagamento.pagoEm.getTime() / 1000),
    event_id: pagamento.eventId,
    action_source: "website",
    event_source_url: urlSucesso(),
    user_data: {
      em: [sha256(usuario.email.trim().toLowerCase())],
      external_id: [sha256(usuario.id)],
      ...(phone && { ph: [sha256(phone)] }),
      ...(firstName && { fn: [sha256(firstName)] }),
      ...(lastName && { ln: [sha256(lastName)] }),
      ...(rastreio.ip && { client_ip_address: rastreio.ip }),
      ...(rastreio.userAgent && { client_user_agent: rastreio.userAgent }),
      ...(rastreio.fbp && { fbp: rastreio.fbp }),
      ...(rastreio.fbc && { fbc: rastreio.fbc }),
    },
    custom_data: {
      currency: "BRL",
      value: pagamento.valor,
      content_ids: pagamento.produtoIds,
      content_type: "product",
      num_items: pagamento.produtoIds.length,
      order_id: pagamento.eventId,
    },
  };

  try {
    const response = await axios.post(
      `https://graph.facebook.com/${VERSAO_API}/${pixelId}/events`,
      {
        data: [evento],
        access_token: token,
        ...(process.env.META_TEST_EVENT_CODE && {
          test_event_code: process.env.META_TEST_EVENT_CODE,
        }),
      },
      { timeout: 10_000 },
    );

    console.log(
      `Compra ${pagamento.eventId} enviada à Meta:`,
      response.data?.events_received,
      "evento(s) recebido(s).",
    );
  } catch (error) {
    // Loga só a resposta da Meta: o erro do axios carrega o corpo com o token.
    console.error(
      `Erro ao enviar a compra ${pagamento.eventId} para a Conversions API da Meta:`,
      axios.isAxiosError(error)
        ? (error.response?.data ?? error.message)
        : error,
    );
  }
}
