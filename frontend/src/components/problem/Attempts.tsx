import { RefreshCcw, X } from "lucide-react";

export default function Attempts() {
  return (
    <ul
      aria-hidden="true"
      className="absolute inset-x-6 top-4 flex flex-col gap-2 mask-[linear-gradient(to_bottom,transparent,#000_40%)] p-1"
    >
      {[10, 11].map((n) => (
        <li
          key={n}
          className="bg-fundo/60 flex items-center justify-between rounded-md px-3 py-2 ring-1 ring-white/10"
        >
          <span className="text-text3 font-mono text-xs line-through">
            Tentativa {n}
          </span>
          <X className="text-text3 size-3.5" />
        </li>
      ))}
      <li className="bg-marca/10 ring-marca/40 flex items-center justify-between rounded-md px-3 py-2 ring-1">
        <span className="text-text1 font-mono text-xs">
          Tentativa 12 · gerando…
        </span>

        <RefreshCcw className="text-marca motion-safe:animation-duration-[2s] size-3.5 motion-safe:animate-spin" />
      </li>
    </ul>
  );
}
