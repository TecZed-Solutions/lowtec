import { maskPhone } from "@/lib/masks";

export function useMask() {
  return { phone: maskPhone };
}
