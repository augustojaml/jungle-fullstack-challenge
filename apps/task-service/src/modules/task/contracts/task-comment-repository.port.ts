import { TaskCommentEntity } from '../entities/task-comment-entity'

abstract class TaskCommentRepositoryPort {
  abstract create(user: TaskCommentEntity): Promise<TaskCommentEntity>
}

export { TaskCommentRepositoryPort }
