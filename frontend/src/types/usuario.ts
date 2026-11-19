export type Provider = "LOCAL" | "GOOGLE";

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  phone: string | null;
  imageUrl: string | null;
  provider: Provider;
}
