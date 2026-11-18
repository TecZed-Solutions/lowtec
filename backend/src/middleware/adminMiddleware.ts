import { Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AdminAuthRequest, AdminToken } from "../types/auth.js";
import prisma from "../config/prisma.js";

export async function adminMiddleware(
  req: AdminAuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.cookies?.JWT_ADMIN;

    if (!token) {
      return res.status(401).json({
        message: "Administrador não autenticado.",
      });
    }

    const secret = process.env.JWT_ADMIN;

    if (!secret) {
      console.error("JWT_ADMIN não configurado.");

      return res.status(500).json({
        message: "Erro interno de configuração.",
      });
    }

    const decoded = jwt.verify(token, secret) as AdminToken;

    const admin = await prisma.admin.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!admin) {
      return res.status(401).json({
        message: "Administrador não encontrado.",
      });
    }

    if (!admin.active) {
      return res.status(401).json({
        message: "Administrador desativado.",
      });
    }

    if (!decoded.validated) {
      await prisma.admin.update({
        where: { id: admin.id },
        data: { active: false },
      });

      return res.status(401).json({
        message: "Se conseguir passar daqui agora, é GODLIKE paizão!",
      });
    }

    req.admin = admin;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token inválido ou expirado.",
    });
  }
}
