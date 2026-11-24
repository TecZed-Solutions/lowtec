import { resend } from "../config/resend.js";
import {
  templateCodigoSenha,
  templateConfirmacaoEmail,
} from "./emailTemplates.js";

class ResendEmailService {
  async enviarConfirmacaoEmail(email: string, verificationToken: string) {
    const verificationUrl = `${process.env.FRONTEND_URL}/confirmar-email?token=${verificationToken}`;
    const { html, text } = templateConfirmacaoEmail(verificationUrl);

    return resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: "Confirme seu e-mail",
      html,
      text,
    });
  }

  async enviarTokenPassword(email: string, resetToken: number) {
    const { html, text } = templateCodigoSenha(
      resetToken.toString().padStart(6, "0"),
    );

    return resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: "Código para redefinir sua senha",
      html,
      text,
    });
  }
}

const resendEmailService = new ResendEmailService();

export default resendEmailService;
