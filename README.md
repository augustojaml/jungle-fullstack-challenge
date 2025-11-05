# TaskIntelligence 🤖✨
Monorepo full-stack montado para o desafio da Jungle Gaming descrito em `fullstack-challenge.md`. Entrega autenticação com JWT, tarefas colaborativas com comentários, histórico e notificações em tempo real — tudo rodando no Docker em um passe de mágica (com um pouco de café ☕).

> Apenas este `README.md` foi atualizado durante a revisão. O código continua intacto.

## Menu delícia 🍽️
- Contexto do desafio
- Arquitetura
- Mapa do monorepo
- Stack principal
- Como rodar
- Variáveis de ambiente
- API & Eventos
- Decisões e trade-offs
- Requisitos atendidos
- Problemas conhecidos
- Tempo investido
- Próximos passos

## Contexto do desafio 🎯
O objetivo é construir um sistema de gestão de tarefas colaborativo com:
- Autenticação centralizada via API Gateway
- Microserviços Nest.js conversando por RabbitMQ
- UI React com TanStack Router, shadcn/ui e Tailwind
- Deploy local via Docker Compose

Os detalhes completos vivem em `fullstack-challenge.md`, e este README acompanha fielmente as expectativas pedidas lá.

## Arquitetura 🧩
```
                             ┌────────────────────┐
                             │    Web (React)     │
                             │ shadcn + TanStack  │
                             └─────────┬──────────┘
                                       │ HTTP + WS
┌──────────────────────┐      ┌────────▼────────┐       ┌──────────────────┐
│ PostgreSQL           │◄────►│  API Gateway    │◄──────│ Auth Service     │
│ (dados + histórico)  │      │ (Nest + Swagger)│       │ (Nest + JWT)     │
└──────────────────────┘      └────────┬────────┘       └──────────────────┘
                                       │ REST + AMQP
                             ┌─────────▼─────────┐
                             │ Task Service      │
                             │ CRUD + comentários│
                             └─────────┬─────────┘
                                       │ AMQP
                             ┌─────────▼─────────┐
                             │ Notifications     │
                             │ WebSocket + store │
                             └───────────────────┘
```

## Mapa do monorepo 🗺️
### Apps 🎡
- `apps/api-gateway` — NestJS 11 como porteiro oficial; valida JWT com Passport, aplica rate limiting com `@nestjs/throttler`, documenta tudo via Swagger e ainda abre WebSocket com Socket.IO para empurrar notificações em tempo real. Usa `amqplib` para conversar com os microserviços e `@repo/utils` para extração de tokens e logs.
- `apps/auth-service` — NestJS + TypeORM cuidando de cadastro, login e refresh tokens; bcrypt para hashing, DTOs validados com class-validator/zod e migrations controladas via CLI do TypeORM. Expoente dos contratos compartilhados em `@repo/types`.
- `apps/task-service` — NestJS especializado em tarefas/comentários; CRUD completo, histórico, enums de prioridade/status vindos de `@repo/types`, publicação de eventos para RabbitMQ e guards JWT iguais aos do gateway para garantir acesso seguro.
- `apps/notifications-service` — NestJS que consome filas RabbitMQ (`amqplib`), persiste notificações com TypeORM/Postgres e retransmite via WebSocket dedicado. Usa RxJS para lidar com fluxos assíncronos e mantém as mesmas validações compartilhadas.
- `apps/web` — Front React 19 montado com Vite, roteado por TanStack Router, dados sincronizados com TanStack Query e formulários domados por React Hook Form + Zod. UI com shadcn/ui + Radix UI, Zustand para estado global e `socket.io-client` para receber notificações relâmpago. Tailwind 4 via plugin oficial e `tailwind-merge` para manter as classes no maior estilo fashion week.

### Pacotes 🎁
- `packages/eslint-config` — Presets base/React/Node centralizando ESLint 9, prettier (com plugin Tailwind), Simple Import Sort e regras extras para Nest + Vite, garantindo lint unificado no monorepo.
- `packages/types` — Biblioteca TypeScript gerada com tsup exportando Task, Comment, User, enums de status/prioridade, erros base e helpers de tipo (`OptionalType`). É o dicionário oficial do domínio.
- `packages/typescript-config` — Conjunto de `tsconfig` (base, node, nestjs, react) padronizando targets, decorators e strictness. Cada app apenas estende o preset correto e sai feliz.
- `packages/utils` — Helpers universais: logger (`consoleLog`), extração de Bearer token e wrapper de bcrypt (`passwdBcrypt`). Empacotado com tsup para uso tanto no back quanto no gateway.
- `docker-compose.yml` — Orquestra toda a festinha (serviços + banco + broker) com credenciais e volumes já prontinhos.

