import { TaskEntity } from '../entities/task-entity'

export interface FindByCreatorOrUserIdProps {
  userId: string
  page?: number
  size?: number
}

abstract class TaskRepositoryPort {
  abstract create(user: TaskEntity): Promise<TaskEntity>
  abstract update(user: TaskEntity): Promise<TaskEntity>
  abstract delete(id: string): Promise<{ id: string }>
  abstract getById(id: string): Promise<TaskEntity | null>

  abstract findByCreatorOrUserId(props: FindByCreatorOrUserIdProps): Promise<{
    items: TaskEntity[]
    total: number
    page: number
    size: number
  }>
}

export { TaskRepositoryPort }
