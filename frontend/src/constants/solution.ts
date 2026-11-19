import { Aperture, Briefcase, Gem, Plane, WandSparkles } from "lucide-react";
import {
  RiGeminiFill,
  RiGrokAiFill,
  RiImageAiFill,
  RiOpenaiFill,
} from "react-icons/ri";

export const CATEGORIES = [
  { icon: Briefcase, label: "Profissional" },
  { icon: WandSparkles, label: "Criativo e irreal" },
  { icon: Plane, label: "Viagem e lugares" },
  { icon: Gem, label: "Lifestyle e luxo" },
  { icon: Aperture, label: "Iluminação, ângulos, enquadramentos e efeitos" },
] as const;

export const STEPS = [
  "Escolha a categoria",
  "Copie o prompt",
  "Envie sua foto e cole na IA",
] as const;

export const TOOLS = [
  { icon: RiOpenaiFill, label: "ChatGPT" },
  { icon: RiGeminiFill, label: "Gemini" },
  { icon: RiGrokAiFill, label: "Grok" },
  { icon: RiImageAiFill, label: "Outras IAs" },
] as const;
