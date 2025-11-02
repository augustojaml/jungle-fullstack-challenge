import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'

import { CreateTaskDto } from '../dtos/create-task-dto'
import { JwtAuthGuard } from '../jwt-auth.guard'
import { CreateTaskUseCase } from '../use-cases/create-task-use-case'

@Controller('/tasks')
class CreateTaskController {
  constructor(private readonly createTaskUseCase: CreateTaskUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async handle(@Body() dto: CreateTaskDto, @Request() req) {
    const { payload } = req.user
    return await this.createTaskUseCase.execute({
      ...dto,
      creatorId: payload.sub,
    })
  }
}

export { CreateTaskController }
