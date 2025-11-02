import { TaskEntity } from '../entities/task-entity'

export interface FindByCreatorOrUserIdProps {
  userId: string
  page?: number
  size?: number
}

abstract class TaskRepositoryPort {
  abstract create(task: TaskEntity): Promise<TaskEntity>
  abstract update(task: TaskEntity): Promise<TaskEntity>
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
