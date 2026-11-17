# Produtos

## Cadastro

`POST /api/produto/create` cadastra um produto. A rota usa `adminMiddleware` e
exige o cookie `JWT_ADMIN` e o header `twoFactor`, conforme as demais rotas
administrativas do projeto.

Envie um JSON com os dados do arquivo já armazenado no R2:

```json
{
  "name": "Meu e-book",
  "valor": "99.90",
  "discount": "10.00",
  "downloadUrl": "produtos/ebook.pdf"
}
```

`discount` é opcional e assume zero. Valor e desconto aceitam números ou strings
decimais não negativos, até `99999999.99`, com no máximo duas casas decimais.
O desconto não pode superar o valor do produto.

A controller valida os dados e responde `201` com `{ message, produto }`.
O service recebe `CreateProdutoDTO` e persiste o registro usando o Prisma.
Validações respondem `400` e falhas inesperadas respondem `500` com mensagem
genérica, seguindo o padrão das outras controllers. O cadastro não faz upload.

## Download

`GET /api/produto/:produtoId/download` retorna o arquivo como anexo. O carregador
de rotas existente registra o módulo automaticamente.

O navegador envia o cookie HttpOnly `JWT_USUARIO`. O middleware valida o JWT e o
service exige uma compra do produto pertencente ao usuário autenticado, vinculada
a um pagamento do mesmo usuário com status `PAID`. Pagamentos pendentes,
cancelados, reembolsados ou com falha não liberam o download.

## Arquivo e bucket

No campo existente `Produto.downloadUrl`, prefira armazenar a chave exata do objeto,
por exemplo `produtos/ebook.pdf`. Não é necessária uma migração do banco.

Também são aceitas URLs dentro de `R2_PUBLIC_URL`; o backend extrai a chave do
caminho, respeitando o prefixo configurado e decodificando caracteres da URL.
URLs de outros servidores são rejeitadas. A URL não é acessada via HTTP.

São utilizadas as configurações existentes `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`,
`R2_SECRET_ACCESS_KEY` e `R2_BUCKET_NAME`. O token do R2 precisa de permissão de
leitura dos objetos do bucket.

Para separar os documentos dos avatares públicos, configure opcionalmente
`R2_PRODUCTS_BUCKET_NAME` com o nome de um bucket privado da mesma conta R2.
Sem essa variável, o download usa `R2_BUCKET_NAME`. A chave cadastrada no produto
deve existir no bucket escolhido, e as credenciais devem permitir sua leitura.

Mantenha o bucket dos documentos sem acesso público via domínio customizado ou
`r2.dev`. Um arquivo publicamente acessível pode ser baixado por fora desta rota.

## Resposta e integração

O backend transmite o arquivo por streaming, usando seu nome original e os headers
`Content-Disposition: attachment`, `Content-Type`, `Cache-Control: private, no-store`
e `X-Content-Type-Options: nosniff`. A conexão com o R2 é cancelada quando o cliente
interrompe o download. O arquivo inteiro não é carregado em memória.

No botão de download, utilize a URL **da API**, por exemplo
`https://api.seudominio.com/api/produto/ID_DO_PRODUTO/download`, em vez do endereço
do bucket. Uma navegação normal envia o cookie da API automaticamente, sujeita às
opções de domínio e SameSite existentes. Se usar `fetch` entre origens, informe
`credentials: "include"`; o cookie `SameSite: "strict"` exige frontend e API no mesmo
site e o CORS deve permitir a origem do frontend. A página de perfil atual ainda
usa dados mockados; este módulo implementa o fluxo do backend.

Retornos:

- `200`: conteúdo do arquivo.
- `401`: cookie ausente, inválido, expirado ou sem ID de usuário.
- `400`: parâmetro de produto inválido.
- `404`: nenhuma compra paga acessível para esse usuário e produto, ou objeto
  inexistente no R2.
- `500`: falha de configuração, banco ou armazenamento; detalhes ficam no servidor.

Se houver erro depois de iniciar o streaming, a conexão é encerrada para impedir
que uma resposta JSON seja anexada ao documento.

## Validação

Na pasta `backend`, execute `npx tsc --noEmit` para verificar a tipagem.
