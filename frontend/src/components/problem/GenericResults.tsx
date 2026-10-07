import { UserRound } from "lucide-react";

export default function GenericResults() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-6 top-6 flex flex-col gap-2"
    >
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className="from-marca/15 ring-marca/20 flex aspect-square items-center justify-center rounded-md bg-linear-to-b to-transparent ring-1"
          >
            <UserRound className="text-marca/60 size-6" />
          </div>
        ))}
      </div>
      <p className="text-text3 pl-1 font-mono text-xs">
        <span className="text-marca">=</span> 4 fotos, todas iguais
      </p>
    </div>
  );
}
