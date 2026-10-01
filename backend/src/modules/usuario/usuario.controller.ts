import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { usuarioService } from "./usuario.service.js";
import { enviarConfirmacaoEmail } from "../../utils/email.service.js";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export class UsuarioController {
  async registroLocal(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "E-mail e senha são obrigatórios." });
      }

      const usuarioExistente = await usuarioService.findByEmail(email);

      // Usuário já existe
      if (usuarioExistente) {
        // E-mail já confirmado
        if (usuarioExistente.emailVerified) {
          return res
            .status(409)
            .json({ message: "Falha na tentativa de cadastro!" });
        }
        // Usuário existe, mas ainda não confirmou o e-mail
        const tokenExpirado =
          !usuarioExistente.emailVerificationExpiresAt ||
          usuarioExistente.emailVerificationExpiresAt.getTime() <= Date.now();

        // Token ainda válido
        if (!tokenExpirado) {
          return res.status(409).json({
            message:
              "Se o cadastro puder ser realizado, enviaremos as instruções para o e-mail informado.",
          });
        }
        // Token expirado → gerar um novo
        const emailVerificationToken = crypto.randomBytes(32).toString("hex");
        const emailVerificationExpiresAt = new Date(
          Date.now() + 1000 * 60 * 60 * 24,
        );
        await usuarioService.update(usuarioExistente.id, {
          emailVerificationToken,
          emailVerificationExpiresAt,
        });

        await enviarConfirmacaoEmail(
          usuarioExistente.email,
          emailVerificationToken,
        );
        return res.status(200).json({
          message:
            "Seu cadastro ainda não foi confirmado. Enviamos um novo e-mail de confirmação.",
        });
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const emailVerificationToken = crypto.randomBytes(32).toString("hex");
      const emailVerificationExpiresAt = new Date(
        Date.now() + 1000 * 60 * 60 * 24,
      );
      const usuario = await usuarioService.createLocal({
        email,
        password: passwordHash,
        emailVerified: false,
        emailVerificationToken,
        emailVerificationExpiresAt,
      });
      await enviarConfirmacaoEmail(usuario.email, emailVerificationToken);
      return res.status(201).json({
        message:
          "Cadastro realizado. Verifique seu e-mail para confirmar sua conta.",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Erro ao realizar cadastro.",
      });
    }
  }

  async verificarEmailLocal(req: Request, res: Response) {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({
          message: "Token de confirmação não fornecido.",
        });
      }

      const usuario = await usuarioService.findByEmailVerificationToken(token);

      if (!usuario) {
        return res.status(400).json({
          message: "Token de confirmação inválido.",
        });
      }

      if (usuario.emailVerified) {
        return res.status(400).json({
          message: "Este e-mail já foi confirmado.",
        });
      }

      if (
        !usuario.emailVerificationExpiresAt ||
        usuario.emailVerificationExpiresAt <= new Date()
      ) {
        return res.status(400).json({
          message: "Token de confirmação expirado.",
        });
      }

      await usuarioService.update(usuario.id, {
        emailVerified: true,
        emailVerificationToken: null,
        emailVerificationExpiresAt: null,
      });

      return res.status(200).json({
        message: "E-mail confirmado com sucesso.",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Erro ao confirmar e-mail.",
      });
    }
  }

  async loginLocal(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: "E-mail e senha são obrigatórios.",
        });
      }

      const usuario = await usuarioService.findByEmail(email);

      if (!usuario) {
        return res.status(401).json({
          message: "E-mail ou senha inválidos.",
        });
      }

      if (usuario.provider !== "LOCAL") {
        return res.status(401).json({
          message: "Esta conta utiliza outro método de autenticação.",
        });
      }

      if (!usuario.emailVerified) {
        return res.status(403).json({
          message: "Confirme seu e-mail antes de entrar.",
        });
      }

      if (!usuario.password) {
        return res.status(401).json({
          message: "E-mail ou senha inválidos.",
        });
      }

      const passwordValid = await bcrypt.compare(password, usuario.password);

      if (!passwordValid) {
        return res.status(401).json({
          message: "E-mail ou senha inválidos.",
        });
      }

      const accessToken = jwt.sign(
        {
          id: usuario.id,
          email: usuario.email,
        },
        process.env.JWT_USUARIO!,
        {
          expiresIn: "7d",
        },
      );

      res.cookie("JWT_USUARIO", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        message: "Login realizado com sucesso.",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Erro ao realizar login.",
      });
    }
  }

  async loginGoogle(req: Request, res: Response) {
    try {
      const { credential } = req.body;

      if (!credential) {
        return res.status(400).json({
          message: "Credencial do Google não fornecida.",
        });
      }

      const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      if (!payload || !payload.email) {
        return res.status(401).json({
          message: "Credencial do Google inválida.",
        });
      }

      const email = payload.email;
      const imageUrl = payload.picture ?? null;

      const usuario = await usuarioService.findByEmail(email);

      if (!usuario) {
        const novoUsuario = await usuarioService.createGoogle({
          email,
          imageUrl,
          emailVerified: true,
          provider: "GOOGLE",
        });

        const accessToken = jwt.sign(
          {
            id: novoUsuario.id,
            email: novoUsuario.email,
          },
          process.env.JWT_USUARIO!,
          {
            expiresIn: "7d",
          },
        );

        res.cookie("JWT_USUARIO", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
          message: "Conta criada e login realizado com sucesso.",
        });
      }

      if (usuario.provider !== "GOOGLE") {
        return res.status(409).json({
          message:
            "Este e-mail já está cadastrado utilizando outro método de autenticação.",
        });
      }

      const accessToken = jwt.sign(
        {
          sub: usuario.id,
          email: usuario.email,
        },
        process.env.JWT_SECRET!,
        {
          expiresIn: "7d",
        },
      );
      res.cookie("JWT_USUARIO", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        message: "Login realizado com sucesso.",
      });
    } catch (error) {
      console.error(error);

      return res.status(401).json({
        message: "Não foi possível autenticar com o Google.",
      });
    }
  }
}

export const usuarioController = new UsuarioController();
