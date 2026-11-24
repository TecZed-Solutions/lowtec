export interface Fbq {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push?: Fbq;
  loaded: boolean;
  version: string;
  disablePushState?: boolean;
}

export type EventoPixel =
  "PageView" | "ViewContent" | "InitiateCheckout" | "AddPaymentInfo";

export type ParametrosEvento = Record<string, string | number | string[]>;

export type Utm = Partial<
  Record<"source" | "medium" | "campaign" | "content" | "term", string>
>;

export interface Origem {
  fbclid?: string;
  utm: Utm;
  capturadoEm: number;
}
