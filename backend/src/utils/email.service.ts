import { resend } from "../config/resend.js";

export async function enviarConfirmacaoEmail(
    email: string,
    verificationToken: string,
  ) {
    const verificationUrl =
      `${process.env.FRONTEND_URL}/confirmar-email?token=${verificationToken}`;
  
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