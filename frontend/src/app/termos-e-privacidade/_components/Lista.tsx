import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export default function Lista({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <ul
      className={cn("marker:text-marca grid list-disc gap-2 pl-5", className)}
    >
      {children}
    </ul>
  );
}
