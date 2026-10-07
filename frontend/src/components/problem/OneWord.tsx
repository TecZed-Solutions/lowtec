export default function OneWord() {
  return (
    <div
      aria-hidden="true"
      className="text-text3 absolute inset-x-6 top-6 flex flex-col gap-2 font-mono text-xs"
    >
      {[
        { sign: "−", word: "suave" },
        { sign: "+", word: "dura" },
      ].map(({ sign, word }) => (
        <p
          key={word}
          className="bg-fundo/60 ring-marca/15 rounded-md px-3 py-2.5 ring-1"
        >
          <span className="text-marca mr-2">{sign}</span>
          retrato, luz{" "}
          <mark className="bg-marca/20 text-marca rounded-sm px-1">{word}</mark>
          , fundo neutro
        </p>
      ))}
      <p className="pl-1">
        1 palavra <span className="text-marca">→</span> outra foto
      </p>
    </div>
  );
}
