export type Provider = "LOCAL" | "GOOGLE";

export interface Usuario {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  imageUrl: string | null;
  provider: Provider;
}
