import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const ESTILOS = {
  erro: "bg-red-500/10 text-red-400 ring-red-500/25",
  sucesso: "bg-marca/10 text-marca ring-marca/25",
} as const;

interface FormAlertProps {
  tipo?: keyof typeof ESTILOS;
  children: ReactNode;
}

export default function FormAlert({ tipo = "erro", children }: FormAlertProps) {
  return (
    <p
      role={tipo === "erro" ? "alert" : "status"}
      className={cn("rounded-lg px-3.5 py-3 text-sm ring-1", ESTILOS[tipo])}
    >
      {children}
    </p>
  );
}
