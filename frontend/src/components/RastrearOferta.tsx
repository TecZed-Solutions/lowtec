"use client";

import { useInView } from "motion/react";
import { useEffect, useRef } from "react";

import { PARAMETROS_META, rastrear } from "@/lib/meta-pixel";

export default function RastrearOferta() {
  const ref = useRef<HTMLSpanElement>(null);
  const visivel = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (visivel) rastrear("ViewContent", PARAMETROS_META);
  }, [visivel]);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    />
  );
}
