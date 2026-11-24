import { Fbq } from "./meta-pixel";

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

// O export {} garante que o arquivo seja tratado como um módulo.
export {};
