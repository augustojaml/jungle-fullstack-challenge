import { TaskCommentRepositoryPort } from '@/modules/task/contracts/task-comment-repository.port'
import { TaskCommentEntity } from '@/modules/task/entities/task-comment-entity'

class InMemoryTaskCommentRepository implements TaskCommentRepositoryPort {
  public TaskComments: TaskCommentEntity[] = []

  async create(user: TaskCommentEntity): Promise<TaskCommentEntity> {
    this.TaskComments.push(user)
    return Promise.resolve(user)
  }
}

export { InMemoryTaskCommentRepository }
