import { useContext, type Context } from "react";

export function useAuth<T>(authContext: Context<T | undefined>): T {
  const context = useContext(authContext);

  if (context === undefined) {
    throw new Error(
      "useAuth deve ser usado dentro de um AuthProvider correspondente",
    );
  }

  return context;
}
