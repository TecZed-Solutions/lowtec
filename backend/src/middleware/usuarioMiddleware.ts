import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest, UsuarioToken } from "../types/auth.js";

export function usuarioMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.cookies?.JWT_USUARIO;

    if (!token) {
      return res.status(401).json({
        message: "Usuário não autenticado.",
      });
    }

    const secret = process.env.JWT_USUARIO;

    if (!secret) {
      console.error("JWT_USUARIO não configurado.");

      return res.status(500).json({
        message: "Erro interno de configuração.",
      });
    }

    const decoded = jwt.verify(token, secret) as UsuarioToken;

    req.usuario = decoded; // id e email disponível agora no req.usuario

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token inválido ou expirado.",
    });
  }
}
