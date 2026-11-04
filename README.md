# Resolve AI

Plataforma inteligente que transforma problemas do dia a dia em planos de ação organizados e acompanháveis.

> Status: **Fase 1 — Fundação** concluída. Veja o plano completo em [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · componentes no padrão shadcn/ui · Zod · PostgreSQL + Drizzle ORM · lucide-react

## Como rodar

```bash
cp .env.example .env        # ajuste DATABASE_URL
npm install
npm run dev                 # http://localhost:3000
```

Validação:

```bash
npx next typegen
npx tsc --noEmit
npm run build
```

## Estrutura

```
src/
  app/(marketing)/      landing, /entrar, /cadastro, /comecar
  app/api/health        healthcheck (consulta o Postgres)
  components/ui         Button, Badge, Container (design system)
  components/brand      Logo
  components/layout     Header, Footer, ThemeToggle, PhaseNotice
  components/landing    Seções da landing
  config/               site.ts, categories.ts (extensível)
  features/problems     Rascunho do problema (sessionStorage)
  lib/                  env.ts (validação Zod), utils.ts
  db/                   Drizzle (schema na Fase 2/4)
docs/ARCHITECTURE.md    Arquitetura, modelo de dados, riscos, decisões
```

## Decisões técnicas

- **Tema claro/escuro** via classe `.dark` e script anti-flash no `<head>`; respeita a preferência do sistema.
- **Fontes do sistema**: o build não depende de download de fontes.
- **Categorias** centralizadas em `src/config/categories.ts`; adicionar uma nova área = adicionar uma entrada.
- **Sem simulações**: login, cadastro e IA mostram claramente em que fase serão liberados. O rascunho do problema
  fica apenas no navegador até existir conta e persistência.
