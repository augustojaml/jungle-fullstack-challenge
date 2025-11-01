import { beforeEach, describe, expect, it } from 'vitest'

import { UnauthorizedError } from '@/shared/errors/unauthorized-error'
import { taskFaker, taskFakeRepo } from '@/shared/tests/fakers/task-faker'
import { userFakeRepo } from '@/shared/tests/fakers/user-faker'
import { InMemoryTaskRepository } from '@/shared/tests/in-memory/in-memory-task-repository'
import { InMemoryTaskUserRepository } from '@/shared/tests/in-memory/in-memory-task-user-repository'

import { FindTasksUseCase } from './find-tasks-use-case'

let taskRepository: InMemoryTaskRepository
let taskUserRepository: InMemoryTaskUserRepository

let sut: FindTasksUseCase

describe('Find Tasks Use Case', () => {
  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository()
    taskUserRepository = new InMemoryTaskUserRepository()
    sut = new FindTasksUseCase(taskRepository, taskUserRepository)
  })

  it('should be able to find a tasks', async () => {
    const user = await userFakeRepo({ repo: taskUserRepository })

    const t1 = await taskFakeRepo({ creatorId: user.id, repo: taskRepository })
    const t2 = await taskFakeRepo({ creatorId: user.id, repo: taskRepository })
    const t3 = await taskFakeRepo({ creatorId: user.id, repo: taskRepository })

    const result = await sut.execute({
      creatorId: user.id,
    })

    const only = result.tasks.map((t) => ({
      title: t.title,
      description: t.description,
    }))

    expect(only).toEqual([
      { title: t1.title, description: t1.description },
      { title: t2.title, description: t2.description },
      { title: t3.title, description: t3.description },
    ])
  })

  it('should not be able to find a task with non existing user', async () => {
    const task = taskFaker({ creatorId: 'non-existing-user-id' })
    await expect(sut.execute(task)).rejects.toBeInstanceOf(UnauthorizedError)
  })
})
