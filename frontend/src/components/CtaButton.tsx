import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export default function CtaButton({
  className,
  children,
  ...props
}: ComponentProps<"a">) {
  return (
    <a
      className={cn(
        "group bg-marca font-ui text-fundo hover:bg-marca/85 focus-visible:outline-marca inline-flex -skew-x-12 items-center px-8 py-4 text-base font-extrabold shadow-[0_10px_40px_-10px_rgba(73,229,16,0.6)] transition-colors",
        className,
      )}
      {...props}
    >
      <span className="inline-flex skew-x-12 items-center gap-2">
        {children}
      </span>
    </a>
  );
}
