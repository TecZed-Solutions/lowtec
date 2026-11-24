const CORES = {
  fundo: "#050505",
  cartao: "#121212",
  borda: "#204712",
  divisor: "#1f3317",
  marca: "#49e510",
  texto1: "#f5f5f5",
  texto2: "#b8b8b8",
  texto3: "#929292",
};

const FONTE = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const FONTE_TITULO =
  "'Arial Black', 'Helvetica Neue', Helvetica, Arial, sans-serif";

const ESTILO_PARAGRAFO = `margin:0 0 16px;font-family:${FONTE};font-size:16px;line-height:1.6;color:${CORES.texto2};`;
const ESTILO_NOTA = `margin:0;font-family:${FONTE};font-size:14px;line-height:1.6;color:${CORES.texto3};`;

interface EmailRenderizado {
  html: string;
  text: string;
}

interface LayoutProps {
  assunto: string;
  preheader: string;
  titulo: string;
  destaque: string;
  conteudo: string;
  aviso: string;
}

function layout({
  assunto,
  preheader,
  titulo,
  destaque,
  conteudo,
  aviso,
}: LayoutProps) {
  const site = process.env.FRONTEND_URL;
  const ano = new Date().getFullYear();

  return `
    <!doctype html>
    <html lang="pt-BR" xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="x-apple-disable-message-reformatting" />
        <meta name="color-scheme" content="dark" />
        <meta name="supported-color-schemes" content="dark" />
        <title>${assunto}</title>
        <style>
          :root { color-scheme: dark; supported-color-schemes: dark; }
          body { margin: 0; padding: 0; }
          a { color: ${CORES.marca}; }
          @media (max-width: 600px) {
            .cartao { padding: 32px 24px !important; }
            .titulo { font-size: 26px !important; }
          }
        </style>
      </head>
      <body style="margin:0;padding:0;background-color:${CORES.fundo};">
        <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${preheader}</div>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${CORES.fundo}" style="background-color:${CORES.fundo};">
          <tr>
            <td align="center" style="padding:40px 16px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
                <tr>
                  <td align="center" style="padding-bottom:28px;">
                    <a href="${site}" target="_blank" style="text-decoration:none;">
                      <img src="${site}/logo_submark.png" width="64" height="48" alt="LowTec" style="display:block;border:0;width:64px;height:48px;font-family:${FONTE_TITULO};font-size:22px;font-style:italic;font-weight:900;color:${CORES.marca};" />
                    </a>
                  </td>
                </tr>

                <tr>
                  <td class="cartao" bgcolor="${CORES.cartao}" style="background-color:${CORES.cartao};border:1px solid ${CORES.borda};border-radius:12px;padding:40px;">
                    <h1 class="titulo" style="margin:0 0 20px;font-family:${FONTE_TITULO};font-size:30px;line-height:1.1;font-style:italic;font-weight:900;letter-spacing:-0.5px;color:${CORES.texto1};">
                      ${titulo} <span style="color:${CORES.marca};">${destaque}</span>
                    </h1>
                    ${conteudo}
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding:28px 16px 0;font-family:${FONTE};font-size:12px;line-height:1.6;color:${CORES.texto3};">
                    <p style="margin:0 0 12px;">${aviso}</p>
                    <p style="margin:0;">&copy; ${ano} <a href="${site}" target="_blank" style="color:${CORES.texto2};text-decoration:none;font-weight:700;">LowTec</a>. Todos os direitos reservados.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

export function templateConfirmacaoEmail(url: string): EmailRenderizado {
  const aviso =
    "Se você não criou uma conta na LowTec, é só ignorar este e-mail.";

  const html = layout({
    assunto: "Confirme seu e-mail",
    preheader: "Falta só um passo para ativar sua conta na LowTec.",
    titulo: "Confirme seu",
    destaque: "e-mail.",
    aviso,
    conteudo: `
      <p style="${ESTILO_PARAGRAFO}">Falta só um passo para ativar sua conta na LowTec. Clique no botão abaixo para confirmar seu e-mail.</p>

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0;">
        <tr>
          <td bgcolor="${CORES.marca}" style="background-color:${CORES.marca};box-shadow:0 10px 40px -10px rgba(73,229,16,0.6);">
            <a href="${url}" target="_blank" style="display:inline-block;padding:16px 32px;font-family:${FONTE};font-size:16px;font-weight:800;color:${CORES.fundo};text-decoration:none;">Confirmar e-mail &rarr;</a>
          </td>
        </tr>
      </table>

      <p style="${ESTILO_NOTA}">O link vale por 24 horas.</p>

      <div style="border-top:1px dashed ${CORES.divisor};margin:28px 0 20px;line-height:0;font-size:0;">&nbsp;</div>

      <p style="margin:0 0 8px;font-family:${FONTE};font-size:13px;line-height:1.6;color:${CORES.texto3};">Se o botão não funcionar, copie e cole este link no navegador:</p>
      <p style="margin:0;font-family:${FONTE};font-size:13px;line-height:1.6;word-break:break-all;"><a href="${url}" target="_blank" style="color:${CORES.marca};">${url}</a></p>
    `,
  });

  const text = [
    "Confirme seu e-mail",
    "",
    "Falta só um passo para ativar sua conta na LowTec. Acesse o link abaixo para confirmar seu e-mail:",
    "",
    url,
    "",
    "O link vale por 24 horas.",
    "",
    aviso,
  ].join("\n");

  return { html, text };
}

export function templateCodigoSenha(codigo: string): EmailRenderizado {
  const aviso =
    "Se você não pediu para redefinir a senha, ignore este e-mail. Sua senha atual continua a mesma.";

  const html = layout({
    assunto: "Código para redefinir sua senha",
    preheader: `Seu código de verificação é ${codigo}.`,
    titulo: "Redefina sua",
    destaque: "senha.",
    aviso,
    conteudo: `
      <p style="${ESTILO_PARAGRAFO}">Recebemos um pedido para redefinir a senha da sua conta. Digite o código abaixo na página de recuperação de senha:</p>

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0;">
        <tr>
          <td bgcolor="${CORES.fundo}" style="background-color:${CORES.fundo};border:1px dashed ${CORES.marca};padding:18px 18px 18px 28px;font-family:${FONTE};font-size:36px;line-height:1;font-weight:800;letter-spacing:10px;color:${CORES.marca};">${codigo}</td>
        </tr>
      </table>

      <p style="${ESTILO_NOTA}">O código vale por 30 minutos.</p>
    `,
  });

  const text = [
    "Redefina sua senha",
    "",
    "Recebemos um pedido para redefinir a senha da sua conta. Digite o código abaixo na página de recuperação de senha:",
    "",
    codigo,
    "",
    "O código vale por 30 minutos.",
    "",
    aviso,
  ].join("\n");

  return { html, text };
}
