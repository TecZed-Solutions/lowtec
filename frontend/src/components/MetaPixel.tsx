"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { rastrearPagina, salvarOrigem } from "@/lib/meta-pixel";

export default function MetaPixel() {
  const caminho = usePathname();

  useEffect(() => {
    salvarOrigem();
  }, []);

  useEffect(() => {
    rastrearPagina(caminho);
  }, [caminho]);

  return null;
}
