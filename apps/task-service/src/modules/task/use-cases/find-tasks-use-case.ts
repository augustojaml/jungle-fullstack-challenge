import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'

import { UnauthorizedError } from '@/shared/errors/unauthorized-error'

import { TaskRepositoryPort } from '../contracts/task-repository-port'
import { TaskUserRepositoryPort } from '../contracts/task-user-repository.port'
import {
  FindTasksDto,
  FindTasksResponseDto,
  FindTasksResponsePaginationDto,
} from '../dtos/find-tasks-dto'

@Injectable()
class FindTasksUseCase {
  constructor(
    private readonly taskRepository: TaskRepositoryPort,
    private readonly taskUserRepository: TaskUserRepositoryPort,
  ) {}

  async execute(params: FindTasksDto): Promise<FindTasksResponsePaginationDto> {
    const user = await this.taskUserRepository.findById(params.userId)

    if (!user) {
      throw new UnauthorizedError()
    }

    const filterTasks = await this.taskRepository.findByCreatorOrUserId({
      userId: params.userId,
      page: params.page,
      size: params.size,
    })

    const response = plainToInstance(
      FindTasksResponsePaginationDto,
      {
        tasks: filterTasks.items.map((c) =>
          plainToInstance(FindTasksResponseDto, {
            id: c.id,
            ...c.props,
          }),
        ),
        total: filterTasks.total,
        page: filterTasks.page,
        size: filterTasks.size,
      },
      { excludeExtraneousValues: true },
    )

    return response
  }
}

export { FindTasksUseCase }
