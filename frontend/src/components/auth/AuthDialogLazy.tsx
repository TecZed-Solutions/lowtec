"use client";

import { lazy, Suspense, useState } from "react";
import { DoorOpen } from "lucide-react";

import Button from "@/components/Button";
import type { AuthDialogProps } from "@/components/auth/AuthDialog";

const carregarAuthDialog = () => import("@/components/auth/AuthDialog");
const AuthDialog = lazy(carregarAuthDialog);

export default function AuthDialogLazy({
  trigger = <Button icon={DoorOpen}>Fazer login</Button>,
  ...props
}: Omit<AuthDialogProps, "defaultOpen">) {
  const [ativo, setAtivo] = useState(false);

  if (ativo) {
    return (
      <Suspense fallback={trigger}>
        <AuthDialog {...props} trigger={trigger} defaultOpen />
      </Suspense>
    );
  }

  return (
    <span
      className="contents"
      onPointerEnter={carregarAuthDialog}
      onFocus={carregarAuthDialog}
      onClick={() => setAtivo(true)}
    >
      {trigger}
    </span>
  );
}
