import {
  Body,
  Controller,
  Param,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common'

import { BrokerService } from '@/infra/broker/broker.service'

import { UpdateTaskDto } from '../dtos/update-task-dto'
import { JwtAuthGuard } from '../jwt-auth.guard'
import { UpdateTaskUseCase } from '../use-cases/update-task-use-case'

@Controller('/tasks')
class UpdateTaskController {
  constructor(
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly broker: BrokerService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Put('/:taskId')
  async handle(
    @Request() req,
    @Param('taskId') taskId: string,
    @Body() dto: UpdateTaskDto,
  ) {
    const { payload } = req.user

    const task = await this.updateTaskUseCase.execute({
      ...dto,
      userId: payload.sub,
      taskId: taskId,
    })
    await this.broker.publish('task:updated', {
      type: 'task:updated',
      title: 'Task Updated',
      payload: task,
    })

    return task
  }
}

export { UpdateTaskController }
