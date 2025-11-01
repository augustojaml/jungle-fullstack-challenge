import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'

import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'
import { UnauthorizedError } from '@/shared/errors/unauthorized-error'

import { TaskRepositoryPort } from '../contracts/task-repository-port'
import { TaskUserRepositoryPort } from '../contracts/task-user-repository.port'
import { DeleteTaskDto, DeleteTaskResponseDto } from '../dtos/delete-task-dto'

@Injectable()
class DeleteTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepositoryPort,
    private readonly taskUserRepository: TaskUserRepositoryPort,
  ) {}

  async execute(
    params: DeleteTaskDto,
  ): Promise<{ task: DeleteTaskResponseDto }> {
    const user = await this.taskUserRepository.findById(params.userId)

    if (!user) {
      throw new UnauthorizedError()
    }
    const task = await this.taskRepository.getById(params.taskId)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    const deletedTask = await this.taskRepository.delete(task.id)

    const result = plainToInstance(DeleteTaskResponseDto, deletedTask, {
      excludeExtraneousValues: true,
    })

    return {
      task: result,
    }
  }
}

export { DeleteTaskUseCase }
