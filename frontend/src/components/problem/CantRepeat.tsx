import { ImageIcon } from "lucide-react";

export default function CantRepeat() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-6 top-6 flex items-center justify-center gap-4"
    >
      <div className="flex flex-col items-center gap-2">
        <div className="from-marca/40 to-marca1/30 ring-marca/50 flex size-24 items-center justify-center rounded-md bg-linear-to-br ring-1">
          <ImageIcon className="text-text1 size-7" />
        </div>
        <span className="text-marca font-mono text-xs">1ª vez ✓</span>
      </div>

      <span className="font-display text-marca text-3xl font-black italic">
        ≠
      </span>

      <div className="flex flex-col items-center gap-2">
        <div className="flex size-24 -rotate-3 items-center justify-center rounded-md bg-linear-to-br from-white/10 to-white/5 ring-1 ring-white/10">
          <ImageIcon className="text-text3 size-7" />
        </div>
        <span className="text-text3 font-mono text-xs">de novo ✕</span>
      </div>
    </div>
  );
}
