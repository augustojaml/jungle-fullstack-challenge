import { TaskEntity } from '../entities/task-entity'

abstract class TaskRepositoryPort {
  abstract create(user: TaskEntity): Promise<TaskEntity>
  abstract update(user: TaskEntity): Promise<TaskEntity>
  abstract delete(id: string): Promise<{ id: string }>
  abstract getById(id: string): Promise<TaskEntity | null>
  abstract find(): Promise<TaskEntity[]>
  abstract findByCreatorId(creatorId: string): Promise<TaskEntity[]>
}

export { TaskRepositoryPort }
