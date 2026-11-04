# Resolve AI — Arquitetura, Escopo e Plano de Implementação

> Documento vivo. Status atual: **Proposta aguardando aprovação** · Fase 1 (fundação visual) entregue.

---

## 1. Arquitetura recomendada

### 1.1 Visão geral

```
┌──────────────────────────────────────────────────────────────────────┐
│                         Navegador (pt-BR)                            │
│  Next.js App Router · React Server Components · Tailwind · shadcn/ui │
└───────────────┬──────────────────────────────────────┬───────────────┘
                │ Server Actions / Route Handlers      │ Upload (signed URL)
┌───────────────▼──────────────────────────────────────▼───────────────┐
│                     Camada de aplicação (Next.js server)             │
│                                                                      │
│  features/*  →  services/*  →  repositories/*  →  Drizzle ORM        │
│       │              │                                               │
│       │              ├── ai/  (abstração de provedores LLM)          │
│       │              │     ├── providers/openai.ts                   │
│       │              │     ├── providers/anthropic.ts                │
│       │              │     ├── prompts/ (versionados)                │
│       │              │     └── schemas/ (Zod → JSON estruturado)     │
│       │              ├── usage/ (cotas, custo, rate limit)           │
│       │              └── documents/ (extração PDF/imagem, saneamento) │
│       └── auth/ (sessão, autorização por usuário)                    │
└───────────────┬──────────────────────────────────────┬───────────────┘
                │                                      │
       ┌────────▼────────┐                    ┌────────▼────────┐
       │   PostgreSQL    │                    │ Object Storage  │
       │ (RLS + índices) │                    │ (bucket privado)│
       └─────────────────┘                    └─────────────────┘
```

### 1.2 Princípios

1. **Metodologia, não chat.** O assistente segue uma máquina de estados explícita:
   `intake → clarificação → análise → plano → execução → acompanhamento → encerrado`.
   Cada transição produz **saída estruturada validada por Zod**, nunca texto livre solto.
2. **Provedor de IA substituível.** Interface única `LLMProvider` com `generateText`,
   `generateStructured<T>(schema)` e `stream`. Provedor e modelo por tarefa definidos via env
   (ex.: modelo barato para classificar, modelo melhor para o plano).
3. **Nenhuma ação externa automática.** A IA apenas *propõe*; o usuário confirma.
   Não há envio de e-mail, notificações ou integrações externas sem autorização explícita.
4. **Fatos × suposições × recomendações.** O schema do plano separa esses três campos;
   a UI os exibe com estilos distintos.
5. **Isolamento por usuário em duas camadas.** Filtro por `user_id` em todo repositório
   **e** Row Level Security no Postgres (defesa em profundidade).
6. **Documentos são dados, não instruções.** Conteúdo extraído é delimitado, rotulado como
   não confiável e nunca concatenado ao prompt de sistema (mitigação de prompt injection).

### 1.3 Stack — e a decisão sobre Supabase

| Camada | Escolha | Observação |
|---|---|---|
| Frontend | Next.js 16 (App Router) + TypeScript | ✅ como solicitado |
| UI | Tailwind CSS v4 + componentes no padrão shadcn/ui | ✅ |
| Validação | Zod | ✅ |
| Banco | PostgreSQL + **Drizzle ORM** | Ambiente atual já provê Postgres + Drizzle |
| Auth | **Decisão pendente** (ver §8) | Supabase Auth *ou* Auth.js/Better Auth |
| Storage | **Decisão pendente** | Supabase Storage *ou* S3/R2 |
| IA | Camada própria multi‑provedor | OpenAI e/ou Anthropic |

**Por que propor uma alternativa ao Supabase:** o ambiente de desenvolvimento deste projeto
roda um PostgreSQL local acessado via Drizzle. Supabase *é* Postgres, então o schema Drizzle
é 100% portável. A recomendação é:

- **Desenvolvimento/MVP:** Drizzle + Postgres + auth própria (Better Auth ou Auth.js) com
  sessões no banco; RLS aplicada via `SET app.user_id` por transação.
- **Produção:** apontar `DATABASE_URL` para o Postgres do Supabase e, se desejado, migrar a
  auth para Supabase Auth — os repositórios não mudam, apenas o adaptador `auth/`.

Isso mantém tudo funcional desde o primeiro dia sem depender de credenciais externas.

---

## 2. Estrutura inicial do projeto

