export const DADOS_COLETADOS = [
  {
    dado: "Nome e e-mail",
    quando: "Ao criar sua conta, por e-mail ou pelo Google.",
    finalidade:
      "Identificar sua conta, liberar o e-book comprado e enviar os e-mails da conta, como a confirmação de cadastro e o código de recuperação de senha.",
    base: "Execução de contrato (LGPD, art. 7º, V).",
  },
  {
    dado: "Senha",
    quando: "Ao criar conta com e-mail e senha.",
    finalidade:
      "Permitir o seu acesso. Guardamos apenas uma versão criptografada (hash): ninguém da equipe consegue ver a sua senha.",
    base: "Execução de contrato (art. 7º, V).",
  },
  {
    dado: "Dados da conta Google",
    quando: "Se você escolher “Continuar com Google”.",
    finalidade:
      "Criar e acessar sua conta sem senha. O Google nos envia apenas nome, e-mail e foto de perfil, nunca a sua senha do Google.",
    base: "Execução de contrato (art. 7º, V).",
  },
  {
    dado: "Celular (opcional)",
    quando: "Se você informar no seu perfil.",
    finalidade:
      "Falar com você sobre a sua conta ou compra, quando necessário. Você pode alterá-lo ou removê-lo no perfil.",
    base: "Consentimento (art. 7º, I).",
  },
  {
    dado: "Foto de perfil (opcional)",
    quando: "Se você enviar uma foto na Área do Usuário.",
    finalidade:
      "Exibir a sua foto na conta. Você pode trocá-la quando quiser ou pedir a exclusão.",
    base: "Consentimento (art. 7º, I).",
  },
  {
    dado: "Dados da compra",
    quando: "Ao comprar o e-book.",
    finalidade:
      "Registrar o pedido (produto, valor, desconto, data, situação, forma de pagamento e códigos da transação), liberar o acesso, mostrar o seu histórico, atender reembolsos e cumprir obrigações fiscais.",
    base: "Execução de contrato e obrigação legal (art. 7º, V e II).",
  },
  {
    dado: "Registros de acesso",
    quando: "Ao usar o site.",
    finalidade:
      "Endereço IP, data e hora de cada acesso, usados para segurança, prevenção de fraudes e abusos (como bloquear tentativas repetidas) e para cumprir o Marco Civil da Internet.",
    base: "Obrigação legal e legítimo interesse (art. 7º, II e IX; Lei 12.965/2014, art. 15).",
  },
  {
    dado: "Mensagens de atendimento",
    quando: "Quando você fala com a gente.",
    finalidade:
      "Responder dúvidas, pedidos de reembolso e solicitações sobre os seus dados.",
    base: "Execução de contrato e exercício regular de direitos (art. 7º, V e VI).",
  },
] as const;

export const OPERADORES = [
  {
    nome: "InfinitePay",
    finalidade: "Processar o pagamento por Pix ou cartão.",
    dados:
      "Itens, valor e número do pedido. Os dados de pagamento, como o número do cartão, você informa direto no ambiente da InfinitePay: eles não passam pela LowTec.",
  },
  {
    nome: "Google",
    finalidade: "Login com Google (opcional).",
    dados:
      "Nome, e-mail e foto de perfil, enviados pelo Google com a sua autorização.",
  },
  {
    nome: "Resend",
    finalidade: "Enviar os e-mails da conta.",
    dados:
      "Seu e-mail e o conteúdo da mensagem (link de confirmação ou código de recuperação).",
  },
  {
    nome: "Cloudflare (R2)",
    finalidade: "Armazenar arquivos.",
    dados:
      "Sua foto de perfil, se você enviar uma. O arquivo do e-book também fica guardado lá.",
  },
  {
    nome: "Provedores de hospedagem",
    finalidade: "Manter o site, o servidor e o banco de dados no ar.",
    dados: "Os dados descritos nesta política e os registros de acesso.",
  },
] as const;

export const COOKIES = [
  {
    nome: "JWT_USUARIO",
    finalidade: "Mantém você conectado à sua conta com segurança.",
    duracao: "7 dias, ou até você sair da conta.",
  },
  {
    nome: "next-auth.* (session-token, csrf-token, callback-url)",
    finalidade: "Protegem e concluem o login com Google.",
    duracao: "Até você fechar o navegador. O de sessão expira em 1 minuto.",
  },
] as const;

export const DIREITOS_TITULAR = [
  "Confirmar se tratamos os seus dados e acessá-los (art. 18, I e II).",
  "Corrigir dados incompletos, inexatos ou desatualizados (III).",
  "Pedir a anonimização, o bloqueio ou a eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a lei (IV).",
  "Pedir a portabilidade dos seus dados a outro fornecedor (V).",
  "Pedir a eliminação dos dados tratados com o seu consentimento (VI).",
  "Saber com quem compartilhamos os seus dados (VII).",
  "Saber que pode não dar o consentimento e o que acontece nesse caso (VIII).",
  "Revogar o consentimento a qualquer momento (IX).",
  "Opor-se a um tratamento que descumpra a lei (§ 2º).",
  "Apresentar reclamação à Autoridade Nacional de Proteção de Dados, a ANPD (§ 1º).",
] as const;

export const LEGISLACAO = [
  {
    nome: "Lei nº 13.709/2018",
    descricao: "Lei Geral de Proteção de Dados Pessoais (LGPD)",
    href: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm",
  },
  {
    nome: "Lei nº 8.078/1990",
    descricao: "Código de Defesa do Consumidor (CDC)",
    href: "https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm",
  },
  {
    nome: "Decreto nº 7.962/2013",
    descricao: "Regras do comércio eletrônico",
    href: "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/decreto/d7962.htm",
  },
  {
    nome: "Lei nº 12.965/2014",
    descricao: "Marco Civil da Internet",
    href: "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12965.htm",
  },
  {
    nome: "Lei nº 9.610/1998",
    descricao: "Lei de Direitos Autorais",
    href: "https://www.planalto.gov.br/ccivil_03/leis/l9610.htm",
  },
  {
    nome: "Lei nº 10.406/2002",
    descricao: "Código Civil",
    href: "https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm",
  },
  {
    nome: "ANPD",
    descricao: "Autoridade Nacional de Proteção de Dados",
    href: "https://www.gov.br/anpd",
  },
] as const;
