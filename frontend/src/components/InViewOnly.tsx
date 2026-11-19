"use client";

import { useRef, type ReactNode } from "react";
import { useInView } from "motion/react";

import { cn } from "@/lib/utils";

interface InViewOnlyProps {
  children: ReactNode;
  className?: string;
}

export default function InViewOnly({ children, className }: InViewOnlyProps) {
  const ref = useRef<HTMLDivElement>(null);
  const visivel = useInView(ref, { margin: "200px 0px" });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      {visivel && children}
    </div>
  );
}
