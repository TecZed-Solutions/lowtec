import {
  COOKIES,
  DADOS_COLETADOS,
  DIREITOS_TITULAR,
  OPERADORES,
} from "@/constants/legal";

import type { Clausula } from "./Documento";
import DadosEmpresa, { EmailAtendimento } from "./Empresa";
import Fichas from "./Fichas";
import Lista from "./Lista";

export const POLITICA_DE_PRIVACIDADE: readonly Clausula[] = [
  {
    id: "privacidade-controlador",
    titulo: "Quem cuida dos seus dados",
    conteudo: (
      <>
        <p>
          Esta política explica como a LowTec trata os seus dados pessoais,
          conforme a Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018) e
          o Marco Civil da Internet (Lei nº 12.965/2014). A controladora dos
          dados, isto é, quem decide como eles são usados, é:
        </p>
        <DadosEmpresa />
        <p>
          Para qualquer assunto sobre os seus dados, use o nosso canal de
          privacidade: <EmailAtendimento />.
        </p>
      </>
    ),
  },
  {
    id: "privacidade-dados",
    titulo: "Quais dados coletamos e por quê",
    conteudo: (
      <>
        <p>
          Coletamos só o necessário para a sua conta e a sua compra. Para cada
          uso, a LGPD exige uma justificativa prevista em lei, chamada de base
          legal (art. 7º):
        </p>
        <Fichas
          itens={DADOS_COLETADOS.map(({ dado, quando, finalidade, base }) => ({
            titulo: dado,
            campos: [
              { rotulo: "Quando", valor: quando },
              { rotulo: "Para quê", valor: finalidade },
              { rotulo: "Base legal", valor: base },
            ],
          }))}
        />
      </>
    ),
  },
  {
    id: "privacidade-nao-coletamos",
    titulo: "O que não coletamos",
    conteudo: (
      <>
        <Lista>
          <li>
            <strong>As fotos que você envia para a IA.</strong> Você envia a sua
            foto e cola o prompt direto na ferramenta escolhida (ChatGPT, Gemini
            ou outra). Essas fotos não passam pela LowTec: quem as trata é a
            empresa dona da ferramenta, segundo a política de privacidade dela,
            que recomendamos que você leia.
          </li>
          <li>
            <strong>Os dados do seu cartão.</strong> Você os informa direto à
            InfinitePay.
          </li>
          <li>
            <strong>Dados sensíveis</strong>, como origem racial, religião,
            opinião política, saúde ou biometria (LGPD, art. 5º, II).
          </li>
        </Lista>
        <p>Não vendemos os seus dados e não os usamos para publicidade.</p>
      </>
    ),
  },
  {
    id: "privacidade-compartilhamento",
    titulo: "Com quem compartilhamos",
    conteudo: (
      <>
        <p>
          Para o site funcionar, contamos com empresas que tratam dados em nosso
          nome, chamadas de operadoras (LGPD, art. 5º, VII). Elas só podem usar
          os dados para o serviço que prestam à LowTec:
        </p>
        <Fichas
          itens={OPERADORES.map(({ nome, finalidade, dados }) => ({
            titulo: nome,
            campos: [
              { rotulo: "Para quê", valor: finalidade },
              { rotulo: "Dados", valor: dados },
            ],
          }))}
        />
        <p>
          Também podemos fornecer dados a autoridades públicas, mas somente
          quando houver obrigação legal ou ordem judicial.
        </p>
      </>
    ),
  },
  {
    id: "privacidade-internacional",
    titulo: "Transferência internacional",
    conteudo: (
      <p>
        Alguns desses fornecedores, como Google, Resend, Cloudflare, podem
        armazenar ou processar dados fora do Brasil, principalmente nos Estados
        Unidos. Essas transferências seguem as hipóteses do art. 33 da LGPD e a
        regulamentação da ANPD.
      </p>
    ),
  },
  {
    id: "privacidade-retencao",
    titulo: "Por quanto tempo guardamos",
    conteudo: (
      <Lista>
        <li>
          <strong>Dados da conta:</strong> enquanto a conta existir. Depois de
          um pedido de exclusão, são apagados ou anonimizados, exceto nos casos
          abaixo.
        </li>
        <li>
          <strong>Dados da compra:</strong> por até 5 anos após a compra, para
          cumprir obrigações fiscais e permitir a defesa em eventuais processos
          (LGPD, art. 16, I, e art. 7º, VI).
        </li>
        <li>
          <strong>Registros de acesso:</strong> por 6 meses, como exige o Marco
          Civil da Internet (art. 15).
        </li>
        <li>
          <strong>Links e códigos de verificação:</strong> valem por tempo
          limitado (no máximo 24 horas) e são descartados depois de usados.
        </li>
        <li>
          <strong>Mensagens de atendimento:</strong> pelo tempo necessário para
          resolver o pedido e para a defesa de direitos.
        </li>
      </Lista>
    ),
  },
  {
    id: "privacidade-direitos",
    titulo: "Seus direitos",
    conteudo: (
      <>
        <p>
          A LGPD (art. 18) garante a você, a qualquer momento, o direito de:
        </p>
        <Lista>
          {DIREITOS_TITULAR.map((direito) => (
            <li key={direito}>{direito}</li>
          ))}
        </Lista>
        <p>
          Nome, celular e foto você mesmo altera na Área do Usuário. Para os
          demais pedidos, escreva para <EmailAtendimento /> a partir do e-mail
          da sua conta. Podemos pedir uma confirmação de identidade para
          proteger os seus dados. Respondemos em até 15 dias (art. 19, II).
        </p>
        <p>
          Alguns dados podem continuar guardados mesmo após um pedido de
          exclusão, quando a lei exigir (art. 16), como os dados da compra.
        </p>
      </>
    ),
  },
  {
    id: "privacidade-cookies",
    titulo: "Cookies",
    conteudo: (
      <>
        <p>
          Cookies são pequenos arquivos que o site guarda no seu navegador.
          Usamos apenas <strong>cookies essenciais</strong>, sem os quais não é
          possível entrar na sua conta:
        </p>
        <Fichas
          itens={COOKIES.map(({ nome, finalidade, duracao }) => ({
            titulo: nome,
            campos: [
              { rotulo: "Para quê", valor: finalidade },
              { rotulo: "Duração", valor: duracao },
            ],
          }))}
        />
        <p>
          Por serem estritamente necessários, esses cookies não dependem de
          consentimento: a base legal é o legítimo interesse (LGPD, art. 7º,
          IX), como admite o guia orientativo de cookies da ANPD. Não usamos
          cookies de publicidade, de rastreamento nem de medição de audiência.
          Se isso mudar, atualizaremos esta política e pediremos o seu
          consentimento quando a lei exigir.
        </p>
        <p>
          Você pode bloquear ou apagar cookies nas configurações do navegador,
          mas sem eles o login não funciona.
        </p>
      </>
    ),
  },
  {
    id: "privacidade-seguranca",
    titulo: "Segurança",
    conteudo: (
      <>
        <p>
          Adotamos medidas técnicas e administrativas para proteger os seus
          dados (LGPD, art. 46), como:
        </p>
        <Lista>
          <li>conexão criptografada (HTTPS);</li>
          <li>senhas guardadas apenas em formato criptografado (hash);</li>
          <li>
            cookies de sessão protegidos, que os scripts da página não conseguem
            ler;
          </li>
          <li>
            limite de tentativas em ações sensíveis, como cadastro e recuperação
            de senha;
          </li>
          <li>
            download do e-book por link temporário, liberado só para quem
            comprou;
          </li>
          <li>
            acesso restrito aos dados, com área administrativa protegida por
            verificação em duas etapas.
          </li>
        </Lista>
        <p>
          Nenhum sistema é totalmente invulnerável. Se ocorrer um incidente de
          segurança que possa trazer risco ou dano relevante a você, vamos
          comunicar você e a ANPD (art. 48).
        </p>
      </>
    ),
  },
  {
    id: "privacidade-menores",
    titulo: "Crianças e adolescentes",
    conteudo: (
      <p>
        O site é voltado a maiores de 18 anos. Adolescentes só podem criar conta
        com a autorização e o acompanhamento dos pais ou responsáveis, e não
        coletamos de propósito dados de crianças. Se identificarmos dados de uma
        criança coletados sem o consentimento de um dos pais ou responsável,
        vamos excluí-los (LGPD, art. 14).
      </p>
    ),
  },
  {
    id: "privacidade-emails",
    titulo: "E-mails que enviamos",
    conteudo: (
      <p>
        Hoje enviamos apenas os e-mails necessários para a sua conta, como a
        confirmação de cadastro e o código de recuperação de senha. Se um dia
        enviarmos novidades ou ofertas, você poderá cancelar o recebimento a
        qualquer momento.
      </p>
    ),
  },
  {
    id: "privacidade-alteracoes",
    titulo: "Alterações desta política",
    conteudo: (
      <p>
        Podemos atualizar esta política. A data da última atualização fica no
        topo da página, e mudanças relevantes, principalmente novos usos dos
        seus dados, são avisadas por e-mail ou no site.
      </p>
    ),
  },
  {
    id: "privacidade-contato",
    titulo: "Contato e ANPD",
    conteudo: (
      <p>
        Fale com a gente pelo canal de privacidade: <EmailAtendimento />. Se não
        ficar satisfeito com a resposta, você pode reclamar à Autoridade
        Nacional de Proteção de Dados (ANPD) em{" "}
        <a
          href="https://www.gov.br/anpd"
          target="_blank"
          rel="noopener noreferrer"
        >
          gov.br/anpd
        </a>
        .
      </p>
    ),
  },
];
