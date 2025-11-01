import { TaskUserRepositoryPort } from '@/modules/task/contracts/task-user-repository.port'
import { TaskUserEntity } from '@/modules/task/entities/task-users-entity'

class InMemoryTaskUserRepository implements TaskUserRepositoryPort {
  public TaskUsers: TaskUserEntity[] = []

  async create(user: TaskUserEntity): Promise<TaskUserEntity> {
    this.TaskUsers.push(user)
    return Promise.resolve(user)
  }
  async findById(id: string): Promise<TaskUserEntity | null> {
    const user = this.TaskUsers.find((user) => user.id === id)
    return Promise.resolve(user ?? null)
  }
}

export { InMemoryTaskUserRepository }
