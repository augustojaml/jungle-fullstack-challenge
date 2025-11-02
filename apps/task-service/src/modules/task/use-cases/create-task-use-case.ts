import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'

import { UnauthorizedError } from '@/shared/errors/unauthorized-error'

import { TaskRepositoryPort } from '../contracts/task-repository-port'
import { TaskUserRepositoryPort } from '../contracts/task-user-repository.port'
import { CreateTaskDto, CreateTaskResponseDto } from '../dtos/create-task-dto'
import { TaskEntity } from '../entities/task-entity'

@Injectable()
class CreateTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepositoryPort,
    private readonly taskUserRepository: TaskUserRepositoryPort,
  ) {}

  async execute(
    params: CreateTaskDto,
  ): Promise<{ task: CreateTaskResponseDto }> {
    const user = await this.taskUserRepository.findById(params.creatorId || '')

    if (!user) {
      throw new UnauthorizedError()
    }

    const assignees = await this.taskUserRepository.findByIds(
      params.assigneeIds || [],
    )

    const task = TaskEntity.create({
      title: params.title,
      description: params.description,
      dueDate: params.dueDate,
      priority: params.priority,
      status: params.status,
      creatorId: user.id,
      assignees: assignees,
    })

    const taskCreated = await this.taskRepository.create(task)

    const response = plainToInstance(CreateTaskResponseDto, {
      id: taskCreated.id,
      ...taskCreated.props,
    })
    return {
      task: response,
    }
  }
}

export { CreateTaskUseCase }
