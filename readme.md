modules/
  └─ users/
      ├─ application/       <-- use-cases (casos de uso) / services
      │     ├─ create-user.usecase.ts
      │     ├─ get-user.usecase.ts
      │     └─ index.ts
      ├─ domain/            <-- regras puras: entidades, value objects, interfaces
      │     ├─ user.entity.ts
      │     ├─ user.repository.ts (interface)
      │     └─ events/ ...
      ├─ infra/             <-- adapters / implementação concreta
      │     ├─ prisma-user.repository.ts  (implements UserRepository)
      │     └─ controllers/
      │            └─ users.controller.ts
      └─ users.module.ts


shared/
  ├─ utils/
  ├─ errors/
  ├─ decorators/
  ├─ validators/
  ├─ auth/
  └─ dtos/

infra/
  ├─ http/      <-- filters, pipes, interceptors globais
  ├─ database/  <-- orm configs, prisma service, migrations
  ├─ cache/     <-- redis
  ├─ queues/    <-- bull, rabbit
  ├─ logger/
  └─ mailer/


pnpm turbo run test:unit --filter=@repo/auth-services


### tasks

- [ ] => Test if password has encrypted
