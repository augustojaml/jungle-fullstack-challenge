import { faker } from '@faker-js/faker'

import { TaskCommentRepositoryPort } from '@/modules/task/contracts/task-comment-repository.port'
import { TaskCommentEntity } from '@/modules/task/entities/task-comment-entity'
import { TaskUserEntity } from '@/modules/task/entities/task-users-entity'

type TaskCommentFakePrams = {
  taskId: string
  authorId: string
  author?: TaskUserEntity
}

/**
taskId: string
  authorId: string
  author: TaskUserEntity
  content: string
 */

const taskCommentFaker = ({
  taskId,
  authorId,
  author,
}: TaskCommentFakePrams) => {
  return {
    taskId,
    authorId,
    author,
    content: faker.lorem.paragraph(),
  }
}

type TaskCommentFakeRepoPrams = {
  taskId: string
  authorId: string
  author?: TaskUserEntity
  repo: TaskCommentRepositoryPort
}

const taskCommentFakeRepo = ({
  taskId,
  authorId,
  author,
  repo,
}: TaskCommentFakeRepoPrams) => {
  const comment = taskCommentFaker({ taskId, authorId, author })
  return repo.create(TaskCommentEntity.create(comment))
}

export { taskCommentFaker, taskCommentFakeRepo }
