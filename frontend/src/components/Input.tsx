"use client";

import { useState, type ComponentProps, type ComponentType } from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";

interface InputProps extends ComponentProps<"input"> {
  id: string;
  label: string;
  icon?: ComponentType<{ className?: string }>;
  isPassword?: boolean;
  hint?: string;
}

export default function Input({
  id,
  label,
  icon: Icon,
  isPassword = false,
  hint,
  type,
  className,
  ...props
}: InputProps) {
  const [visible, setVisible] = useState(false);
  const hintId = `${id}-dica`;

  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="font-ui text-text2 text-xs font-bold">
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <span
            aria-hidden="true"
            className="text-text3 pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2"
          >
            <Icon className="size-4" />
          </span>
        )}

        <input
          id={id}
          type={isPassword ? (visible ? "text" : "password") : type}
          aria-describedby={hint ? hintId : undefined}
          className={cn(
            "bg-fundo/60 text-text1 placeholder:text-text3 focus:border-marca h-11 w-full min-w-0 rounded-lg border border-white/10 px-3.5 text-base transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",
            Icon && "pl-10",
            isPassword && "pr-11",
            className,
          )}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
            aria-pressed={visible}
            aria-controls={id}
            className="text-text3 hover:text-text1 absolute top-1/2 right-1.5 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md transition-colors"
          >
            {visible ? (
              <EyeOff className="size-4" aria-hidden="true" />
            ) : (
              <Eye className="size-4" aria-hidden="true" />
            )}
          </button>
        )}
      </div>

      {hint && (
        <p id={hintId} className="text-text3 text-xs">
          {hint}
        </p>
      )}
    </div>
  );
}
