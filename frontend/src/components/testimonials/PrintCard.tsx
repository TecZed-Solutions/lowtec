import Image from "next/image";
import { ImagePlus } from "lucide-react";

import { cn } from "@/lib/utils";

interface TestimonialPrint {
  src: string | null;
  alt: string;
  width: number;
  height: number;
}

interface PrintCardProps {
  print: TestimonialPrint;
  label: string;
  className?: string;
}

export default function PrintCard({ print, label, className }: PrintCardProps) {
  return (
    <figure
      className={cn(
        "bg-cartao ring-marca/20 rounded-xl p-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] ring-1",
        className,
      )}
    >
      {print.src ? (
        <Image
          src={print.src}
          alt={print.alt}
          width={print.width}
          height={print.height}
          sizes="(min-width: 1024px) 14rem, 45vw"
          className="h-auto w-full rounded-lg"
        />
      ) : (
        <div className="border-marca/30 bg-marca/5 flex aspect-9/16 flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-4 text-center">
          <ImagePlus className="text-marca size-8" aria-hidden="true" />
          <span className="font-ui text-text2 text-sm font-semibold">
            {label}
          </span>
        </div>
      )}
    </figure>
  );
}
