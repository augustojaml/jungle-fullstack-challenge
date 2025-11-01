import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'

import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'
import { UnauthorizedError } from '@/shared/errors/unauthorized-error'

import { TaskCommentRepositoryPort } from '../contracts/task-comment-repository.port'
import { TaskRepositoryPort } from '../contracts/task-repository-port'
import { TaskUserRepositoryPort } from '../contracts/task-user-repository.port'
import {
  FindTaskCommentDto,
  FindTaskCommentsDto,
  FindTaskCommentsResponseDto,
} from '../dtos/find-task-comment-dto'

@Injectable()
class FindTaskCommentsUseCase {
  constructor(
    private readonly taskUserRepository: TaskUserRepositoryPort,
    private readonly taskRepository: TaskRepositoryPort,
    private readonly taskCommentRepository: TaskCommentRepositoryPort,
  ) {}

  async execute({
    userId,
    taskId,
    page = 1,
    size = 10,
  }: FindTaskCommentsDto): Promise<FindTaskCommentsResponseDto> {
    const user = await this.taskUserRepository.findById(userId)

    if (!user) {
      throw new UnauthorizedError()
    }

    const task = await this.taskRepository.getById(taskId)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    const taskComment = await this.taskCommentRepository.findByTaskId({
      taskId: task.id,
      page,
      size,
    })

    const response = plainToInstance(
      FindTaskCommentsResponseDto,
      {
        comments: taskComment.items.map((c) =>
          plainToInstance(FindTaskCommentDto, {
            id: c.id,
            ...c.props,
          }),
        ),
        total: taskComment.total,
        page: taskComment.page,
        size: taskComment.size,
      },
      { excludeExtraneousValues: true },
    )

    return response
  }
}

export { FindTaskCommentsUseCase }
