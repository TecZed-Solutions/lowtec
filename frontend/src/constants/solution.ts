import { Briefcase, Clapperboard, Gem, Palette } from "lucide-react";
import {
  RiGeminiFill,
  RiGrokAiFill,
  RiImageAiFill,
  RiOpenaiFill,
} from "react-icons/ri";

export const CATEGORIES = [
  { icon: Briefcase, label: "Profissional e carreira" },
  { icon: Gem, label: "Lifestyle e luxo" },
  { icon: Clapperboard, label: "Cinematográfico e fictício" },
  { icon: Palette, label: "Artística e editorial" },
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
