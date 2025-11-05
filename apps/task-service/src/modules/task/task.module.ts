import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { InfraModule } from '@/infra/infra.module'

import { CreateCommentController } from './controllers/create-comment-controller'
import { CreateTaskController } from './controllers/create-task-controller'
import { DeleteTaskController } from './controllers/delete-task-controller'
import { FindTaskCommentsController } from './controllers/find-task-comments-controller'
import { FindTasksController } from './controllers/find-tasks-controller'
import { GetTaskController } from './controllers/get-task-controller'
import { UpdateTaskController } from './controllers/update-task-controller'
import { JwtStrategy } from './jwt.strategy'
import { JwtAuthGuard } from './jwt-auth.guard'
import { CreateTaskCommentUseCase } from './use-cases/create-task-comment-use-case'
import { CreateTaskUseCase } from './use-cases/create-task-use-case'
import { DeleteTaskUseCase } from './use-cases/delete-task-use-case'
import { FindTaskCommentsUseCase } from './use-cases/find-task-comments-use-case'
import { FindTasksUseCase } from './use-cases/find-tasks-use-case'
import { GetTaskUseCase } from './use-cases/get-task-use-case'
import { UpdateTaskUseCase } from './use-cases/update-task-use-case'

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'meu_segredo_super_secreto',
    }),
    InfraModule,
  ],
  controllers: [
    CreateTaskController,
    FindTasksController,
    GetTaskController,
    UpdateTaskController,
    DeleteTaskController,
    CreateCommentController,
    FindTaskCommentsController,
  ],
  providers: [
    CreateTaskUseCase,
    FindTasksUseCase,
    GetTaskUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
    CreateTaskCommentUseCase,
    FindTaskCommentsUseCase,
    JwtModule,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [JwtModule, JwtStrategy, JwtAuthGuard],
})
export class TaskModule {}
