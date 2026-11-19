"use client";

import { useState } from "react";
import { Download } from "lucide-react";

import Button from "@/components/Button";
import FormAlert from "@/components/FormAlert";
import { cn } from "@/lib/utils";
import { produtoService } from "@/services/produto.service";

interface BotaoDownloadProps {
  produtoId: string;
  className?: string;
}

export default function BotaoDownload({
  produtoId,
  className,
}: BotaoDownloadProps) {
  const [baixando, setBaixando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleDownload = async () => {
    setErro(null);
    setBaixando(true);

    const resultado = await produtoService.download(produtoId);

    setBaixando(false);

    if (typeof resultado !== "string") {
      setErro(resultado.message);
      return;
    }

    window.location.assign(resultado);
  };

  return (
    <div className={cn("grid gap-3", className)}>
      <Button icon={Download} isLoading={baixando} onClick={handleDownload}>
        Baixar e-book
      </Button>
      {erro && <FormAlert>{erro}</FormAlert>}
    </div>
  );
}
