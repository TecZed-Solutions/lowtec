import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { adminService } from "./admin.service.js";
import { isValidPassword, isValidTwoFactor } from "../../utils/regex.js";
import { AdminAuthRequest } from "../../types/auth.js";
import { StatusPagamento } from "@prisma/client";

export class AdminController {
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          message: "Username e senha são obrigatórios.",
        });
      }

      const admin = await adminService.findByUsername(username);

      if (!admin) {
        return res.status(401).json({
          message: "Credenciais inválidas.",
        });
      }

      if (!admin.active) {
        return res.status(403).json({
          message: "Administrador desativado.",
        });
      }

      const passwordValid = await bcrypt.compare(password, admin.password);

      if (!passwordValid) {
        return res.status(401).json({
          message: "Credenciais inválidas.",
        });
      }

      const secret = process.env.JWT_ADMIN;

      if (!secret) {
        console.error("JWT_ADMIN não configurado.");

        return res.status(500).json({
          message: "Erro interno de configuração.",
        });
      }

      const token = jwt.sign(
        {
          id: admin.id,
          username: admin.username,
        },
        secret,
        {
          expiresIn: "1h",
        },
      );

      res.cookie("JWT_ADMIN", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 1000,
      });

      return res.status(200).json({
        message: "Login realizado com sucesso.",
        admin: {
          id: admin.id,
          username: admin.username,
          name: admin.name,
        },
      });
    } catch (error) {
      console.error("Erro ao realizar login do administrador:", error);

      return res.status(500).json({
        message: "Erro interno ao realizar login.",
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { username, name, password, twoFactor } = req.body;

      if (!username || !name || !password || !twoFactor) {
        return res.status(400).json({
          message:
            "Username, nome, senha e fator de autenticação são obrigatórios.",
        });
      }

      if (!isValidTwoFactor(twoFactor)) {
        return res.status(400).json({
          message: "O fator de autenticação deve possuir exatamente 6 dígitos.",
        });
      }

      if (!isValidPassword(password)) {
        return res.status(400).json({
          message:
            "A senha deve possuir no mínimo 8 caracteres, letras mínusculas e maiúsculas.",
        });
      }

      const adminExistente = await adminService.findByUsername(username);

      if (adminExistente) {
        return res.status(409).json({
          message: "Username já está em uso.",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const hashedTwoFactor = await bcrypt.hash(twoFactor, 10);

      const admin = await adminService.create({
        username,
        name,
        password: hashedPassword,
        twoFactor: hashedTwoFactor,
      });

      return res.status(201).json({
        message: "Administrador criado com sucesso.",
        admin: {
          id: admin.id,
          username: admin.username,
          name: admin.name,
          active: admin.active,
          createdAt: admin.createdAt,
        },
      });
    } catch (error) {
      console.error("Erro ao criar administrador:", error);

      return res.status(500).json({
        message: "Erro interno ao criar administrador.",
      });
    }
  }

  async getFaturamento(req: AdminAuthRequest, res: Response) {
    try {
      if (!req.admin) {
        return res.status(401).json({
          message: "Administrador não autenticado.",
        });
      }

      const { inicio, fim } = req.query;

      let inicioDate: Date | undefined;
      let fimDate: Date | undefined;

      if (inicio) {
        inicioDate = new Date(String(inicio));

        if (isNaN(inicioDate.getTime())) {
          return res.status(400).json({
            message: "Data inicial inválida.",
          });
        }
      }

      if (fim) {
        fimDate = new Date(String(fim));

        if (isNaN(fimDate.getTime())) {
          return res.status(400).json({
            message: "Data final inválida.",
          });
        }
      }

      if (inicioDate && fimDate && inicioDate > fimDate) {
        return res.status(400).json({
          message: "A data inicial não pode ser maior que a data final.",
        });
      }

      const faturamento = await adminService.getFaturamento({
        inicio: inicioDate,
        fim: fimDate,
      });

      return res.status(200).json({
        faturamento: Number(faturamento),
      });
    } catch (error) {
      console.error("Erro ao buscar faturamento:", error);

      return res.status(500).json({
        message: "Erro interno ao buscar faturamento.",
      });
    }
  }
  async getQuantidadeUsuarios(req: AdminAuthRequest, res: Response) {
    try {
      if (!req.admin) {
        return res.status(401).json({
          message: "Administrador não autenticado.",
        });
      }

      const { inicio, fim } = req.query;

      let inicioDate: Date | undefined;
      let fimDate: Date | undefined;

      if (inicio) {
        inicioDate = new Date(String(inicio));

        if (isNaN(inicioDate.getTime())) {
          return res.status(400).json({
            message: "Data inicial inválida.",
          });
        }
      }

      if (fim) {
        fimDate = new Date(String(fim));

        if (isNaN(fimDate.getTime())) {
          return res.status(400).json({
            message: "Data final inválida.",
          });
        }
      }

      if (inicioDate && fimDate && inicioDate > fimDate) {
        return res.status(400).json({
          message: "A data inicial não pode ser maior que a data final.",
        });
      }

      const quantidade = await adminService.getQuantidadeUsuarios({
        inicio: inicioDate,
        fim: fimDate,
      });

      return res.status(200).json({
        quantidade,
      });
    } catch (error) {
      console.error("Erro ao buscar quantidade de usuários:", error);

      return res.status(500).json({
        message: "Erro interno ao buscar quantidade de usuários.",
      });
    }
  }

  async getQuantidadeCompras(req: AdminAuthRequest, res: Response) {
    try {
      if (!req.admin) {
        return res.status(401).json({
          message: "Administrador não autenticado.",
        });
      }

      const { inicio, fim, status } = req.query;

      let inicioDate: Date | undefined;
      let fimDate: Date | undefined;
      let statusPagamento: StatusPagamento | undefined;

      if (inicio) {
        inicioDate = new Date(String(inicio));

        if (isNaN(inicioDate.getTime())) {
          return res.status(400).json({
            message: "Data inicial inválida.",
          });
        }
      }

      if (fim) {
        fimDate = new Date(String(fim));

        if (isNaN(fimDate.getTime())) {
          return res.status(400).json({
            message: "Data final inválida.",
          });
        }
      }

      if (inicioDate && fimDate && inicioDate > fimDate) {
        return res.status(400).json({
          message: "A data inicial não pode ser maior que a data final.",
        });
      }

      if (status) {
        const statusString = String(status);

        if (
          !Object.values(StatusPagamento).includes(
            statusString as StatusPagamento,
          )
        ) {
          return res.status(400).json({
            message: "Status de pagamento inválido.",
          });
        }

        statusPagamento = statusString as StatusPagamento;
      }

      const quantidade = await adminService.getQuantidadeCompras({
        inicio: inicioDate,
        fim: fimDate,
        status: statusPagamento,
      });

      return res.status(200).json({
        quantidade,
      });
    } catch (error) {
      console.error("Erro ao buscar quantidade de compras:", error);

      return res.status(500).json({
        message: "Erro interno ao buscar quantidade de compras.",
      });
    }
  }
}

export const adminController = new AdminController();
