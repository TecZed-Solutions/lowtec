import { Quote } from "lucide-react";

import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  name: string;
  detail: string;
  text: string;
  className?: string;
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function TestimonialCard({
  name,
  detail,
  text,
  className,
}: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        "bg-cartao ring-marca/15 hover:ring-marca/40 flex h-full flex-col justify-between gap-6 rounded-lg p-6 ring-1 inset-shadow-[0_-20px_60px_-20px_rgba(73,229,16,0.12)] transition-shadow duration-300",
        className,
      )}
    >
      <div>
        <Quote className="text-marca size-6" aria-hidden="true" />
        <blockquote className="text-text1 mt-4 text-sm leading-relaxed sm:text-base">
          {text}
        </blockquote>
      </div>

      <figcaption className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="bg-marca/15 font-ui text-marca ring-marca/30 flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ring-1"
        >
          {initials(name)}
        </span>
        <div>
          <p className="font-ui text-text1 text-sm font-bold">{name}</p>
          <p className="text-text3 text-xs">{detail}</p>
        </div>
      </figcaption>
    </figure>
  );
}
