import { beforeEach, describe, expect, it } from 'vitest'

import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'
import { UnauthorizedError } from '@/shared/errors/unauthorized-error'
import { taskFakeRepo } from '@/shared/tests/fakers/task-faker'
import { userFakeRepo } from '@/shared/tests/fakers/user-faker'
import { InMemoryTaskRepository } from '@/shared/tests/in-memory/in-memory-task-repository'
import { InMemoryTaskUserRepository } from '@/shared/tests/in-memory/in-memory-task-user-repository'

import { DeleteTaskUseCase } from './delete-task-use-case'

let taskRepository: InMemoryTaskRepository
let taskUserRepository: InMemoryTaskUserRepository

let sut: DeleteTaskUseCase

describe('Delete Task Use Case', () => {
  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository()
    taskUserRepository = new InMemoryTaskUserRepository()
    sut = new DeleteTaskUseCase(taskRepository, taskUserRepository)
  })

  it('should be able to delete a task', async () => {
    const user = await userFakeRepo({ repo: taskUserRepository })

    const task = await taskFakeRepo({
      creatorId: user.id,
      repo: taskRepository,
    })

    const result = await sut.execute({
      userId: user.id,
      taskId: task.id,
    })

    expect(result).toMatchObject({
      task: {
        id: expect.any(String),
      },
    })
  })

  it('should not be able to delete a task with non existing user', async () => {
    await expect(
      sut.execute({
        userId: 'non-existing-user-id',
        taskId: 'non-existing-task-id',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })

  it('should not be able to delete a task with non existing task', async () => {
    const user = await userFakeRepo({ repo: taskUserRepository })

    await expect(
      sut.execute({
        userId: user.id,
        taskId: 'non-existing-task-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
