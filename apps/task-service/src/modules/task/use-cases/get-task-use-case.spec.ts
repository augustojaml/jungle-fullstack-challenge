import { beforeEach, describe, expect, it } from 'vitest'

import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'
import { UnauthorizedError } from '@/shared/errors/unauthorized-error'
import { taskCommentFakeRepo } from '@/shared/tests/fakers/task-comment-faker'
import { taskFakeRepo } from '@/shared/tests/fakers/task-faker'
import { userFakeRepo } from '@/shared/tests/fakers/user-faker'
import { InMemoryTaskCommentRepository } from '@/shared/tests/in-memory/in-memory-task-comment-repository'
import { InMemoryTaskRepository } from '@/shared/tests/in-memory/in-memory-task-repository'
import { InMemoryTaskUserRepository } from '@/shared/tests/in-memory/in-memory-task-user-repository'

import { GetTaskUseCase } from './get-task-use-case'

let taskRepository: InMemoryTaskRepository
let commentRepository: InMemoryTaskCommentRepository
let taskUserRepository: InMemoryTaskUserRepository

let sut: GetTaskUseCase

describe('Get Task Use Case', () => {
  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository()
    commentRepository = new InMemoryTaskCommentRepository()
    taskUserRepository = new InMemoryTaskUserRepository()
    sut = new GetTaskUseCase(taskRepository, taskUserRepository)
  })

  it('should be able to get a task', async () => {
    const creator = await userFakeRepo({ repo: taskUserRepository })

    const task = await taskFakeRepo({
      creatorId: creator.id,
      repo: taskRepository,
    })
    task.creator = creator

    const assign1 = await userFakeRepo({
      repo: taskUserRepository,
    })
    const assign2 = await userFakeRepo({
      repo: taskUserRepository,
    })

    task.assignees.push(assign1, assign2)

    const comment1 = await taskCommentFakeRepo({
      taskId: task.id,
      authorId: assign1.id,
      repo: commentRepository,
    })

    const comment2 = await taskCommentFakeRepo({
      taskId: task.id,
      authorId: assign2.id,
      repo: commentRepository,
    })

    task.comments.push(comment1, comment2)

    const result = await sut.execute({
      creatorId: creator.id,
      taskId: task.id,
    })

    expect(result).toMatchObject({
      task: {
        id: expect.any(String),
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
        status: task.status,
        creatorId: task.creatorId,
        creator: result.task.creator,
        comments: result.task.comments,
        assignees: result.task.assignees,
      },
    })
  })

  it('should not be able to create a task with non existing user', async () => {
    await expect(
      sut.execute({
        creatorId: 'non-existing-user-id',
        taskId: 'non-existing-task-id',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })

  it('should not be able to create a task with non existing task', async () => {
    const user = await userFakeRepo({ repo: taskUserRepository })

    await expect(
      sut.execute({
        creatorId: user.id,
        taskId: 'non-existing-task-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
