import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'

import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'
import { UnauthorizedError } from '@/shared/errors/unauthorized-error'

import { TaskCommentRepositoryPort } from '../contracts/task-comment-repository.port'
import { TaskRepositoryPort } from '../contracts/task-repository-port'
import { TaskUserRepositoryPort } from '../contracts/task-user-repository.port'
import {
  CreateTaskCommentDto,
  CreateTaskCommentResponseDto,
  ToCommentTaskUserResponseDto,
} from '../dtos/create-task-comment-dto'
import { TaskCommentEntity } from '../entities/task-comment-entity'

@Injectable()
class CreateTaskCommentUseCase {
  constructor(
    private readonly taskUserRepository: TaskUserRepositoryPort,
    private readonly taskRepository: TaskRepositoryPort,
    private readonly taskCommentRepository: TaskCommentRepositoryPort,
  ) {}

  //{ taskComment: CreateTaskCommentResponseDto }
  async execute(
    params: CreateTaskCommentDto,
  ): Promise<{ taskComment: CreateTaskCommentResponseDto }> {
    const user = await this.taskUserRepository.findById(params.authorId)

    if (!user) {
      throw new UnauthorizedError()
    }

    const task = await this.taskRepository.getById(params.taskId)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    const comment = TaskCommentEntity.create({
      taskId: task.id,
      authorId: user.id,
      content: params.content,
    })

    const taskCommentCreated = await this.taskCommentRepository.create(comment)

    const response = plainToInstance(CreateTaskCommentResponseDto, {
      id: taskCommentCreated.id,
      ...taskCommentCreated.props,
      author: plainToInstance(ToCommentTaskUserResponseDto, {
        id: taskCommentCreated.author?.id,
        name: taskCommentCreated.author?.name,
        email: taskCommentCreated.author?.email,
        avatarUrl: taskCommentCreated.author?.avatarUrl,
      }),
    })

    return {
      taskComment: response,
    }
  }
}

export { CreateTaskCommentUseCase }
