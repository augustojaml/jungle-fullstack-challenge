import { Controller, Delete, Param, Request, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '../jwt-auth.guard'
import { DeleteTaskUseCase } from '../use-cases/delete-task-use-case'

@Controller('/tasks')
class DeleteTaskController {
  constructor(private readonly deleteTaskUseCase: DeleteTaskUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Delete('/:taskId')
  async handle(@Request() req, @Param('taskId') taskId: string) {
    const { payload } = req.user

    return await this.deleteTaskUseCase.execute({
      userId: payload.sub,
      taskId: taskId,
    })
  }
}

export { DeleteTaskController }
