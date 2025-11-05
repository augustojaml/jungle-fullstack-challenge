import {
  Body,
  Controller,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'

import { BrokerService } from '@/infra/broker/broker.service'

import { CreateTaskCommentParamDto } from '../dtos/create-task-comment-dto'
import { JwtAuthGuard } from '../jwt-auth.guard'
import { CreateTaskCommentUseCase } from '../use-cases/create-task-comment-use-case'

@Controller('/tasks/:taskId/comments')
class CreateCommentController {
  constructor(
    readonly createTaskCommentUseCase: CreateTaskCommentUseCase,
    private readonly broker: BrokerService,
  ) {} // private readonly createTaskCommentUseCase: CreateTaskCommentUseCase,

  @UseGuards(JwtAuthGuard)
  @Post()
  async handle(
    @Param() params: CreateTaskCommentParamDto,
    @Body() data: { content: string; assigneeIds?: string[] },
    @Request() req,
  ) {
    const { payload } = req.user

    const comment = await this.createTaskCommentUseCase.execute({
      authorId: payload.sub,
      taskId: params.taskId ?? '',
      content: data.content ?? '',
    })

    await this.broker.publish('comment:new', {
      type: 'comment:new',
      title: 'New Task Comment Created',
      payload: { comment: comment.taskComment, assigneeIds: data.assigneeIds },
    })

    return comment
  }
}

export { CreateCommentController }
