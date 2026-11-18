import { Admin } from "@prisma/client";
import { Request } from "express";

export interface UsuarioToken {
  id: string;
  email: string;
}

export interface AuthRequest extends Request {
  usuario?: UsuarioToken;
}

export interface AdminToken {
  id: string;
  username: string;
  validated: boolean;
}

export interface AdminAuthRequest extends Request {
  admin?: Admin;
}
