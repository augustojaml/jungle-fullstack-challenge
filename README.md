# TaskIntelligence – Monorepo Full‑stack 🚀
Um monorepo (Turborepo) com um sistema de gestão de tarefas colaborativo: autenticação, CRUD de tarefas, comentários, eventos em tempo real e documentação via Swagger.
O foco foi entregar um app funcional, dockerizado, com Gateway HTTP, microserviços Nest e um front em React.

Swagger do Gateway: http://localhost:3001/api/docs

> Este README documenta o projeto sem modificar o código existente.

## Índice
- Visão Geral
- Jornada de Desenvolvimento
- Arquitetura e Pastas
- Como Rodar
- Variáveis de Ambiente
- Migrações
- Fluxos Principais
- Rotas e Swagger
- Dicas & Desafios
- Próximos Passos

## Visão Geral
Monorepo com Turborepo + PNPM Workspaces.
Back-end em Nest.js: api-gateway, auth-service, task-service, notifications-service.
Mensageria com RabbitMQ; Gateway consolida HTTP e expõe Swagger.
Front-end em React (Vite) consumindo o Gateway e ouvindo WebSocket.
Infra com Docker Compose: Postgres, RabbitMQ, serviços e web.

## Jornada de Desenvolvimento 🧭
Primeiramente criei um Turborepo.
Depois adicionei um projeto Next.js e um projeto Vite React para testar as configurações do Docker e Docker Compose.
Comecei criando o auth-service relacionado a testes para formatar os dados de saída; após isso fui desenvolvendo o app.
Implementei o API Gateway (HTTP + Swagger + WebSocket), segui com o task-service e integrações via RabbitMQ.
Finalizei com notifications-service para entregar eventos em tempo real no front.

## Arquitetura e Pastas 🧩
apps/api-gateway: Porta de entrada HTTP + Swagger + WebSocket; roteia para serviços e valida JWT.
apps/auth-service: Registro, login, refresh (Nest + TypeORM/Postgres).
apps/task-service: CRUD de tarefas e comentários; publica eventos via RabbitMQ.
apps/notifications-service: Consome eventos e emite via WebSocket.
apps/web: Front em React (Vite) com TanStack Router, shadcn/ui e Tailwind.
packages/*: Tipos compartilhados, utils, configs de ESLint e TS.
docker-compose.yml: Orquestra serviços + Postgres + RabbitMQ.
fullstack-challenge.md: Contexto e requisitos do desafio.

## 🖥️ Demonstração

### 🔐 Login

![Tela de Login](signin.png)

### ⚡ Registro

![Tela de Leilão](register.png)

### 📋 Detalhes da Tarefa

![Tela de Detalhes](task-detail.png)

### 🎛️ Usuário iniciado

![Usuário iniciado](notask.png)


## Como Rodar 🏁
Requisitos: Node 20+, PNPM, Docker e Docker Compose.

### Opção 1 — Tudo com Docker (recomendado)
docker compose up --build

Serviços
- Web: http://localhost:3000
- API Gateway: http://localhost:3001 (Swagger em /api/docs)
- Auth: http://localhost:3002
- Tasks: http://localhost:3003
- Notifications: http://localhost:3004
- RabbitMQ UI: http://localhost:15672 (admin/admin)
- Postgres: localhost (line 5432)

### Opção 2 — Local com PNPM (serviços individuais)
pnpm i
Em cada app, rodar conforme package.json (ex.: pnpm start:dev).

## Variáveis de Ambiente 🔐
API Gateway:
PORT=3001
AUTH_SERVICE_URL=http://auth-service (3002)
TASK_SERVICE_URL=http://task-service (3003)
RABBITMQ_URL=amqp://admin:admin@rabbitmq (5672)
AUTH_SERVICE_JWT_SECRET=meu_segredo_super_secreto
WS_PATH=/ws

## Migrações 🧱
Criar migration:
pnpm migration:create src/infra/persistence/typeorm/migrations/create-comments
Rodar migrations (dev):
pnpm migration:run
Produção (compose):
Cada serviço roda pnpm migration:run:prod antes de iniciar.

## Fluxos Principais 🔄
Autenticação: Registro, Login (JWT), Refresh.
Gateway: expõe Swagger, valida JWT nas rotas.
Tarefas: CRUD + comentários + eventos RabbitMQ.
Notificações: Eventos → WebSocket.
Web: WS + consumo do Gateway.

## Rotas e Swagger 📚
Swagger do Gateway: http://localhost:3001/api/docs

- Endpoints principais:
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh
- GET /api/tasks
- POST /api/tasks
- GET /api/tasks/:id
- PUT /api/tasks/:id
- DELETE /api/tasks/:id
- POST /api/tasks/:id/comments
- GET /api/tasks/:id/comments

# O que foi feito

### 🛠️ Front-end (exigências)
- [x] React.js com TanStack Router.
- [x] UI: mínimo 5 componentes com shadcn/ui + Tailwind CSS.
- [x] Páginas obrigatórias:
   - [x] Login/Register com validação (Pode ser um modal)
   - [x] Lista de tarefas com filtros e busca
   - [x] Detalhe da tarefa com comentários
- [x] Estado: Context API ou Zustand para auth.
- [x] WebSocket: conexão para notificações em tempo real.
- [x] Validação: `react-hook-form` + `zod`.
- [x] Loading/Error: Skeleton loaders (shimmer effect) e toast notifications.
- [x] Diferencial: TanStack Query.

### 🛠️ Back-end (exigências)
- [x] Nest.js com TypeORM (PostgreSQL).
- [x] JWT com Guards e estratégias Passport.
- [x] Swagger completo no Gateway (`/api/docs`).
- [x] DTOs com `class-validator` e `class-transformer`.
- [x] Microserviços Nest.js com RabbitMQ.
- [x] WebSocket Gateway para eventos real-time.
- [x] Migrations com TypeORM.
- [ ] Rate limiting no API Gateway (10 req/seg).
- [ ] Salvar logs no PostgreSQL.


## Dicas & Desafios 💡
Docker Compose multi-serviços foi o primeiro desafio.
Swagger no Gateway elevou a DX.
RabbitMQ trouxe realtime.

## Próximos Passos 🚧
Segurança, observabilidade, testes e2e, refinamento UI/UX.
