import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UsuarioToken {
  id: string;
  email: string;
}

export interface AuthRequest extends Request {
  usuario?: UsuarioToken;
}

export function usuarioMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies?.JWT_USUARIO;

    if (!token) {
      return res.status(401).json({
        message: "Usuário não autenticado.",
      });
    }

    const secret = process.env.JWT_USUARIO_SECRET;

    if (!secret) {
      console.error("JWT_USUARIO_SECRET não configurado.");

      return res.status(500).json({
        message: "Erro interno de configuração.",
      });
    }

    const decoded = jwt.verify(token, secret) as UsuarioToken;

    req.usuario = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token inválido ou expirado.",
    });
  }
}