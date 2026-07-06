# Pokedex Inteligente 

Pokedex desenvolvida como desafio técnico para a vaga de Estágio em Engenharia de Software na **levva**. Permite listar e buscar Pokémon, visualizar seus detalhes (tipo, altura, peso, status base) e conversar com uma IA que responde perguntas específicas sobre o Pokémon selecionado.

## Funcionalidades

- Listagem dos primeiros 20 Pokémon, consumindo a [PokéAPI](https://pokeapi.co/)
- Busca por nome ou número, redirecionando direto para a página de detalhes
- Página de detalhes com design temático de acordo com o tipo do Pokémon (cores, badges, barras de status)
- Chat com IA (via OpenRouter) para tirar dúvidas sobre o Pokémon selecionado — ex: "quais as fraquezas dele?"
- Tratamento de erro para buscas de Pokémon inexistentes

## Tecnologias

| Tecnologia | Uso |
|---|---|
| [Next.js](https://nextjs.org/) (App Router) | Framework fullstack — frontend e backend (API Routes) em um único projeto |
| TypeScript | Tipagem estática, evitando erros comuns em tempo de desenvolvimento |
| Tailwind CSS | Estilização utilitária, agilizando a criação de um layout responsivo |
| [PokéAPI](https://pokeapi.co/) | Fonte de dados dos Pokémon |
| [OpenRouter](https://openrouter.ai/) | Acesso ao modelo de linguagem (LLM) usado no chat |

## Decisões técnicas

- **Server Components para busca de dados**: as páginas de listagem e detalhes buscam dados diretamente no servidor (usando `async/await` nos próprios componentes), sem necessidade de `useEffect`/`useState` no cliente. Isso simplifica o código e melhora a performance inicial de carregamento.
- **API Route para a chamada de IA**: a chamada ao OpenRouter acontece em uma API Route (`app/api/chat/route.ts`), nunca diretamente no navegador. Isso mantém a chave de API em segurança no servidor, nunca exposta ao cliente.
- **Contexto dinâmico no prompt**: a cada pergunta, o backend monta um `system prompt` incluindo nome, tipo(s) e status base do Pokémon selecionado, garantindo que a IA responda especificamente sobre aquele Pokémon, e não de forma genérica.
- **Tratamento de erro com `notFound()`**: buscas por Pokémon inexistentes (ID ou nome inválido) são tratadas com a função `notFound()` do Next.js, exibindo uma página customizada em vez de um erro técnico.

## Configuração da IA (OpenRouter)

Este projeto usa a API do OpenRouter para o chat com IA. Para rodar localmente, configure sua própria chave (gratuita, sem necessidade de cartão de crédito):

1. Crie uma conta em [openrouter.ai](https://openrouter.ai/)
2. Acesse [openrouter.ai/settings/keys](https://openrouter.ai/settings/keys) e clique em "Create Key"
3. Copie a chave gerada e adicione no `.env.local` (veja o passo a passo abaixo)

**Nota:** o modelo configurado por padrão no projeto (`openai/gpt-oss-120b`) é pago, mas com custo bem baixo por requisição. Se preferir usar um modelo gratuito, basta trocar o valor do campo `model` em `app/api/chat/route.ts` por qualquer modelo com sufixo `:free` do [catálogo do OpenRouter](https://openrouter.ai/models).

## Como rodar localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado (versão 18 ou superior)

### Passo a passo

1. Clone o repositório:
```bash
git clone https://github.com/giovannamsilva/pokedex.git
cd pokedex
```

2. Instale as dependências:
```bash
npm install
```

3. Crie o arquivo de variáveis de ambiente a partir do exemplo:
```bash
cp .env.example .env.local
```
(No Windows, se o comando `cp` não funcionar, basta duplicar o arquivo `.env.example` manualmente e renomear a cópia para `.env.local`)

4. Abra o `.env.local` e adicione sua chave do OpenRouter:
OPENROUTER_API_KEY=sua_chave_aqui

5. Rode o servidor de desenvolvimento:
```bash
npm run dev
```

6. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Estrutura de pastas

```
app/
├── api/
│   └── chat/
│       └── route.ts          # API Route que se comunica com o OpenRouter
├── lib/
│   └── typeColors.ts         # Mapa de cores por tipo de Pokémon
├── pokemon/
│   └── [id]/
│       ├── page.tsx          # Página de detalhes do Pokémon
│       ├── ChatWithPokemon.tsx  # Componente de chat com IA
│       └── not-found.tsx     # Página exibida quando o Pokémon não existe
├── page.tsx                  # Página inicial (listagem + busca)
└── SearchPokemon.tsx          # Componente de busca por nome/número
```

## Autor

Giovanna Moreira Silva
- GitHub: @giovannamsilva (https://github.com/giovannamsilva)
- LinkedIn: https://www.linkedin.com/in/giovannamsilva/
- Email: gigi_moreirasilva@outlook.com
