import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TaskCommentRepositoryPort } from '@/modules/task/contracts/task-comment-repository.port'
import { TaskRepositoryPort } from '@/modules/task/contracts/task-repository-port'
import { TaskUserRepositoryPort } from '@/modules/task/contracts/task-user-repository.port'

import { Task } from './typeorm/entities/task'
import { TaskAssignee } from './typeorm/entities/task-assignee'
import { TaskComment } from './typeorm/entities/task-comment'
import { TaskUser } from './typeorm/entities/task-user'
import { TypeORMTaskCommentRepositoryAdapter } from './typeorm/repositories/TypeORMTaskCommentRepositoryAdpter'
import { TypeORMTaskRepositoryAdapter } from './typeorm/repositories/TypeORMTaskRepositoryAdpter'
import { TypeORMTaskUserRepositoryAdapter } from './typeorm/repositories/TypeORMUserRepositoryAdpter'
import { typeormOptions } from './typeorm/typeorm.config'
@Module({
  imports: [
    TypeOrmModule.forRoot(typeormOptions),
    TypeOrmModule.forFeature([Task, TaskUser, TaskAssignee, TaskComment]),
  ],

  providers: [
    TypeORMTaskRepositoryAdapter,
    { provide: TaskRepositoryPort, useClass: TypeORMTaskRepositoryAdapter },
    TypeORMTaskUserRepositoryAdapter,
    {
      provide: TaskUserRepositoryPort,
      useClass: TypeORMTaskUserRepositoryAdapter,
    },
    TypeORMTaskCommentRepositoryAdapter,
    {
      provide: TaskCommentRepositoryPort,
      useClass: TypeORMTaskCommentRepositoryAdapter,
    },
  ],
  exports: [
    TaskRepositoryPort,
    TaskUserRepositoryPort,
    TaskCommentRepositoryPort,
  ],
})
class PersistenceModule {}

export { PersistenceModule }
