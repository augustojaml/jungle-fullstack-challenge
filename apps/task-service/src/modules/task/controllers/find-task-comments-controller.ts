import {
  Controller,
  Get,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common'

import { JwtAuthGuard } from '../jwt-auth.guard'
import { FindTaskCommentsUseCase } from '../use-cases/find-task-comments-use-case'

@Controller('/tasks/:taskId/comments')
class FindTaskCommentsController {
  constructor(private readonly service: FindTaskCommentsUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async handle(
    @Request() req,
    @Param('taskId') taskId: string,
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    const { payload } = req.user

    return await this.service.execute({
      userId: payload.sub,
      taskId: taskId,
      page: page,
      size: size,
    })
  }
}

export { FindTaskCommentsController }
