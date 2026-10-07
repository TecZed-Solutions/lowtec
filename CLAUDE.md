# LowTec

Plataforma de vendas de um produto **low ticket**: um e-book com prompts prontos para gerar imagens realistas com IA (a pessoa envia a própria foto e aplica o prompt). O e-book é organizado em categorias por tipo de fotografia (profissional, irreal, estilo, ângulos, poses, luz, efeitos…). Desenvolvido pela **TecZed** (repo `TecZed-Solutions/lowtec`).

Fluxo de negócio: **Landing Page** (apresenta e vende) → **cadastro/login** → **checkout próprio** (InfinitePay) → **área do cliente** com acesso/download do e-book.

## Estrutura do monorepo

| Pasta | O que é | Stack |
| --- | --- | --- |
| `frontend/` | Landing Page + (futuros) login, checkout e área do cliente | Next.js 16 (App Router), React 19, Tailwind v4 |
| `backend/` | API REST | Express 5, TypeScript (ESM), Prisma 7 + PostgreSQL |
| `lowtec.excalidraw` | Diagrama de arquitetura/fluxo (arquivo grande, não abrir inteiro) | — |

Cada pasta tem seu próprio `package.json` e `node_modules`; rode comandos dentro da pasta correspondente. O `frontend/CLAUDE.md` traz as regras específicas do frontend.

## Idioma e convenções gerais

- Interface, mensagens de erro da API, nomes de domínio e comentários em **português (pt-BR)**: `Usuario`, `Compra`, `Pagamento`, `Produto`. Código de infraestrutura segue inglês (`controller`, `service`, `middleware`).
- TypeScript `strict` nas duas pastas. Sem testes automatizados configurados ainda.
- Commits curtos em português, descrevendo a etapa (ex.: "Proof Section", "Hero section").
- Nunca commitar `.env*`. O frontend e o backend ignoram esses arquivos.

## Backend (`backend/`)

### Comandos

- `npm test` — na prática é `tsx watch src/server.ts` (único script; serve como "dev"). Não há `build`/`start` ainda; o `tsconfig` já define `outDir: dist`.
- `npx prisma generate` — após alterar o schema.
- `npx prisma migrate dev --name <nome>` — nova migration (pasta `prisma/migrations`).
- `npx prisma db seed` — o `seed` está comentado em `prisma.config.ts`.

### Arquitetura

- ESM com `module: NodeNext`: **imports relativos precisam terminar em `.js`** (`import x from "./x.js"`), mesmo em arquivos `.ts`.
- Entrada: `src/server.ts` → `src/app.ts` (cors, morgan, `express.json`, rotas em `/api`, health check em `/`).
- **Rotas são autocarregadas** por `src/routes/index.ts`: para cada pasta em `src/modules/<nome>/` ele importa `<nome>.routes.ts` e monta o `default export` `{ path, router }`. Para criar um módulo novo, basta criar a pasta com `<nome>.routes.ts` exportando `{ path: "/<nome>", router }`; não edite `routes/index.ts`.
- Padrão por módulo: `*.routes.ts` → `*.controller.ts` (valida entrada, HTTP) → `*.service.ts` (regra de negócio e Prisma). Controllers e services são classes exportadas como instância (`export const xService = new XService()`).
- Módulos atuais: `usuario`, `admin`, `pagamento`, `compra`.
- `src/config/` clientes externos (Prisma com adapter `pg`, Cloudflare R2 via S3 client, Resend). `src/integration/` gateways de pagamento. `src/utils/` serviços auxiliares (e-mail, R2, rate limit, regex). `src/types/` DTOs e tipos de request autenticado.
- Rate limits em `utils/rateLimit.service.ts`: `globalRateLimit` (100/30 min), `restrictRateLimit` (3/hora, para ações sensíveis), `loginRateLimit` (10/15 min, hoje sem uso).

### Modelo de dados (`prisma/models/*.prisma`, um arquivo por entidade)

`Usuario` (login LOCAL ou GOOGLE, verificação de e-mail, token de reset de senha, avatar no R2) · `Produto` (`valor`, `discount`, `downloadUrl`) · `Pagamento` (`StatusPagamento`, `MetodoPagamento` PIX/cartão, `GatewayPagamento`, `checkoutUrl`, `metadata` JSON) · `Compra` (item de um pagamento: usuário + produto + valor/desconto) · `Admin` (login + 2º fator).

Valores monetários são `Decimal(10,2)` — nunca converter para `number` antes da hora. O preço final de um item é `valor - discount`; a InfinitePay recebe **centavos** (`.mul(100)`).

### Autenticação

- Usuário: JWT no cookie `JWT_USUARIO` (7 dias, `httpOnly`, `sameSite: strict`), segredo `process.env.JWT_USUARIO`. Login local + Google (`google-auth-library`).
- Admin: JWT no cookie `JWT_ADMIN` (1 h) **mais** header `twoFactor` (6 dígitos, comparado com bcrypt). Um 2º fator errado **desativa a conta** do admin (`active: false`).
- Senha: mínimo 8 caracteres com maiúscula, minúscula e número (`utils/regex.ts`).

### Variáveis de ambiente (backend)

`PORT`, `NODE_ENV`, `DATABASE_URL`, `FRONTEND_URL` (links dos e-mails, ex.: `/confirmar-email?token=…`), `JWT_USUARIO`, `JWT_ADMIN`, `GOOGLE_CLIENT_ID`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, `R2_PUBLIC_URL`, `INFINITEPAY_API_URL`, `INFINITEPAY_HANDLE`, `INFINITEPAY_REDIRECT_URL`, `INFINITEPAY_WEBHOOK_URL`. O cookie só é `secure` quando `NODE_ENV=production`.

### Pendências e problemas conhecidos (verificados no código)

Trate como bloqueadores antes de ir para produção:

1. **`cookie-parser` não está instalado/registrado**, mas os middlewares leem `req.cookies`. Hoje toda rota autenticada responde 401. Instalar e registrar `app.use(cookieParser())`.
2. **Não existe webhook da InfinitePay.** O `webhook_url` é enviado ao criar o link, mas nenhuma rota recebe a confirmação, então nenhum `Pagamento` passa de `PENDING` para `PAID` (e `compra/todas` e o faturamento do admin só contam `PAID`). Validar a origem do webhook e tornar a atualização idempotente.
3. **Entrega do e-book não implementada**: nenhuma rota expõe `Produto.downloadUrl` para quem comprou.
4. `cors()` está aberto, sem `origin` nem `credentials`. Como a auth é por cookie, restringir ao domínio do frontend e habilitar `credentials: true`.
5. `POST /api/admin/create` é público e marcado no código para **remover em produção**.
6. `login-local` e `login-google` não usam rate limit específico (`loginRateLimit` está definido, mas não aplicado).

## Como trabalhar neste repo

- Antes de mexer em Next.js, siga o aviso do `frontend/AGENTS.md`: esta versão tem breaking changes; consulte `frontend/node_modules/next/dist/docs/`.
- Mudanças de schema Prisma exigem `prisma generate` (e migration) antes de rodar o backend.
- Ao tocar em pagamento/auth, preserve as validações existentes e as mensagens em pt-BR; não afrouxe rate limits nem checagens de admin.
- Não rode migrations nem scripts contra um banco real sem confirmar qual `DATABASE_URL` está carregado.
