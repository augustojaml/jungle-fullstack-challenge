import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'

import { UnauthorizedError } from '@/shared/errors/unauthorized-error'

import { TaskRepositoryPort } from '../contracts/task-repository-port'
import { TaskUserRepositoryPort } from '../contracts/task-user-repository.port'
import { CreateTaskResponseDto } from '../dtos/create-task-dto'
import { FindTasksDto, FindTasksResponseDto } from '../dtos/find-tasks-dto'

@Injectable()
class FindTasksUseCase {
  constructor(
    private readonly taskRepository: TaskRepositoryPort,
    private readonly taskUserRepository: TaskUserRepositoryPort,
  ) {}

  async execute(
    params: FindTasksDto,
  ): Promise<{ tasks: FindTasksResponseDto[] }> {
    const user = await this.taskUserRepository.findById(params.creatorId)

    if (!user) {
      throw new UnauthorizedError()
    }

    const taskCreated = await this.taskRepository.findByCreatorId(
      params.creatorId,
    )

    const response = taskCreated.map((task) =>
      plainToInstance(CreateTaskResponseDto, {
        id: task.id,
        ...task.props,
      }),
    )

    return {
      tasks: response,
    }
  }
}

export { FindTasksUseCase }
