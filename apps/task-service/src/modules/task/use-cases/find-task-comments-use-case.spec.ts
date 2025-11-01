import { beforeEach, describe, expect, it } from 'vitest'

import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'
import { UnauthorizedError } from '@/shared/errors/unauthorized-error'
import { taskCommentFakeRepo } from '@/shared/tests/fakers/task-comment-faker'
import { taskFakeRepo } from '@/shared/tests/fakers/task-faker'
import { userFakeRepo } from '@/shared/tests/fakers/user-faker'
import { InMemoryTaskCommentRepository } from '@/shared/tests/in-memory/in-memory-task-comment-repository'
import { InMemoryTaskRepository } from '@/shared/tests/in-memory/in-memory-task-repository'
import { InMemoryTaskUserRepository } from '@/shared/tests/in-memory/in-memory-task-user-repository'

import { FindTaskCommentsUseCase } from './find-task-comments-use-case'

let taskUserRepository: InMemoryTaskUserRepository
let taskRepository: InMemoryTaskRepository
let taskCommentRepository: InMemoryTaskCommentRepository
let sut: FindTaskCommentsUseCase

describe('Find Task Comments Use Case', () => {
  beforeEach(() => {
    taskUserRepository = new InMemoryTaskUserRepository()
    taskRepository = new InMemoryTaskRepository()
    taskCommentRepository = new InMemoryTaskCommentRepository()
    sut = new FindTaskCommentsUseCase(
      taskUserRepository,
      taskRepository,
      taskCommentRepository,
    )
  })

  it('should be able to find task comments', async () => {
    const user = await userFakeRepo({ repo: taskUserRepository })
    const task = await taskFakeRepo({
      creatorId: user.id,
      repo: taskRepository,
    })

    for (let i = 0; i < 5; i++) {
      await taskCommentFakeRepo({
        taskId: task.id,
        authorId: user.id,
        repo: taskCommentRepository,
      })
    }

    const result = await sut.execute({
      taskId: task.id,
      userId: user.id,
      page: 2,
      size: 3,
    })

    expect(result.comments.length).toBe(2)
    expect(result.total).toBe(5)
  })

  it('should not be able to find a task comments with non existing user', async () => {
    await expect(
      sut.execute({
        userId: 'non-existing-user-id',
        taskId: 'non-existing-task-id',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })

  it('should not be able to find a task comments a task with non existing task', async () => {
    const user = await userFakeRepo({ repo: taskUserRepository })

    await expect(
      sut.execute({
        userId: user.id,
        taskId: 'non-existing-task-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
