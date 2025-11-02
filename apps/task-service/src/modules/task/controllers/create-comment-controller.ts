import {
  Body,
  Controller,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'

import {
  CreateTaskCommentBodyDto,
  CreateTaskCommentParamDto,
} from '../dtos/create-task-comment-dto'
import { JwtAuthGuard } from '../jwt-auth.guard'
import { CreateTaskCommentUseCase } from '../use-cases/create-task-comment-use-case'

@Controller('/tasks/:taskId/comments')
class CreateCommentController {
  constructor(readonly createTaskCommentUseCase: CreateTaskCommentUseCase) {} // private readonly createTaskCommentUseCase: CreateTaskCommentUseCase,

  @UseGuards(JwtAuthGuard)
  @Post()
  async handle(
    @Param() params: CreateTaskCommentParamDto,
    @Body() data: CreateTaskCommentBodyDto,
    @Request() req,
  ) {
    const { payload } = req.user

    return await this.createTaskCommentUseCase.execute({
      authorId: payload.sub,
      taskId: params.taskId ?? '',
      content: data.content ?? '',
    })
  }
}

export { CreateCommentController }
