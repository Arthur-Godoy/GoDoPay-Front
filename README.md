# GoDoPay — Front

Interface de uma carteira digital: saldo, extrato, transferências, depósitos e estorno.

React 19 com Vite, MUI 9 e Tailwind 4.

Consome a API do repositório `godopay-backend`, que precisa estar rodando.

## Rodando

Precisa apenas de Docker. **Suba a API primeiro** (`docker compose up -d` no repositório do backend) — sem ela a tela de login não autentica.

```bash
docker compose up -d
```

Abre em http://localhost:3001.

### Usuário de teste

```
e-mail: test@example.com
senha:  123456
```

Criado pelo seed do backend, já com duas contas e um contato, o que permite testar transferência de imediato.

### Sem Docker

```bash
npm install
npm run dev         # http://localhost:3001
npm run build
npm run typecheck
```

A API é esperada em `http://localhost:8001/api` (definido em `app/hooks/useHttp.jsx`).

## Organização

```
app/
├── components/home/    componentes da Home, um diretório por bloco
├── contexts/           estado compartilhado (conta, recibo, transferência, snackbar)
├── hooks/              acesso aos contextos + cliente HTTP
├── routes/             páginas
├── services/http/      chamadas à API, uma por recurso
├── utils/              formatação, máscaras, erros
└── validators/         schemas yup
```

**Cada componente é dono da sua lógica.** Um diretório costuma ter `index.jsx` (view) e `useAlgo.jsx` (estado e efeitos). Componentes não recebem callbacks de negócio por prop quando podem consumir o contexto.

**Contextos ficam em dois arquivos:** `contexts/conta.js` exporta só a constante do contexto; `contexts/contaContext.jsx`, só o provider. Isso é necessário para o Fast Refresh — um arquivo exportando os dois quebra o hot reload.

## Dinheiro

Valores trafegam em **centavos**. Use `formatMoney` para exibir e `parseMoney` para ler o input (`utils/money.js`). Os campos mascarados ficam em `utils/masks.js`.

## Erros

O interceptor em `useHttp.jsx` já dispara a snackbar para qualquer erro da API — não trate erro localmente só para mostrar mensagem. Exceção: erros de validação (422), que vão para os campos via `applyFieldErrors`.

O mesmo interceptor renova o access token expirado e refaz a requisição; se o refresh falhar, limpa a sessão e volta para o login.

## Comandos úteis

```bash
docker compose logs -f front
docker compose restart front
docker compose down
```
