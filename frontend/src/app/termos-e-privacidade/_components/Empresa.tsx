import { Fragment } from "react";

import { EMPRESA } from "@/config/legal";

export function EmailAtendimento() {
  return (
    <a href={`mailto:${EMPRESA.email}`} className="break-all">
      {EMPRESA.email}
    </a>
  );
}

export default function DadosEmpresa() {
  const linhas = [
    { rotulo: "Razão social", valor: EMPRESA.razaoSocial },
    { rotulo: "CNPJ", valor: EMPRESA.cnpj },
    { rotulo: "Endereço", valor: EMPRESA.endereco },
    { rotulo: "E-mail", valor: <EmailAtendimento /> },
  ];

  return (
    <dl className="bg-cartao grid gap-x-6 gap-y-1 rounded-xl p-5 text-sm ring-1 ring-white/10 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-y-3">
      {linhas.map(({ rotulo, valor }) => (
        <Fragment key={rotulo}>
          <dt className="text-text3 max-sm:mt-2 max-sm:first:mt-0">{rotulo}</dt>
          <dd className="text-text1">{valor}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
