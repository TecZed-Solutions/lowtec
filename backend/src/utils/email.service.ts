import { resend } from "../config/resend.js";

class ResendEmailService {
  async enviarConfirmacaoEmail(email: string, verificationToken: string) {
    const verificationUrl = `${process.env.FRONTEND_URL}/confirmar-email?token=${verificationToken}`;

    return resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: "Confirme seu e-mail",
      html: `
        <h1>Confirme seu e-mail</h1>
  
        <p>
          Olá! Para confirmar seu cadastro, clique no botão abaixo:
        </p>
  
        <a
          href="${verificationUrl}"
          style="
            display: inline-block;
            padding: 12px 20px;
            background-color: #000;
            color: #fff;
            text-decoration: none;
            border-radius: 6px;
          "
        >
          Confirmar e-mail
        </a>
  
        <p>
          Este link é válido por 30 minutos.
        </p>
      `,
    });
  }

  async enviarTokenPassword(email: string, resetToken: number) {
    return resend.emails.send({
      from: "LowTec <no-reply@lowtec.com.br>",
      to: email,
      subject: "Código para redefinir sua senha",
      html: `
        <h1>Redefinição de senha</h1>

        <p>
          Recebemos uma solicitação para redefinir sua senha.
        </p>

        <p>
          Seu código de verificação é:
        </p>

        <div
          style="
            display: inline-block;
            padding: 14px 24px;
            background-color: #f3f3f3;
            color: #000;
            font-size: 28px;
            font-weight: bold;
            letter-spacing: 6px;
            border-radius: 8px;
          "
        >
          ${resetToken.toString().padStart(6, "0")}
        </div>

        <p>
          Este código é válido por 30 minutos.
        </p>

        <p>
          Se você não solicitou a redefinição de senha,
          ignore este e-mail.
        </p>
      `,
    });
  }
}

const resendEmailService = new ResendEmailService();

export default resendEmailService;
