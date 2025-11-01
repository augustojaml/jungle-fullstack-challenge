import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'

import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'
import { UnauthorizedError } from '@/shared/errors/unauthorized-error'

import { TaskRepositoryPort } from '../contracts/task-repository-port'
import { TaskUserRepositoryPort } from '../contracts/task-user-repository.port'
import { GetTaskDto, GetTaskResponseDto } from '../dtos/get-task-dto'

@Injectable()
class GetTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepositoryPort,
    private readonly taskUserRepository: TaskUserRepositoryPort,
  ) {}

  async execute(params: GetTaskDto): Promise<{ task: GetTaskResponseDto }> {
    const user = await this.taskUserRepository.findById(params.creatorId)

    if (!user) {
      throw new UnauthorizedError()
    }
    const task = await this.taskRepository.getById(params.taskId)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    const result = plainToInstance(GetTaskResponseDto, task, {
      excludeExtraneousValues: true,
    })

    return {
      task: result,
    }
  }
}

export { GetTaskUseCase }
