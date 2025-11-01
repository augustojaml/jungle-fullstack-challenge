import { TaskUserEntity } from '../entities/task-users-entity'

abstract class TaskUserRepositoryPort {
  abstract create(user: TaskUserEntity): Promise<TaskUserEntity>
  abstract findById(id: string): Promise<TaskUserEntity | null>
}

export { TaskUserRepositoryPort }
