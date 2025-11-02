import { beforeEach, describe, expect, it } from 'vitest'

import { UnauthorizedError } from '@/shared/errors/unauthorized-error'
import { taskFaker } from '@/shared/tests/fakers/task-faker'
import { userFakeRepo } from '@/shared/tests/fakers/user-faker'
import { InMemoryTaskRepository } from '@/shared/tests/in-memory/in-memory-task-repository'
import { InMemoryTaskUserRepository } from '@/shared/tests/in-memory/in-memory-task-user-repository'

import { CreateTaskUseCase } from './create-task-use-case'

let taskRepository: InMemoryTaskRepository
let taskUserRepository: InMemoryTaskUserRepository

let sut: CreateTaskUseCase

describe('Create Task Use Case', () => {
  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository()
    taskUserRepository = new InMemoryTaskUserRepository()
    sut = new CreateTaskUseCase(taskRepository, taskUserRepository)
  })

  it('should be able to create a task', async () => {
    const user = await userFakeRepo({ repo: taskUserRepository })

    const ass1 = await userFakeRepo({ repo: taskUserRepository })
    const ass2 = await userFakeRepo({ repo: taskUserRepository })

    const task = taskFaker({
      creatorId: user.id,
      assigneeIds: [ass1.id, ass2.id],
    })

    const result = await sut.execute(task)

    expect(result).toMatchObject({
      task: {
        id: expect.any(String),
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
        status: task.status,
        creatorId: task.creatorId,
      },
    })
  })

  it('should not be able to create a task with non existing user', async () => {
    const task = taskFaker({ creatorId: 'non-existing-user-id' })
    await expect(sut.execute(task)).rejects.toBeInstanceOf(UnauthorizedError)
  })
})
