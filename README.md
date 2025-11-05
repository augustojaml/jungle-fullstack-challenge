# TaskIntelligence – Monorepo Full-stack 🚀
Monorepo estruturado com Turborepo para suportar um ecossistema completo de gestão colaborativa de tarefas. O conjunto entrega autenticação, CRUD de tarefas e comentários, eventos em tempo real e documentação via Swagger — tudo dockerizado para facilitar a execução local.

> Esta revisão atualiza apenas a documentação. Nenhum arquivo de código foi alterado.

## Sumário
- Visão Geral
- Tecnologias Principais
- Estrutura do Repositório
- Demonstração
- Como Rodar
- Variáveis de Ambiente
- Migrações
- Fluxos Principais
- Rotas de API
- Requisitos Atendidos
- Dicas & Desafios
- Próximos Passos
- Tempo Investido

## Visão Geral
- Monorepo com Turborepo + PNPM Workspaces compartilhando pacotes e scripts.
- Back-end distribuído em microserviços Nest.js: `api-gateway`, `auth-service`, `task-service` e `notifications-service`.
- Mensageria com RabbitMQ para orquestrar eventos assíncronos e WebSocket.
- Front-end em React (Vite) consumindo o Gateway e assinando notificações.
- Infra via Docker Compose: Postgres, RabbitMQ, serviços e web.

Swagger do Gateway: http://localhost:3001/api/docs

## Tecnologias Principais
- **Orquestração**: Turborepo, PNPM
- **Back-end**: Nest.js, TypeORM, PostgreSQL, RabbitMQ, Swagger
- **Front-end**: React, Vite, TanStack Router, TanStack Query, shadcn/ui, Tailwind CSS
- **Infraestrutura**: Docker, Docker Compose, WebSocket

## Estrutura do Repositório
- `apps/api-gateway`: Porta de entrada HTTP + Swagger + WebSocket; valida JWT e rotea para os serviços.
- `apps/auth-service`: Registro, login e refresh token (Nest.js + TypeORM/Postgres).
- `apps/task-service`: CRUD de tarefas/comentários e publicação de eventos RabbitMQ.
- `apps/notifications-service`: Consome eventos e entrega ao front via WebSocket.
- `apps/web`: Front React (Vite) com layout shadcn/ui e Tailwind.
- `packages/*`: Tipos, utilitários e configurações compartilhadas (ex.: `eslint-config` com ESLint/Prettier, `typescript-config`, `types`, `utils`).
- `docker-compose.yml`: Orquestração de serviços, banco e mensageria.
- `fullstack-challenge.md`: Contexto e requisitos do desafio original.

## Demonstração

### 🔐 Login
![Tela de Login](signin.png)

### ⚡ Registro
![Tela de Registro](register.png)

### 📋 Detalhes da Tarefa
![Tela de Detalhes](task-detail.png)

### 🎛️ Usuário sem tarefas
![Usuário sem tarefas](notask.png)

## Como Rodar
**Pré-requisitos**: Node 20+, PNPM, Docker e Docker Compose.

### Opção 1 — Docker (recomendado)
```bash
docker compose up --build
```

Serviços disponíveis:
- Web: http://localhost:3000
- API Gateway: http://localhost:3001 (Swagger em `/api/docs`)
- Auth: http://localhost:3002
- Tasks: http://localhost:3003
- Notifications: http://localhost:3004
- RabbitMQ UI: http://localhost:15672 (admin/admin)
- Postgres: localhost:5432

### Opção 2 — Execução local com PNPM
```bash
pnpm install
```
Depois, em cada app, execute o script correspondente (ex.: `pnpm start:dev`) conforme definido no `package.json`.

## Variáveis de Ambiente
Exemplo de configuração para o API Gateway:
```
PORT=3001
AUTH_SERVICE_URL=http://auth-service:3002
TASK_SERVICE_URL=http://task-service:3003
RABBITMQ_URL=amqp://admin:admin@rabbitmq:5672
AUTH_SERVICE_JWT_SECRET=meu_segredo_super_secreto
WS_PATH=/ws
```

Cada serviço possui seu próprio `.env.example` (quando aplicável) para orientar a configuração.

## Migrações
- Criar migration (exemplo no task-service):
  ```bash
  pnpm migration:create src/infra/persistence/typeorm/migrations/create-comments
  ```
- Executar em desenvolvimento:
  ```bash
  pnpm migration:run
  ```
- Produção (Docker): cada serviço executa `pnpm migration:run:prod` antes de iniciar.

## Fluxos Principais
- **Autenticação**: Cadastro, login com JWT e refresh token.
- **Gateway**: Centraliza rotas, valida JWT e expõe Swagger.
- **Tarefas**: CRUD completo, comentários e eventos RabbitMQ.
- **Notificações**: Consumo de eventos e emissão em WebSocket.
- **Web**: Consome REST + WebSocket, gerencia estado com TanStack Query.

## Rotas de API (Gateway)
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `GET /api/tasks`
- `POST /api/tasks`
- `GET /api/tasks/:id`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `POST /api/tasks/:id/comments`
- `GET /api/tasks/:id/comments`

## Requisitos Atendidos

### Front-end
- [x] React com TanStack Router
- [x] Interface com shadcn/ui e Tailwind (mínimo 5 componentes reutilizáveis)
- [x] Páginas: Login/Registro, lista de tarefas (com filtros/busca) e detalhes com comentários
- [x] Autenticação com Context API/Zustand
- [x] Notificações em tempo real via WebSocket
- [x] Formulários com `react-hook-form` + `zod`
- [x] Feedback de loading/erro (skeletons e toasts)
- [x] Diferencial: TanStack Query

### Back-end
- [x] Nest.js com TypeORM (PostgreSQL)
- [x] JWT com Guards e Passport
- [x] Swagger completo no Gateway (`/api/docs`)
- [x] DTOs com `class-validator` e `class-transformer`
- [x] Microserviços Nest.js com RabbitMQ
- [x] WebSocket Gateway para eventos em tempo real
- [x] Migrations gerenciadas pelo TypeORM
- [ ] Rate limiting no API Gateway (meta futura)
- [ ] Persistir logs no PostgreSQL (meta futura)

## Dicas & Desafios
- Configurar o Docker Compose multi-serviços foi o maior desafio inicial.
- Consolidar o Swagger no Gateway elevou a experiência de integração.
- RabbitMQ permitiu entregar notificações realmente em tempo real.

## Próximos Passos
- Implementar rate limiting (10 req/s) no Gateway.
- Persistir logs de auditoria no PostgreSQL.
- Refatorar detalhes visuais do front.

## Tempo Investido
Foram 14 dias dedicados (~4h/dia), totalizando aproximadamente **56 horas** de desenvolvimento.
