import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TaskRepositoryPort } from '@/modules/task/contracts/task-repository-port'
import { TaskUserRepositoryPort } from '@/modules/task/contracts/task-user-repository.port'

import { Task } from './typeorm/entities/task'
import { TaskUser } from './typeorm/entities/task-user'
import { TypeORMTaskRepositoryAdapter } from './typeorm/repositories/TypeORMTaskRepositoryAdpter'
import { TypeORMTaskUserRepositoryAdapter } from './typeorm/repositories/TypeORMUserRepositoryAdpter'
import { typeormOptions } from './typeorm/typeorm.config'
@Module({
  imports: [
    TypeOrmModule.forRoot(typeormOptions),
    TypeOrmModule.forFeature([Task, TaskUser]),
  ],

  providers: [
    TypeORMTaskRepositoryAdapter,
    { provide: TaskRepositoryPort, useClass: TypeORMTaskRepositoryAdapter },
    TypeORMTaskUserRepositoryAdapter,
    {
      provide: TaskUserRepositoryPort,
      useClass: TypeORMTaskUserRepositoryAdapter,
    },
  ],
  exports: [TaskRepositoryPort, TaskUserRepositoryPort],
})
class PersistenceModule {}

export { PersistenceModule }
