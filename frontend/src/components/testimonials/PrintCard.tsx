import Image, { type StaticImageData } from "next/image";

import { cn } from "@/lib/utils";

interface ResultImage {
  src: StaticImageData;
  alt: string;
  badge: string;
  highlight: boolean;
}

interface PrintCardProps {
  image: ResultImage;
  className?: string;
}

export default function PrintCard({ image, className }: PrintCardProps) {
  return (
    <figure
      className={cn(
        "bg-cartao ring-marca/20 relative rounded-xl p-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] ring-1",
        className,
      )}
    >
      <div className="relative aspect-9/16 overflow-hidden rounded-lg">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 14rem, 45vw"
          className="object-cover"
        />
      </div>

      <figcaption
        className={cn(
          "font-ui absolute top-4 left-4 -skew-x-12 px-3 py-1.5 text-sm font-black",
          image.highlight
            ? "bg-marca text-fundo"
            : "bg-fundo/80 text-text1 ring-1 ring-white/15 backdrop-blur-sm",
        )}
      >
        <span className="inline-block skew-x-12">{image.badge}</span>
      </figcaption>
    </figure>
  );
}
