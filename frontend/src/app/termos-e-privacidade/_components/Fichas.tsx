interface Ficha {
  titulo: string;
  campos: readonly { rotulo: string; valor: string }[];
}

export default function Fichas({ itens }: { itens: readonly Ficha[] }) {
  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {itens.map(({ titulo, campos }) => (
        <li
          key={titulo}
          className="bg-cartao rounded-xl p-5 ring-1 ring-white/10"
        >
          <h4 className="font-ui text-text1 text-sm font-bold break-words">
            {titulo}
          </h4>
          <dl className="mt-3 grid gap-3 text-sm">
            {campos.map(({ rotulo, valor }) => (
              <div key={rotulo}>
                <dt className="text-text3 text-xs">{rotulo}</dt>
                <dd className="text-text2 mt-0.5">{valor}</dd>
              </div>
            ))}
          </dl>
        </li>
      ))}
    </ul>
  );
}