```
src/
├── app/                         # Rotas (App Router)
│   ├── (marketing)/             # Landing, preços, termos  [Fase 1]
│   ├── (auth)/entrar, cadastro  # Autenticação             [Fase 2]
│   ├── (app)/painel             # Dashboard                [Fase 2]
│   ├── (app)/problemas/[id]     # Página do problema       [Fase 2–4]
│   └── api/                     # Route handlers (health, upload, stream)
├── components/
│   ├── ui/                      # Primitivos (Button, Badge, Card…) estilo shadcn
│   ├── brand/                   # Logo
│   ├── layout/                  # Header, footer, theme toggle
│   └── landing/                 # Seções da landing
├── config/                      # site.ts, categories.ts, plans.ts (extensíveis)
├── features/                    # Lógica por domínio (problems, plans, chat, documents)
├── server/
│   ├── ai/                      # Abstração LLM, prompts, schemas
│   ├── auth/                    # Sessão e guards
│   ├── repositories/            # Acesso a dados (sempre escopado por userId)
│   └── usage/                   # Cotas e controle de custo
├── db/                          # schema.ts, index.ts, policies.sql
└── lib/                         # env.ts (Zod), utils.ts
docs/                            # Arquitetura, ADRs, segurança
```

Regra: **componentes não acessam o banco**; `features/` orquestra; `repositories/` é a
única camada que fala com Drizzle e exige `userId` em toda função.

---

## 3. Modelo de dados

```
users ─┬─< problems ─┬─< messages
       │             ├─< action_plans ─< steps ─< step_checklist_items
       │             ├─< documents ─< document_extractions
       │             ├─< generated_contents
       │             └─< problem_events  (histórico de mudanças)
       ├─< usage_records
       └── subscriptions (futuro)
```

| Tabela | Campos principais | Índices |
|---|---|---|
| `users` | id (uuid), name, email (unique), preferences (jsonb), plan (`free`/`pro`/`premium`), created_at | email |
| `problems` | id, user_id → users, title, description, category (text, validado por config), status (`intake`,`clarifying`,`active`,`resolved`,`archived`), priority (`low`..`urgent`), outcome, created_at, updated_at | (user_id, status), (user_id, updated_at desc) |
| `messages` | id, problem_id, user_id, role (`user`,`assistant`,`system_note`), kind (`text`,`question`,`plan_update`,`document_ref`), content, metadata (jsonb), created_at | (problem_id, created_at) |
| `action_plans` | id, problem_id, version, objective, summary, facts (jsonb), assumptions (jsonb), required_documents, missing_info, obstacles, estimated_timeline, next_action, created_at | (problem_id, version desc) |
| `steps` | id, plan_id, title, description, status (`pending`,`in_progress`,`completed`,`blocked`), position, due_date, completed_at, notes | (plan_id, position) |
| `step_checklist_items` | id, step_id, label, done, position | step_id |
| `documents` | id, user_id, problem_id, name, mime_type, size_bytes, storage_key (privado), uploaded_at, deleted_at | (user_id, problem_id) |
| `document_extractions` | id, document_id, field (`date`,`amount`,`deadline`,`party`,`summary`), value, confidence, **confirmed_by_user** (bool) | document_id |
| `generated_contents` | id, problem_id, user_id, kind (`email`,`complaint`,`request`,`checklist`,`summary`), title, body, created_at, updated_at | problem_id |
| `problem_events` | id, problem_id, actor (`user`/`assistant`), type, payload (jsonb), created_at | (problem_id, created_at) |
| `usage_records` | id, user_id, model, input_tokens, output_tokens, cost_cents, feature, created_at | (user_id, created_at) |

**Segurança no banco**
- `ON DELETE CASCADE` de `users` para tudo (direito de exclusão — LGPD).
- RLS em todas as tabelas com `user_id`: `USING (user_id = current_setting('app.user_id')::uuid)`.
  Tabelas filhas (steps etc.) validam via `EXISTS` no pai.
- Migrations geradas por `drizzle-kit generate` e versionadas no Git.

---

## 4. Telas principais

| # | Tela | Conteúdo-chave |
|---|---|---|
| 1 | **Landing** | “Qual problema você precisa resolver hoje?”, sugestões, como funciona, benefícios, demonstração |
| 2 | **Entrar / Cadastro** | E-mail + senha (e opcionalmente link mágico), aceite de termos e privacidade |
| 3 | **Painel** | Problemas ativos, próximas tarefas, pendências, progresso, botão “Novo problema” |
| 4 | **Novo problema** | Campo livre + upload; IA classifica categoria (editável) e pergunta o que falta |
| 5 | **Problema (workspace)** | Abas: *Conversa* · *Plano* · *Documentos* · *Conteúdos gerados* · *Histórico* |
| 6 | **Editor de conteúdo** | Texto editável, copiar, exportar (.txt/.pdf/.docx), aviso “não é documento oficial” |
| 7 | **Histórico** | Problemas resolvidos com resultado final, filtros por categoria |
| 8 | **Configurações** | Perfil, preferências, tema, uso do plano, exportar/excluir dados |

