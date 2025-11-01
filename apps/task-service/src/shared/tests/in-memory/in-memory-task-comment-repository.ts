import {
  FindByTaskIdProps,
  TaskCommentRepositoryPort,
} from '@/modules/task/contracts/task-comment-repository.port'
import { TaskCommentEntity } from '@/modules/task/entities/task-comment-entity'

class InMemoryTaskCommentRepository implements TaskCommentRepositoryPort {
  public TaskComments: TaskCommentEntity[] = []

  async create(comment: TaskCommentEntity): Promise<TaskCommentEntity> {
    this.TaskComments.push(comment)
    return Promise.resolve(comment)
  }

  async findByTaskId({
    taskId,
    page = 1,
    size = 10,
  }: FindByTaskIdProps): Promise<{
    items: TaskCommentEntity[]
    total: number
    page: number
    size: number
  }> {
    const comments = this.TaskComments.filter(
      (comment) => comment.taskId === taskId,
    )

    const total = comments.length

    const start = (page - 1) * size
    const end = start + size

    return Promise.resolve({
      items: comments.slice(start, end),
      total,
      page,
      size,
    })
  }
}

export { InMemoryTaskCommentRepository }
