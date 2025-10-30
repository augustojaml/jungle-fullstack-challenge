import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserRepositoryPort } from '@/modules/auth/contracts/user-repository.port'

import { User } from './typeorm/entities/user'
import { TypeORMUserRepositoryAdapter } from './typeorm/repositories/user-repository.adapter'
import { typeormOptions } from './typeorm/typeorm.config'
@Module({
  imports: [
    TypeOrmModule.forRoot(typeormOptions),
    TypeOrmModule.forFeature([User]),
  ],

  providers: [
    TypeORMUserRepositoryAdapter,
    { provide: UserRepositoryPort, useExisting: TypeORMUserRepositoryAdapter },
  ],
  exports: [UserRepositoryPort],
})
class PersistenceModule {}

export { PersistenceModule }
