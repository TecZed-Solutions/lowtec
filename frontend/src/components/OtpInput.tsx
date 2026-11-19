"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

interface OtpInputProps {
  id: string;
  name: string;
  label: string;
  length?: number;
  autoFocus?: boolean;
}

export default function OtpInput({
  id,
  name,
  label,
  length = 6,
  autoFocus,
}: OtpInputProps) {
  const [valor, setValor] = useState("");
  const [focado, setFocado] = useState(false);

  const metade = Math.ceil(length / 2);
  const indiceAtivo = Math.min(valor.length, length - 1);
  const indices = Array.from({ length }, (_, indice) => indice);

  const renderCaixa = (indice: number) => {
    const digito = valor[indice];
    const ativa = focado && indice === indiceAtivo;

    return (
      <div
        key={indice}
        aria-hidden="true"
        className={cn(
          "bg-fundo/60 text-text1 font-ui flex aspect-square max-w-12 min-w-0 flex-1 items-center justify-center rounded-lg border border-white/10 text-lg font-bold transition-colors",
          ativa && "border-marca",
        )}
      >
        {digito ??
          (ativa && (
            <span className="bg-marca h-5 w-px motion-safe:animate-pulse" />
          ))}
      </div>
    );
  };

  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="font-ui text-text2 text-xs font-bold">
        {label}
      </label>

      <div className="relative flex items-center justify-center gap-1.5 sm:gap-2">
        {indices.slice(0, metade).map(renderCaixa)}
        <span
          aria-hidden="true"
          className="bg-text3 h-0.5 w-3 shrink-0 rounded-full"
        />
        {indices.slice(metade).map(renderCaixa)}

        <input
          id={id}
          name={name}
          value={valor}
          onChange={(event) =>
            setValor(event.target.value.replace(/\D/g, "").slice(0, length))
          }
          onFocus={() => setFocado(true)}
          onBlur={() => setFocado(false)}
          onSelect={(event) => {
            const campo = event.currentTarget;
            campo.setSelectionRange(campo.value.length, campo.value.length);
          }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"

          pattern={`\\d{${length}}`}
          title={`Digite os ${length} dígitos do código.`}
          autoFocus={autoFocus}
          required
          className="absolute inset-0 cursor-text bg-transparent text-base text-transparent caret-transparent outline-none selection:bg-transparent"
        />
      </div>
    </div>
  );
}
