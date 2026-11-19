export { cn } from "cn";

export function primeiroNome(nome: string) {
  return nome.trim().split(" ")[0];
}

export function iniciais(nome: string) {
  const partes = nome.trim().split(" ");
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : "";
  return (partes[0][0] + ultima).toUpperCase();
}

const dataHora = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "America/Sao_Paulo",
});

export function formatarData(iso: string) {
  return dataHora.format(new Date(iso));
}

const moeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const regraSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const MENSAGEM_SENHA =
  "A senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula e número.";

export function senhaValida(senha: string) {
  return regraSenha.test(senha);
}

const numero = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function centavos(valor: string, desconto: string) {
  return Math.round(Number(valor) * 100) - Math.round(Number(desconto) * 100);
}

export function formatarMoeda(valor: string, desconto = "0") {
  return moeda.format(centavos(valor, desconto) / 100);
}

export function formatarValor(valor: string, desconto = "0") {
  return numero.format(centavos(valor, desconto) / 100);
}
