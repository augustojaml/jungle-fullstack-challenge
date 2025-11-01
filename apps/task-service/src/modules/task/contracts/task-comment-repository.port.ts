import { TaskCommentEntity } from '../entities/task-comment-entity'

export interface FindByTaskIdProps {
  taskId: string
  page?: number
  size?: number
}

abstract class TaskCommentRepositoryPort {
  abstract create(comment: TaskCommentEntity): Promise<TaskCommentEntity>

  abstract findByTaskId(props: FindByTaskIdProps): Promise<{
    items: TaskCommentEntity[]
    total: number
    page: number
    size: number
  }>
}

export { TaskCommentRepositoryPort }
