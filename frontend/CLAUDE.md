@AGENTS.md

# LowTec — Frontend

Landing Page de venda do e-book de prompts para imagens realistas com IA (contexto do produto e do backend em `../CLAUDE.md`). Hoje só existe a landing (`Hero` + `Proof`); login, checkout e área do cliente ainda serão construídos aqui, consumindo a API do `../backend`.

## Comandos

- `npm run dev` — servidor de desenvolvimento (http://localhost:3000)
- `npm run build` / `npm start` — build e execução de produção
- `npm run lint` — ESLint (`eslint-config-next` core-web-vitals + typescript)
- Não há testes. Valide com `npm run lint` e `npm run build` (o build roda o type-check).

## Stack

Next.js **16.3** (App Router, `src/`), React **19.2** com **React Compiler ligado** (`reactCompiler: true`; não adicione `useMemo`/`useCallback` por reflexo), TypeScript strict, Tailwind **v4** (sem `tailwind.config`; tema em `globals.css`), `framer-motion`, `lucide-react`, `embla-carousel`, `react-compare-slider`, `cobe`, shadcn (style `base-nova`, primitivos `@base-ui/react`, registry extra `@magicui`). Alias `@/*` → `src/*`. Prettier com `prettier-plugin-tailwindcss` (classes ordenadas automaticamente).

Instaladas mas **ainda sem uso**: `next-auth`, `jose`, `js-cookie`, `sonner`. A auth do backend é por cookie `httpOnly` próprio (`JWT_USUARIO`); decida a estratégia antes de usar `next-auth`, para não duplicar sessão.

## Next.js 16: atenção

Conforme o `AGENTS.md`, não confie na memória sobre o Next. Leia o guia relevante em `node_modules/next/dist/docs/01-app/` antes de escrever código (ex.: `01-getting-started/16-proxy.md` — a convenção `middleware` virou `proxy` nesta versão — e `02-guides/authentication.md` para o futuro login).

## Estrutura

```
src/
  app/
    layout.tsx        # fontes, metadata (pt-BR), <html lang="pt-BR">
    page.tsx          # compõe as seções da landing + ScrollProgress
    globals.css       # tokens de marca + tokens shadcn + keyframes
    _components/      # seções da página (Hero, Proof) — privadas da rota
  components/
    Header.tsx, Comparison.tsx   # componentes de produto reutilizáveis
    hero/                        # peças exclusivas do Hero (HeroPattern, ProductShowcase)
    ui/                          # primitivos shadcn/magicui (button, carousel, marquee, terminal, bento-grid, number-ticker, scroll-progress)
  config/navigation.ts  # links de navegação
  lib/motion.ts         # variants de animação compartilhadas (fadeInLeft/Right/Up)
  lib/utils.ts          # reexporta `cn` do pacote `cn`
public/
  icons/                # favicons e webmanifest
  prompt-showcase/      # imagens do carrossel de categorias (Hero)
  proof/                # antes/depois da seção Proof
```

Novas seções da landing: criar em `app/_components/<Secao>.tsx` com `<section id=… aria-labelledby=…>` e registrar em `app/page.tsx`. Peças usadas por uma única seção ficam em `components/<secao>/`.

## Design system

Tema escuro, verde-neon como cor de marca. Use **os tokens do projeto**, não cores soltas:

| Token (Tailwind) | Valor | Uso |
| --- | --- | --- |
| `marca` / `marca1` | `#49e510` / `#206607` | CTA, destaques, foco, brilhos |
| `fundo` / `fundo2` | `#050505` / `#0b0b0b` | fundo de seção |
| `cartao` | `#121212` | cards, terminal |
| `text1` / `text2` / `text3` | `#f5f5f5` / `#b8b8b8` / `#929292` | texto principal / secundário / apagado |

Ex.: `bg-fundo text-text1`, `text-text2`, `bg-marca/15`, `border-marca/40`. Os tokens padrão do shadcn (`background`, `primary`, `muted`…) existem em `:root`/`.dark`, mas a landing **não** usa `.dark`; ela pinta direto com os tokens acima.

Fontes: `font-display` (títulos, geralmente `font-black italic tracking-tight`), `font-ui` (botões, Chivo), `font-sans` (Geist, corpo). Títulos usam `clamp()` fluido.

Padrões recorrentes a manter:
- **CTA**: botão verde inclinado (`-skew-x-12` com conteúdo `skew-x-12`) e sombra neon, apontando para `#comprar`. Está duplicado em `Hero.tsx` e `Header.tsx` — se for tocar nos dois, extraia um componente.
- Seções: `mx-auto max-w-7xl px-6`, separador `border-t border-dashed border-marca/15`, decoração com `aria-hidden`.
- Animações via variants de `lib/motion.ts`; respeitar `prefers-reduced-motion` (como em `HeroPattern` e `ProductShowcase`).
- Server Component por padrão; `"use client"` só onde há estado/efeito/framer-motion (ex.: `Hero`, `Comparison`, `ProductShowcase`). `Proof` é Server Component.
- Acessibilidade: `aria-labelledby` nas seções, `alt` nas imagens de conteúdo, `focus-visible` já global (outline `marca`).
- Todo texto visível em **pt-BR**, tom direto e voltado à conversão.

## Conteúdo do produto (o que a landing comunica)

A promessa é "transforme sua foto em retrato profissional" com prompts prontos. Todo prompt de exemplo começa com **"Mantenha o rosto da foto enviada."** e descreve câmera/lente, pose, luz, fundo e acabamento. As categorias exibidas hoje no carrossel (`ProductShowcase.tsx`: Ângulos, Poses, Luz, Efeitos) e os arquivos de `public/proof/` são **placeholders**; a taxonomia final do e-book (profissional, irreal, estilo etc.) e as imagens reais ainda precisam ser trazidas pelo dono do produto. Não invente números, depoimentos, preço ou garantias: peça os dados reais.

## Pendências e problemas conhecidos

1. **`#comprar` não existe**: o CTA do Hero e o botão "Fazer login" do Header apontam para essa âncora, mas nenhuma seção tem `id="comprar"`. O botão do Header diz "Fazer login" e deveria ir para uma rota de login.
2. **Fonte de títulos quebrada**: `globals.css` define `--font-display: var(--font-titillium)`, mas `layout.tsx` registra a variável como `--font-titillium-web`. Resultado: `font-display` cai na fonte padrão. Há ainda `--font-sans: var(--font-sans)` (autorreferência) e a fonte Karla é carregada sem uso aparente.
3. `lib/utils.ts` reexporta `cn` do pacote `cn`, não do padrão `clsx` + `tailwind-merge` que os componentes shadcn assumem; conflitos de classes Tailwind podem não ser resolvidos como esperado.
4. Faltam seções para vender: oferta/preço, categorias do e-book, FAQ, garantia, rodapé. `config/navigation.ts` tem só "Início" e não é usado.
5. Metadata mínima (`title: "LowTec"`): sem Open Graph, sem descrição de venda.
6. Nenhuma chamada à API do backend existe ainda; ao criar, defina a base URL em `NEXT_PUBLIC_API_URL` e envie `credentials: "include"` (o backend precisa liberar CORS com credenciais — ver `../CLAUDE.md`).

## Regras de trabalho

- Reutilize os componentes de `components/ui` antes de criar novos; para adicionar do shadcn/magicui use `npx shadcn@latest add <nome>` / `@magicui/<nome>` (config em `components.json`).
- Imagens de conteúdo com `next/image` e dimensões explícitas; novos assets em `public/`.
- Mantenha edições pequenas e no estilo existente (Prettier + Tailwind ordenado). Não reescreva arquivos inteiros por formatação (há aviso de CRLF/LF no Windows).
- Não mexa no bloco do `AGENTS.md`: o `next dev` o recria.
