import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '../jwt-auth.guard'
import { FindTasksUseCase } from '../use-cases/find-tasks-use-case'

@Controller('/tasks')
class FindTasksController {
  constructor(private readonly findTasksUseCase: FindTasksUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async handle(
    @Request() req,
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    const { payload } = req.user

    return await this.findTasksUseCase.execute({
      userId: payload.sub,
      page: page,
      size: size,
    })
  }
}

export { FindTasksController }
