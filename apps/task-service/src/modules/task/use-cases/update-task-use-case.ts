import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'

import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'
import { UnauthorizedError } from '@/shared/errors/unauthorized-error'

import { TaskRepositoryPort } from '../contracts/task-repository-port'
import { TaskUserRepositoryPort } from '../contracts/task-user-repository.port'
import {
  ToUpdateUserResponseDto,
  UpdateTaskDto,
  UpdateTaskResponseDto,
} from '../dtos/update-task-dto'
import { TaskEntity } from '../entities/task-entity'

@Injectable()
class UpdateTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepositoryPort,
    private readonly taskUserRepository: TaskUserRepositoryPort,
  ) {}

  async execute(
    params: UpdateTaskDto,
  ): Promise<{ task: UpdateTaskResponseDto }> {
    const user = await this.taskUserRepository.findById(params.userId || '')

    if (!user) {
      throw new UnauthorizedError()
    }
    const task = await this.taskRepository.getById(params.taskId || '')

    if (!task) {
      throw new ResourceNotFoundError()
    }

    const updatedTask = await this.taskRepository.update(
      TaskEntity.create(
        {
          title: params.title || task.title,
          description: params.description || task.description,
          dueDate: params.dueDate || task.dueDate,
          priority: params.priority || task.priority,
          status: params.status || task.status,
          creatorId: task.creatorId || task.creatorId,
        },
        task.id,
      ),
    )

    const result = plainToInstance(UpdateTaskResponseDto, {
      id: updatedTask.id,
      ...updatedTask.props,
      creator: plainToInstance(ToUpdateUserResponseDto, {
        id: updatedTask.creator?.id,
        ...updatedTask.creator?.props,
      }),
      assignees: updatedTask.assignees.map((a) => {
        return plainToInstance(ToUpdateUserResponseDto, {
          id: a.id,
          ...a.props,
        })
      }),
    })

    return {
      task: result,
    }
  }
}

export { UpdateTaskUseCase }
