import { siteUrl } from "@/config/site";

import type { Clausula } from "./Documento";
import DadosEmpresa, { EmailAtendimento } from "./Empresa";
import Lista from "./Lista";

export const TERMOS_DE_USO: readonly Clausula[] = [
  {
    id: "termos-quem-somos",
    titulo: "Quem somos",
    conteudo: (
      <>
        <p>
          A <strong>LowTec</strong> vende o e-book{" "}
          <strong>Você em 100 versões</strong> no site {new URL(siteUrl).host}.
          Os dados do fornecedor, exigidos pelo Decreto nº 7.962/2013 (art. 2º),
          são:
        </p>
        <DadosEmpresa />
      </>
    ),
  },
  {
    id: "termos-aceitacao",
    titulo: "Aceitação destes termos",
    conteudo: (
      <>
        <p>
          Ao criar uma conta ou comprar o e-book, você declara que leu e
          concorda com estes Termos de Uso e com a{" "}
          <a href="#privacidade">Política de Privacidade</a>. Se não concordar,
          não use o site.
        </p>
        <p>
          Para criar uma conta e comprar, você precisa ter 18 anos ou mais.
          Menores de idade só podem fazer isso com a autorização e o
          acompanhamento dos pais ou responsáveis legais, que respondem pela
          compra e pelo uso (Código Civil, arts. 3º, 4º e 1.634).
        </p>
      </>
    ),
  },
  {
    id: "termos-produto",
    titulo: "O produto",
    conteudo: (
      <>
        <p>
          O <strong>Você em 100 versões</strong> é um e-book digital, em PDF,
          com 100 prompts prontos, organizados em 5 categorias e 4 formatos de
          imagem, para você gerar imagens realistas a partir da sua própria foto
          em ferramentas de inteligência artificial (IA). Os prompts são
          escritos em inglês e vêm prontos para copiar e colar.
        </p>
        <p>
          O preço, os descontos e as formas de pagamento aparecem no checkout
          antes da compra. O pagamento é único: não há assinatura nem cobrança
          recorrente.
        </p>
        <p>
          <strong>
            O e-book não inclui acesso a nenhuma ferramenta de IA.
          </strong>{" "}
          Para usar os prompts, você precisa de uma conta em uma ferramenta de
          outra empresa, como ChatGPT, Gemini ou Grok, que pode ser gratuita com
          limites ou paga, conforme as regras de cada uma.
        </p>
      </>
    ),
  },
  {
    id: "termos-conta",
    titulo: "Sua conta",
    conteudo: (
      <Lista>
        <li>Informe dados verdadeiros e mantenha-os atualizados.</li>
        <li>
          Se criar a conta com e-mail e senha, confirme o seu e-mail para
          ativá-la.
        </li>
        <li>
          Guarde a sua senha em segredo: o que for feito com ela é de sua
          responsabilidade. Se suspeitar de uso indevido, troque a senha e avise
          a gente.
        </li>
        <li>A conta é pessoal e intransferível.</li>
      </Lista>
    ),
  },
  {
    id: "termos-compra",
    titulo: "Compra, pagamento e acesso",
    conteudo: (
      <>
        <p>
          O pagamento é processado pela <strong>InfinitePay</strong>, por Pix ou
          cartão, no ambiente seguro dela. A LowTec não recebe nem armazena os
          dados do seu cartão.
        </p>
        <p>
          Assim que a InfinitePay confirma o pagamento, o e-book é liberado na
          sua <strong>Área do Usuário</strong>, onde você também vê o histórico
          dos seus pagamentos. O download é feito por um link temporário, gerado
          sempre que você clica para baixar.
        </p>
        <p>
          Você pode salvar ou imprimir esta página para guardar uma cópia destes
          termos (Decreto nº 7.962/2013, art. 4º, IV).
        </p>
      </>
    ),
  },
  {
    id: "termos-arrependimento",
    titulo: "Direito de arrependimento e reembolso",
    conteudo: (
      <>
        <p>
          Pelo Código de Defesa do Consumidor (art. 49), você pode desistir da
          compra em até <strong>7 dias corridos</strong>, contados da data da
          compra, sem precisar explicar o motivo, e receber de volta{" "}
          <strong>100% do valor pago</strong>. Para isso:
        </p>
        <Lista>
          <li>
            envie um e-mail para <EmailAtendimento /> com o assunto
            “Arrependimento”, de preferência a partir do e-mail da sua conta;
          </li>
          <li>
            confirmamos o recebimento do seu pedido de imediato (Decreto nº
            7.962/2013, art. 5º, § 4º);
          </li>
          <li>
            devolvemos o valor de imediato, pelo mesmo meio de pagamento. No{" "}
            <strong>Pix</strong>, o dinheiro volta para a conta de origem. No{" "}
            <strong>cartão</strong>, pedimos o estorno à InfinitePay e à
            operadora, e o prazo para ele aparecer na fatura depende do emissor
            do cartão (Decreto nº 7.962/2013, art. 5º, § 3º).
          </li>
        </Lista>
        <p>
          Com o reembolso, a licença de uso termina: o acesso ao e-book é
          removido da sua Área do Usuário e você deve apagar as cópias que tiver
          baixado.
        </p>
        <p>
          Depois desse prazo, se o arquivo apresentar algum problema (por
          exemplo, não abrir ou estar incompleto), fale com a gente: corrigimos
          ou enviamos um novo arquivo, sem prejuízo dos demais direitos
          previstos no Código de Defesa do Consumidor.
        </p>
      </>
    ),
  },
  {
    id: "termos-licenca",
    titulo: "Licença de uso e direitos autorais",
    conteudo: (
      <>
        <p>
          Os textos, os prompts, as imagens de exemplo e o projeto gráfico do
          e-book são obras protegidas pela Lei de Direitos Autorais (Lei nº
          9.610/1998, art. 7º) e pertencem à LowTec ou a quem os licenciou para
          ela.
        </p>
        <p>
          A compra dá a você uma{" "}
          <strong>licença pessoal, não exclusiva e intransferível</strong> para
          ler o e-book e usar os prompts para gerar as suas próprias imagens.
          Sem autorização prévia e por escrito da LowTec (Lei nº 9.610/1998,
          art. 29), você não pode:
        </p>
        <Lista>
          <li>
            revender, emprestar, compartilhar ou disponibilizar o arquivo, no
            todo ou em parte, inclusive em grupos, redes sociais ou sites de
            download;
          </li>
          <li>
            publicar ou distribuir os prompts em conjunto, de graça ou não;
          </li>
          <li>
            usar o conteúdo para criar e vender outro produto, curso ou e-book;
          </li>
          <li>remover marcas, créditos ou a identificação da LowTec.</li>
        </Lista>
        <p>
          O descumprimento pode levar ao bloqueio da conta e às medidas legais
          cabíveis.
        </p>
        <p>
          As imagens que você gerar são suas: a LowTec não reivindica nenhum
          direito sobre elas. O uso dessas imagens também segue os termos da
          ferramenta de IA utilizada.
        </p>
      </>
    ),
  },
  {
    id: "termos-uso-responsavel",
    titulo: "Uso responsável da IA",
    conteudo: (
      <>
        <p>
          Os prompts foram feitos para você criar imagens a partir da sua
          própria foto. Ao usá-los, você se compromete a:
        </p>
        <Lista>
          <li>
            usar apenas a sua foto ou a de pessoas que autorizaram
            expressamente, respeitando o direito de imagem (Constituição
            Federal, art. 5º, X, e Código Civil, art. 20);
          </li>
          <li>
            não usar fotos de crianças ou adolescentes sem a autorização dos
            pais ou responsáveis;
          </li>
          <li>
            não criar nudez ou conteúdo sexual de pessoas reais e nunca, em
            nenhuma hipótese, conteúdo desse tipo envolvendo menores de idade;
          </li>
          <li>
            não usar as imagens para enganar, fraudar, se passar por outra
            pessoa, assediar, difamar, discriminar ou criar documentos falsos;
          </li>
          <li>
            seguir as regras da ferramenta de IA escolhida e informar que a
            imagem foi gerada por IA sempre que a lei ou a plataforma onde você
            publicar exigir.
          </li>
        </Lista>
        <p>
          Você é responsável pelas imagens que gera e pelo uso que faz delas.
        </p>
      </>
    ),
  },
  {
    id: "termos-ferramentas",
    titulo: "Ferramentas de IA de outras empresas",
    conteudo: (
      <>
        <p>
          ChatGPT, Gemini, Grok e as demais ferramentas citadas pertencem a
          outras empresas, com termos, preços, limites e políticas de
          privacidade próprios. A LowTec não tem vínculo com elas: os nomes
          aparecem só para indicar onde os prompts funcionam, e as marcas
          pertencem aos seus donos.
        </p>
        <p>
          O resultado de cada imagem depende da ferramenta, da versão dela e da
          foto enviada. A semelhança com o seu rosto pode variar, e às vezes é
          preciso gerar a imagem de novo. Essas ferramentas também podem mudar,
          passar a cobrar ou recusar certos pedidos por decisão própria.
        </p>
        <p>
          Nada disso afasta os seus direitos de consumidor: se o e-book não
          corresponder ao que foi anunciado, você pode exigi-los.
        </p>
      </>
    ),
  },
  {
    id: "termos-responsabilidades",
    titulo: "Disponibilidade e responsabilidades",
    conteudo: (
      <>
        <p>
          Trabalhamos para manter o site e a Área do Usuário no ar, mas pode
          haver interrupções para manutenção ou por falhas técnicas. Se isso
          impedir o acesso ao e-book que você comprou, fale com a gente e
          enviamos o arquivo por outro meio.
        </p>
        <p>
          A LowTec responde pelo e-book e pelo funcionamento do site, nos termos
          do Código de Defesa do Consumidor. Não responde pelo uso que você ou
          outras pessoas fizerem das imagens geradas, nem por falhas, cobranças
          ou mudanças nas ferramentas de IA de outras empresas, que não
          controlamos.
        </p>
      </>
    ),
  },
  {
    id: "termos-encerramento",
    titulo: "Encerramento da conta",
    conteudo: (
      <>
        <p>
          Você pode pedir a exclusão da sua conta a qualquer momento pelo e-mail{" "}
          <EmailAtendimento />. Depois disso, o e-book deixa de ficar disponível
          na Área do Usuário, então baixe o arquivo antes, se quiser mantê-lo.
          Alguns dados da compra continuam guardados pelo prazo legal, como
          explica a <a href="#privacidade-retencao">Política de Privacidade</a>.
        </p>
        <p>
          Podemos suspender ou encerrar contas que violem estes termos, como em
          casos de compartilhamento do arquivo ou de fraude, avisando você pelo
          e-mail cadastrado sempre que possível.
        </p>
      </>
    ),
  },
  {
    id: "termos-alteracoes",
    titulo: "Alterações destes termos",
    conteudo: (
      <p>
        Podemos atualizar estes termos para acompanhar mudanças no produto ou na
        lei. A data da última atualização fica no topo da página, e mudanças
        relevantes são avisadas por e-mail ou no site. Compras já feitas seguem
        as condições em vigor na data da compra.
      </p>
    ),
  },
  {
    id: "termos-atendimento",
    titulo: "Atendimento",
    conteudo: (
      <p>
        Dúvidas, reclamações e pedidos de cancelamento ou reembolso:{" "}
        <EmailAtendimento />. Respondemos em até 5 dias (Decreto nº 7.962/2013,
        art. 4º, parágrafo único).
      </p>
    ),
  },
  {
    id: "termos-foro",
    titulo: "Lei aplicável e foro",
    conteudo: (
      <p>
        Estes termos seguem as leis brasileiras. Qualquer questão pode ser
        levada à Justiça da cidade onde você mora, como garante o Código de
        Defesa do Consumidor (art. 101, I).
      </p>
    ),
  },
];
