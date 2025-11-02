import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '../jwt-auth.guard'
import { GetTaskUseCase } from '../use-cases/get-task-use-case'

@Controller('/tasks')
class GetTaskController {
  constructor(private readonly getTaskUseCase: GetTaskUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:taskId')
  async handle(@Request() req, @Param('taskId') taskId: string) {
    const { payload } = req.user

    return await this.getTaskUseCase.execute({
      creatorId: payload.sub,
      taskId: taskId,
    })
  }
}

export { GetTaskController }
