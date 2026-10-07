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

export function formatarMoeda(valor: string, desconto = "0") {
  const centavos =
    Math.round(Number(valor) * 100) - Math.round(Number(desconto) * 100);
  return moeda.format(centavos / 100);
}
