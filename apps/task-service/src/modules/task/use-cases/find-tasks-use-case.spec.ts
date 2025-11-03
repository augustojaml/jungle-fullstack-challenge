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

  it('should be able to find tasks (paginated) and match only title/description', async () => {
    const user = await userFakeRepo({ repo: taskUserRepository })

    const t1 = await taskFakeRepo({ creatorId: user.id, repo: taskRepository })
    const t2 = await taskFakeRepo({ creatorId: user.id, repo: taskRepository })
    const t3 = await taskFakeRepo({ creatorId: user.id, repo: taskRepository })

    const resultPage1 = await sut.execute({
      userId: user.id,
      size: 2,
      page: 1,
    })

    expect(resultPage1).toMatchObject({
      total: 3,
      page: 1,
      size: 2,
    })
    expect(resultPage1.tasks).toHaveLength(2)

    const onlyPage1 = resultPage1.tasks.map((t) => ({
      title: t.title,
      description: t.description,
    }))
    expect(onlyPage1).toEqual([
      { title: t1.title, description: t1.description },
      { title: t2.title, description: t2.description },
    ])

    const resultPage2 = await sut.execute({
      userId: user.id,
      size: 2,
      page: 2,
    })

    expect(resultPage2).toMatchObject({
      total: 3,
      page: 2,
      size: 2,
    })
    expect(resultPage2.tasks).toHaveLength(1)

    const onlyPage2 = resultPage2.tasks.map((t) => ({
      title: t.title,
      description: t.description,
    }))
    expect(onlyPage2).toEqual([
      { title: t3.title, description: t3.description },
    ])
  })

  it('should not be able to find a task with non existing user', async () => {
    const task = taskFaker({ creatorId: 'non-existing-user-id' })
    await expect(
      sut.execute({
        userId: task.creatorId,
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })
})
