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

export interface AtualizarUsuarioDTO {
  imageUrl: string;
  phone: string;
  emailVerified: boolean;
  emailVerificationToken: string | null;
  emailVerificationExpiresAt: Date | null;
  resetPasswordToken: number | null;
  resetTokenExpiresAt: Date | null;
}
