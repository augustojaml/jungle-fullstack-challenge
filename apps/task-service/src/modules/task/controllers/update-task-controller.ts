import {
  Body,
  Controller,
  Param,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common'

import { UpdateTaskDto } from '../dtos/update-task-dto'
import { JwtAuthGuard } from '../jwt-auth.guard'
import { UpdateTaskUseCase } from '../use-cases/update-task-use-case'

@Controller('/tasks')
class UpdateTaskController {
  constructor(private readonly updateTaskUseCase: UpdateTaskUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Put('/:taskId')
  async handle(
    @Request() req,
    @Param('taskId') taskId: string,
    @Body() dto: UpdateTaskDto,
  ) {
    const { payload } = req.user

    return await this.updateTaskUseCase.execute({
      ...dto,
      userId: payload.sub,
      taskId: taskId,
    })
  }
}

export { UpdateTaskController }
