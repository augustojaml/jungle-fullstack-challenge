import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { PersistenceModule } from '@/infra/persistence/persistence.module'

import { CreateTaskController } from './controllers/create-task-controller'
import { FindTasksController } from './controllers/find-tasks-controller'
import { GetTaskController } from './controllers/get-task-controller'
import { UpdateTaskController } from './controllers/update-task-controller'
import { JwtStrategy } from './jwt.strategy'
import { JwtAuthGuard } from './jwt-auth.guard'
import { CreateTaskUseCase } from './use-cases/create-task-use-case'
import { FindTasksUseCase } from './use-cases/find-tasks-use-case'
import { GetTaskUseCase } from './use-cases/get-task-use-case'
import { UpdateTaskUseCase } from './use-cases/update-task-use-case'

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'meu_segredo_super_secreto',
    }),
    PersistenceModule,
  ],
  controllers: [
    CreateTaskController,
    FindTasksController,
    GetTaskController,
    UpdateTaskController,
  ],
  providers: [
    CreateTaskUseCase,
    FindTasksUseCase,
    GetTaskUseCase,
    UpdateTaskUseCase,
    JwtModule,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [JwtModule, JwtStrategy, JwtAuthGuard],
})
export class TaskModule {}
