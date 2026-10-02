import { Response } from "express";
import { AuthRequest } from "../../types/auth.js";
import { compraService } from "./compra.service.js";

export class CompraController {
  async getComprasUsuario(req: AuthRequest, res: Response) {
    try {
      if (!req.usuario) {
        return res.status(401).json({
          message: "Usuário não autenticado.",
        });
      }

      const usuarioId = req.usuario.id;

      const compras = await compraService.getComprasUsuario(usuarioId);

      return res.status(200).json({
        compras,
      });
    } catch (error) {
      console.error("Erro ao buscar compras do usuário:", error);

      return res.status(500).json({
        message: "Erro interno ao buscar compras.",
      });
    }
  }
}

export const compraController = new CompraController();