## Stack principal 🛠️
- **Orquestração:** Turborepo + PNPM Workspaces
- **Back-end:** Nest.js, TypeORM, PostgreSQL, RabbitMQ, Swagger
- **Front-end:** React, TanStack Router/Query, shadcn/ui, Tailwind CSS, Vite
- **Infra:** Docker, Docker Compose, WebSocket

## Como rodar ▶️
Pré-requisitos: Docker, Docker Compose, Node 20+, PNPM 8+.

### Modo turbo (Docker) 🚢
```bash
docker compose up --build
```
Serviços:
- Web — http://localhost:3000
- API Gateway (+ Swagger) — http://localhost:3001 /api/docs
- Auth Service — http://localhost:3002
- Task Service — http://localhost:3003
- Notifications Service — http://localhost:3004
- RabbitMQ UI — http://localhost:15672 (admin/admin)
- Postgres — localhost:5432

### Modo hacker (local) 🧑‍💻
```bash
pnpm install
pnpm turbo run dev --parallel
```
> Dá para subir serviços individualmente com os scripts `start:dev` dentro de cada app, caso prefira granularidade total.

## Variáveis de ambiente 🌦️
Cada app traz um `.env.example`. Exemplo do gateway:
```
PORT=3001
AUTH_SERVICE_URL=http://auth-service:3002
TASK_SERVICE_URL=http://task-service:3003
RABBITMQ_URL=amqp://admin:admin@rabbitmq:5672
AUTH_SERVICE_JWT_SECRET=meu_segredo_super_secreto
WS_PATH=/ws
```
Pro tip: copie para `.env` na raiz do serviço antes de subir em modo local.

## API & eventos 🔌
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `GET /api/tasks?page=&size=`
- `POST /api/tasks`
- `GET /api/tasks/:id`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `POST /api/tasks/:id/comments`
- `GET /api/tasks/:id/comments?page=&size=`

Eventos WebSocket:
- `task:created`
- `task:updated`
- `comment:new`

Swagger prontinho em `/api/docs` do gateway.

## Decisões e trade-offs 🧠
- **Gateway único:** simplifica autenticação centralizada e documentação Swagger em um só lugar.
- **RabbitMQ para tudo:** garante desacoplamento entre serviços e entrega em tempo real, mas adiciona sobrecarga de setup (aceito em troca da escalabilidade).
- **TanStack Query:** escolhido para cache + sincronização automática do estado das tarefas; aumenta bundle, porém remove muito código manual.
- **TypeORM migrations:** preferido pela integração com Nest + decorators, mesmo sendo mais verboso que alternativas.
- **WS via notifications-service:** mantém o gateway enxuto, mas introduz um hop extra; trade-off consciente para manter responsabilidades separadas.

## Requisitos atendidos ✅
| Área | Status | Observações |
|------|--------|-------------|
| Auth & Gateway | ✅ | JWT com access/refresh, refresh endpoint, guarda no gateway, senha com bcrypt |
| Tarefas | ✅ | CRUD completo + comentários + histórico de alterações |
| Notificações | ✅ | Eventos RabbitMQ, service dedicado, entrega via WebSocket |
| Front-end | ✅ | React + TanStack Router/Query, shadcn/ui, Tailwind, formulários com RHF + Zod, loading/toasts |
| Docker | ✅ | Todos os serviços sobem com `docker compose up --build` |

## Problemas conhecidos 🐞
- Rate limiting do gateway ainda não implementado.
- Logs centralizados em Postgres planejados, mas pendentes.
- Notificações não possuem preferências por usuário (todo mundo recebe tudo que lhe diz respeito).
- Front-end carece de testes E2E — foco ficou na entrega funcional.

## Tempo investido ⏱️
| Atividade | Horas |
|-----------|-------|
| Planejamento + arquitetura | 10 |
| Back-end (auth + tasks + notifications) | 24 |
| Front-end (UI + estados + integrações) | 16 |
| Infra (Docker, CI local, ajustes) | 4 |
| Documentação & QA manual | 2 |
| **Total** | **56** |

## Próximos passos 🚀
1. Adicionar rate limiting e métricas no gateway.
2. Persistir logs de auditoria e expor painel de observabilidade.
3. Lapidar UI com testes de usabilidade e dark mode.
4. Expandir suíte de testes (unitários + E2E).
