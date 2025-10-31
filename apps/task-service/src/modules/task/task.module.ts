import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { CreateTaskController } from './controllers/create-task-controller'
import { FindTasksController } from './controllers/find-tasks-controller'

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'meu_segredo_super_secreto',
    }),
  ],
  controllers: [CreateTaskController, FindTasksController],
  providers: [],
  exports: [JwtModule],
})
export class TaskModule {}
