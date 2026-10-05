import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { usuarioService } from "./usuario.service.js";
import resendEmailService from "../../utils/email.service.js";
import { AuthRequest } from "../../types/auth.js";
import sharp from "sharp";
import { r2Service } from "../../utils/cloudflareR2.service.js";
import { R2_PUBLIC_URL } from "../../config/r2.js";
import { isValidEmail, isValidPassword } from "../../utils/regex.js";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export class UsuarioController {
  async registroLocal(req: Request, res: Response) {
    try {
      const { email, password, confirmPassword } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "E-mail e senha são obrigatórios." });
      }

      if (!isValidEmail(email)) {
        return res.status(400).json({
          message: "E-mail inválido.",
        });
      }

      if (!password || !confirmPassword) {
        return res.status(400).json({
          message: "Senha e confirmação de senha são obrigatórias.",
        });
      }

      if (!isValidPassword(password)) {
        return res.status(400).json({
          message:
            "A senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula e número.",
        });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({
          message: "As senhas não coincidem.",
        });
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
        await usuarioService.updateToken(usuarioExistente.id, {
          emailVerificationToken,
          emailVerificationExpiresAt,
        });

        await resendEmailService.enviarConfirmacaoEmail(
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
      await resendEmailService.enviarConfirmacaoEmail(
        usuario.email,
        emailVerificationToken,
      );
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

      await usuarioService.updateToken(usuario.id, {
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

  async sendTokenPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          message: "E-mail é obrigatório.",
        });
      }

      if (!isValidEmail(email)) {
        return res.status(400).json({
          message: "E-mail inválido.",
        });
      }

      const usuario = await usuarioService.findByEmail(email);

      if (!usuario) {
        return res.status(404).json({
          message: "Usuário não encontrado.",
        });
      }

      if (usuario.provider !== "LOCAL") {
        return res.status(400).json({
          message: "Este usuário não pode redefinir a senha.",
        });
      }

      // Verifica se já existe um código válido
      if (
        usuario.resetPasswordToken !== null &&
        usuario.resetTokenExpiresAt !== null &&
        usuario.resetTokenExpiresAt > new Date()
      ) {
        return res.status(400).json({
          message:
            "Já existe um código de recuperação válido. Verifique seu e-mail.",
        });
      }

      // Gera um novo código de 6 dígitos
      const resetToken = crypto.randomInt(100000, 1000000);

      // Expira em 30 minutos
      const resetTokenExpiresAt = new Date(Date.now() + 30 * 60 * 1000);

      await usuarioService.updateToken(usuario.id, {
        resetPasswordToken: resetToken,
        resetTokenExpiresAt,
      });

      await resendEmailService.enviarTokenPassword(usuario.email, resetToken);

      return res.status(200).json({
        message: "Código de recuperação enviado para o e-mail.",
      });
    } catch (error) {
      console.error("Erro ao enviar código de recuperação:", error);

      return res.status(500).json({
        message: "Erro interno ao solicitar recuperação de senha.",
      });
    }
  }

  async verificarTokenPassword(req: Request, res: Response) {
    try {
      const { email, resetToken } = req.body;

      if (!email || resetToken === undefined) {
        return res.status(400).json({
          message: "E-mail e código são obrigatórios.",
        });
      }

      const usuario = await usuarioService.findByEmail(email);

      if (!usuario) {
        return res.status(400).json({
          message: "Código inválido ou expirado.",
        });
      }

      if (!usuario.resetPasswordToken) {
        return res.status(400).json({
          message: "Código inválido ou expirado.",
        });
      }

      if (!usuario.resetTokenExpiresAt) {
        return res.status(400).json({
          message: "Código inválido ou expirado.",
        });
      }

      if (usuario.resetPasswordToken !== Number(resetToken)) {
        return res.status(400).json({
          message: "Código inválido ou expirado.",
        });
      }

      if (new Date() > usuario.resetTokenExpiresAt) {
        return res.status(400).json({
          message: "Código inválido ou expirado.",
        });
      }

      return res.status(200).json({
        message: "Código verificado com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao verificar código de recuperação:", error);

      return res.status(500).json({
        message: "Erro interno ao verificar código.",
      });
    }
  }

  async redefinirSenhaToken(req: Request, res: Response) {
    try {
      const { email, password, confirmPassword, resetToken } = req.body;

      if (!email || !password || !confirmPassword || !resetToken) {
        return res.status(400).json({
          message: "E-mail, senha e confirmação de senha são obrigatórios.",
        });
      }
      if (!isValidPassword(password)) {
        return res.status(400).json({
          message:
            "A senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula e número.",
        });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({
          message: "As senhas não coincidem.",
        });
      }

      const usuario = await usuarioService.findByEmail(email);

      if (!usuario) {
        return res.status(404).json({
          message: "Usuário não encontrado.",
        });
      }

      if (usuario.provider !== "LOCAL") {
        return res.status(400).json({
          message: "Este usuário não pode redefinir a senha.",
        });
      }

      if (
        usuario.resetPasswordToken === null ||
        usuario.resetTokenExpiresAt === null ||
        usuario.resetPasswordToken !== Number(resetToken)
      ) {
        return res.status(400).json({
          message: "Código de recuperação inválido ou expirado.",
        });
      }

      if (usuario.resetTokenExpiresAt <= new Date()) {
        return res.status(400).json({
          message: "Código de recuperação expirado.",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      await usuarioService.updateSenha(email, hashedPassword);

      await usuarioService.updateToken(usuario.id, {
        resetPasswordToken: null,
        resetTokenExpiresAt: null,
      });

      return res.status(200).json({
        message: "Senha redefinida com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);

      return res.status(500).json({
        message: "Erro interno ao redefinir senha.",
      });
    }
  }

  async redefinirSenha(req: AuthRequest, res: Response) {
    try {
      if (!req.usuario) {
        return res.status(401).json({
          message: "Usuário não autenticado.",
        });
      }
      const usuarioId = req.usuario.id;
      const { password, confirmPassword } = req.body;

      if (!password || !confirmPassword) {
        return res.status(400).json({
          message: "Senha e confirmação de senha são obrigatórios.",
        });
      }
      if (!isValidPassword(password)) {
        return res.status(400).json({
          message:
            "A senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula e número.",
        });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({
          message: "As senhas não coincidem.",
        });
      }

      const usuario = await usuarioService.findById(usuarioId);

      if (!usuario) {
        return res.status(404).json({
          message: "Usuário não encontrado.",
        });
      }

      if (usuario.provider !== "LOCAL") {
        return res.status(400).json({
          message: "Este usuário não pode redefinir a senha.",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await usuarioService.updateSenha(usuario.email, hashedPassword);

      return res.status(200).json({
        message: "Senha redefinida com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);

      return res.status(500).json({
        message: "Erro interno ao redefinir senha.",
      });
    }
  }

  async updatePerfil(req: AuthRequest, res: Response) {
    try {
      if (!req.usuario) {
        return res.status(401).json({
          message: "Usuário não autenticado.",
        });
      }

      const usuarioId = req.usuario.id;
      const { phone } = req.body;

      if (phone === undefined) {
        return res.status(400).json({
          message: "Nenhum dado foi informado para atualização.",
        });
      }
      const usuario = await usuarioService.updatePerfil(usuarioId, {
        phone,
      });
      return res
        .status(200)
        .json({ message: "Usuário atualizado com sucesso.", usuario });
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return res.status(500).json({ message: "Erro ao atualizar usuário." });
    }
  }

  async updateFoto(req: AuthRequest, res: Response) {
    try {
      if (!req.usuario) {
        return res.status(401).json({
          message: "Usuário não autenticado.",
        });
      }
      const usuarioId = req.usuario.id;

      const usuario = await usuarioService.findById(usuarioId);

      if (!usuario) {
        return res.status(404).json({
          message: "Usuário não encontrado.",
        });
      }

      if (usuario.provider !== "LOCAL") {
        return res.status(403).json({
          message: "Atualização de imagem não permitida.",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          message: "Nenhuma imagem foi enviada.",
        });
      }

      // Trata e normaliza a imagem
      const processedImage = await sharp(req.file.buffer)
        .rotate()
        .resize(512, 512, {
          fit: "cover",
        })
        .webp({
          quality: 85,
        })
        .toBuffer();

      // Gera uma nova Key para o arquivo
      const imageKey = `usuarios/${usuarioId}/avatar/${crypto.randomUUID()}.webp`;

      // Envia a imagem processada para o R2
      await r2Service.upload({
        key: imageKey,
        buffer: processedImage,
        contentType: "image/webp",
      });

      // URL pública da imagem
      const imageUrl = `${R2_PUBLIC_URL}/${imageKey}`;

      // Persiste somente os dados no banco
      const updatedUsuario = await usuarioService.updateFotoPerfil(usuarioId, {
        imageUrl,
        imageKey,
      });

      // Se existia uma imagem anterior, remove do R2
      if (usuario.imageKey) {
        try {
          await r2Service.delete(usuario.imageKey);
        } catch (error) {
          console.error("Erro ao excluir avatar anterior do R2:", error);
        }
      }

      return res.status(200).json({
        message: "Avatar atualizado com sucesso.",
        usuario: updatedUsuario,
      });
    } catch (error) {
      console.error("Erro ao atualizar avatar:", error);

      return res.status(500).json({
        message: "Erro interno ao atualizar avatar.",
      });
    }
  }
}

export const usuarioController = new UsuarioController();