---

## 5. Escopo do MVP

**Inclui**
- Landing, cadastro/login, painel.
- Criação de problema com classificação automática (editável).
- Assistente com clarificação objetiva e geração de **plano estruturado** (JSON validado).
- Passos editáveis: status, reordenação, checklist, notas, prazo.
- Gerador de e-mails/reclamações/requerimentos editáveis com copiar/exportar `.txt`.
- Upload de PDF/imagem/texto (limite 10 MB) com extração de datas, valores e prazos, **confirmados pelo usuário**.
- Histórico de eventos por problema; retomada de contexto.
- Cotas por plano (Free) e registro de custo por chamada.
- Tema claro/escuro, responsivo, pt-BR.

**Fora do MVP**
- Pagamentos (apenas estrutura de `plan` + `usage_records`).
- Notificações por e-mail/push.
- App mobile nativo.
- Integrações externas (gov.br, Procon, consumidor.gov.br) — apenas links e orientação.

---

## 6. Cronograma de implementação

| Fase | Entregas | Estimativa |
|---|---|---|
| **1 — Fundação** ✅ | Estrutura, env (Zod), design system, landing, navegação, tema | 1 semana |
| **2 — Aplicação** | Auth, painel, criação de problema, página do problema, histórico | 1–2 semanas |
| **3 — IA** | Camada LLM, máquina de estados, classificação, clarificação, plano estruturado | 2 semanas |
| **4 — Persistência** | Conversas, versões de plano, eventos, edição/reordenação de passos | 1 semana |
| **5 — Recursos extras** | Upload, extração PDF/OCR, gerador de mensagens, exportação | 2 semanas |
| **6 — Comercial** | Cotas, custo, RLS auditada, testes (Vitest + Playwright), docs, deploy | 1–2 semanas |

Total estimado: **8–10 semanas** para um MVP sólido.

---

## 7. Riscos técnicos

| Risco | Impacto | Mitigação |
|---|---|---|
| Alucinação (prazos legais, valores) | Alto | Separar fatos/suposições; exigir fonte ou marcar “verifique”; avisos em temas jurídicos/médicos/financeiros |
| Prompt injection via documentos | Alto | Conteúdo delimitado e rotulado; prompt de sistema imutável; saída sempre validada por schema |
| Custo de IA descontrolado | Alto | Cotas por plano, `max_tokens`, modelo por tarefa, resumo de contexto em conversas longas |
| Vazamento entre usuários | Crítico | Repositórios exigem `userId` + RLS + testes automatizados de isolamento |
| Extração ruim de PDF escaneado | Médio | OCR via modelo multimodal; confirmação obrigatória do usuário |
| LGPD (dados pessoais e documentos) | Alto | Consentimento explícito, exclusão em cascata, logs sem PII, provedores com opção *zero data retention* |
| Dependência de um provedor LLM | Médio | Abstração `LLMProvider` + fallback configurável |

---

## 8. Decisões necessárias antes de prosseguir

1. **Autenticação:** (A) Better Auth/Auth.js no próprio Postgres — *recomendado para o MVP*;
   (B) Supabase Auth desde já (requer projeto Supabase e chaves).
2. **Storage de documentos:** Supabase Storage, Cloudflare R2 ou AWS S3 (bucket privado + URL assinada).
3. **Provedor de IA inicial:** OpenAI (`gpt-4.1-mini` / `gpt-4.1`) ou Anthropic (Claude). Recomendo
   começar com um e manter a abstração pronta para o outro.
4. **Limites do plano Free:** sugestão — 3 problemas ativos, 50 mensagens de IA/mês, sem upload.
5. **Retenção de dados:** por quanto tempo manter documentos de problemas encerrados (sugestão: 12 meses, exclusão manual a qualquer momento).
6. **Hospedagem:** Vercel + Supabase (mais simples) ou VPS/containers.
7. **Domínio, termos de uso e política de privacidade** (necessários antes do lançamento público).

---

## Registro de decisões (ADR resumido)

- **ADR-001** Drizzle ORM em vez do client Supabase para acesso a dados → portabilidade e tipagem forte.
- **ADR-002** Fontes do sistema (sem download em build) → build reprodutível e offline.
- **ADR-003** Tema via classe `.dark` + script anti-flash → sem dependências extras.
