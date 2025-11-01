import { faker } from '@faker-js/faker'

import { TaskCommentRepositoryPort } from '@/modules/task/contracts/task-comment-repository.port'
import { TaskCommentEntity } from '@/modules/task/entities/task-comment-entity'

type TaskCommentFakePrams = {
  taskId: string
  authorId: string
}

/**
taskId: string
  authorId: string
  author: TaskUserEntity
  content: string
 */

const taskCommentFaker = ({ taskId, authorId }: TaskCommentFakePrams) => {
  return {
    taskId: taskId,
    authorId: authorId,
    content: faker.lorem.paragraph(),
  }
}

type TaskCommentFakeRepoPrams = {
  taskId: string
  authorId: string
  repo: TaskCommentRepositoryPort
}

const taskCommentFakeRepo = ({
  taskId,
  authorId,
  repo,
}: TaskCommentFakeRepoPrams) => {
  const comment = taskCommentFaker({ taskId, authorId })
  return repo.create(TaskCommentEntity.create(comment))
}

export { taskCommentFaker, taskCommentFakeRepo }
