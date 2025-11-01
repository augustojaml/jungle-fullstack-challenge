import { beforeEach, describe, expect, it } from 'vitest'

import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'
import { UnauthorizedError } from '@/shared/errors/unauthorized-error'
import { taskCommentFakeRepo } from '@/shared/tests/fakers/task-comment-faker'
import { taskFakeRepo } from '@/shared/tests/fakers/task-faker'
import { userFakeRepo } from '@/shared/tests/fakers/user-faker'
import { InMemoryTaskCommentRepository } from '@/shared/tests/in-memory/in-memory-task-comment-repository'
import { InMemoryTaskRepository } from '@/shared/tests/in-memory/in-memory-task-repository'
import { InMemoryTaskUserRepository } from '@/shared/tests/in-memory/in-memory-task-user-repository'

import { UpdateTaskUseCase } from './update-task-use-case'

let taskRepository: InMemoryTaskRepository
let commentRepository: InMemoryTaskCommentRepository
let taskUserRepository: InMemoryTaskUserRepository

let sut: UpdateTaskUseCase

describe('Update Task Use Case', () => {
  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository()
    commentRepository = new InMemoryTaskCommentRepository()
    taskUserRepository = new InMemoryTaskUserRepository()
    sut = new UpdateTaskUseCase(taskRepository, taskUserRepository)
  })

  it('should be able to update a task', async () => {
    const user = await userFakeRepo({ repo: taskUserRepository })

    const task = await taskFakeRepo({
      creatorId: user.id,
      repo: taskRepository,
    })
    task.creator = user

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
      userId: user.id,
      taskId: task.id,
      title: 'updated title',
      description: 'updated description',
      dueDate: new Date(),
      priority: 'URGENT',
      status: 'DONE',
    })

    expect(result).toMatchObject({
      task: {
        id: expect.any(String),
        title: result.task.title,
        description: result.task.description,
        dueDate: result.task.dueDate,
        priority: result.task.priority,
        status: result.task.status,
        creatorId: task.creatorId,
      },
    })
  })

  it('should not be able to update a task with non existing user', async () => {
    await expect(
      sut.execute({
        userId: 'non-existing-user-id',
        taskId: 'non-existing-task-id',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })

  it('should not be able to update a task with non existing task', async () => {
    const user = await userFakeRepo({ repo: taskUserRepository })

    await expect(
      sut.execute({
        userId: user.id,
        taskId: 'non-existing-task-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
