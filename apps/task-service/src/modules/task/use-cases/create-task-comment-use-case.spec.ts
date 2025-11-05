import { beforeEach, describe, expect, it } from 'vitest'

import { taskCommentFaker } from '@/shared/tests/fakers/task-comment-faker'
import { taskFakeRepo } from '@/shared/tests/fakers/task-faker'
import { userFakeRepo } from '@/shared/tests/fakers/user-faker'
import { InMemoryTaskCommentRepository } from '@/shared/tests/in-memory/in-memory-task-comment-repository'
import { InMemoryTaskRepository } from '@/shared/tests/in-memory/in-memory-task-repository'
import { InMemoryTaskUserRepository } from '@/shared/tests/in-memory/in-memory-task-user-repository'

import { CreateTaskCommentUseCase } from './create-task-comment-use-case'

let taskRepository: InMemoryTaskRepository
let taskUserRepository: InMemoryTaskUserRepository
let taskCommentRepository: InMemoryTaskCommentRepository

let sut: CreateTaskCommentUseCase

describe('Create Task Comment Use Case', () => {
  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository()
    taskUserRepository = new InMemoryTaskUserRepository()
    taskCommentRepository = new InMemoryTaskCommentRepository()
    sut = new CreateTaskCommentUseCase(
      taskUserRepository,
      taskRepository,
      taskCommentRepository,
    )
  })

  it('should be able to comment on a task', async () => {
    const user = await userFakeRepo({ repo: taskUserRepository })
    const task = await taskFakeRepo({
      creatorId: user.id,
      repo: taskRepository,
    })

    const taskComment = taskCommentFaker({ taskId: task.id, authorId: user.id })

    const result = await sut.execute(taskComment)

    expect(result).toMatchObject({
      taskComment: {
        id: expect.any(String),
        taskId: task.id,
        authorId: user.id,
        content: taskComment.content,
      },
    })
  })

  // it.skip('should not be able to comment on a task with non existing user', async () => {
  //   await expect(
  //     sut.execute({
  //       authorId: 'non-existing-user-id',
  //       taskId: 'non-existing-task-id',
  //       content: 'existing-content',
  //     }),
  //   ).rejects.toBeInstanceOf(UnauthorizedError)
  // })

  // it('should not be able to comment on a task with non existing task', async () => {
  //   const user = await userFakeRepo({ repo: taskUserRepository })

  //   await expect(
  //     sut.execute({
  //       authorId: user.id,
  //       taskId: 'non-existing-task-id',
  //       content: 'existing-content',
  //     }),
  //   ).rejects.toBeInstanceOf(ResourceNotFoundError)
  // })
})
