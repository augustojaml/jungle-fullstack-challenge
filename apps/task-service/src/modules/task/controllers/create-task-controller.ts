import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'

import { BrokerService } from '@/infra/broker/broker.service'

import { CreateTaskDto } from '../dtos/create-task-dto'
import { JwtAuthGuard } from '../jwt-auth.guard'
import { CreateTaskUseCase } from '../use-cases/create-task-use-case'

@Controller('/tasks')
class CreateTaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly broker: BrokerService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async handle(@Body() dto: CreateTaskDto, @Request() req) {
    const { payload } = req.user

    const task = await this.createTaskUseCase.execute({
      ...dto,
      creatorId: payload.sub,
    })

    await this.broker.publish('task:created', {
      type: 'task:created',
      title: 'New Task Created',
      payload: task,
    })

    return task
  }
}

export { CreateTaskController }
