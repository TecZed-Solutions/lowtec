import {
  Copy,
  MessageCircleQuestionMark,
  RefreshCcw,
  Repeat,
  Shuffle,
} from "lucide-react";

import Attempts from "@/components/problem/Attempts";
import CantRepeat from "@/components/problem/CantRepeat";
import GenericResults from "@/components/problem/GenericResults";
import OneWord from "@/components/problem/OneWord";
import VaguePrompt from "@/components/problem/VaguePrompt";

export const PAINS = [
  {
    name: "Você não sabe o que pedir",
    description:
      "Imagina a foto pronta, mas não consegue descrever detalhes técnicos para a IA.",
    Icon: MessageCircleQuestionMark,
    cta: "Quero acertar de primeira",
    className: "lg:col-span-2",
    Visual: VaguePrompt,
  },
  {
    name: "O resultado sai genérico",
    description:
      "A imagem fica sem personalidade, com aquela cara de foto feita por IA.",
    Icon: Copy,
    cta: "Quero um resultado único",
    className: "lg:col-span-1",
    Visual: GenericResults,
  },
  {
    name: "Dezenas de tentativas",
    description:
      "Gera, ajusta, gera de novo… e o tempo vai embora sem chegar lá.",
    Icon: RefreshCcw,
    cta: "Chega de tentativa e erro",
    className: "lg:col-span-1",
    Visual: Attempts,
  },
  {
    name: "Um detalhe muda tudo",
    description:
      "Uma palavra diferente no prompt altera completamente o resultado.",
    Icon: Shuffle,
    cta: "Quero previsibilidade",
    className: "lg:col-span-1",
    Visual: OneWord,
  },
  {
    name: "Estilo impossível de repetir",
    description: "Não consegue reproduzir o mesmo visual.",
    Icon: Repeat,
    cta: "Quero repetir o estilo",
    className: "lg:col-span-1",
    Visual: CantRepeat,
  },
] as const;
