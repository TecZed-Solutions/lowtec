import type { ComponentProps, ComponentType } from "react";
import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

const VARIANTS = {
  primary:
    "bg-marca font-ui text-fundo hover:bg-marca/85 -skew-x-12 px-8 py-4 text-base font-extrabold shadow-[0_10px_40px_-10px_rgba(73,229,16,0.6)]",
  secondary:
    "text-text1 h-11 rounded-lg bg-white/5 px-5 text-sm font-bold border border-white/10 hover:bg-white/10",
} as const;

interface ButtonProps extends ComponentProps<"button"> {
  variant?: keyof typeof VARIANTS;
  icon?: ComponentType<{ className?: string }>;
  isLoading?: boolean;
}

export default function Button({
  variant = "primary",
  icon: Icon,
  isLoading = false,
  type = "button",
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={cn(
        "group inline-flex cursor-pointer items-center justify-center transition-colors disabled:cursor-not-allowed disabled:opacity-60",
        VARIANTS[variant],
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "inline-flex items-center gap-2",
          variant === "primary" && "skew-x-12",
        )}
      >
        {isLoading ? (
          <LoaderCircle className="size-4.5 animate-spin" aria-hidden="true" />
        ) : (
          Icon && (
            <span aria-hidden="true" className="inline-flex">
              <Icon className="size-4.5" />
            </span>
          )
        )}
        {children}
      </span>
    </button>
  );
}
