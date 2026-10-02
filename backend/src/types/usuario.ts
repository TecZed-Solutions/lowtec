import { Provider } from "@prisma/client";

export interface CriarUsuarioLocalDTO {
  email: string;
  password: string;
  emailVerified: boolean;
  emailVerificationToken: string;
  emailVerificationExpiresAt: Date;
}

export interface CriarUsuarioGoogleDTO {
  email: string;
  imageUrl: string | null;
  emailVerified: boolean;
  provider: Provider;
}

export interface AtualizarTokenUsuarioDTO {
  emailVerified: boolean;
  emailVerificationToken: string | null;
  emailVerificationExpiresAt: Date | null;
  resetPasswordToken: number | null;
  resetTokenExpiresAt: Date | null;
}

export interface AtualizarPerfilUsuarioDTO {
  phone?: string;
}

export interface AtualizarFotoUsuarioDTO {
  imageUrl: string | null;
  imageKey: string | null;
}
