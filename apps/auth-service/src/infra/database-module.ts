import { Module } from '@nestjs/common'

import { UserRepositoryPort } from '@/modules/auth/contracts/user-repository.port'
import { InMemoryUserRepository } from '@/shared/tests/in-memory/in-memory-use-repository'

@Module({
  providers: [
    { provide: UserRepositoryPort, useClass: InMemoryUserRepository },
  ],
  exports: [UserRepositoryPort],
})
export class DatabaseModule {}
