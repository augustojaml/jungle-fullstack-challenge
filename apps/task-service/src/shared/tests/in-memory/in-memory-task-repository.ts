import { TaskRepositoryPort } from '@/modules/task/contracts/task-repository-port'
import { TaskEntity } from '@/modules/task/entities/task-entity'

class InMemoryTaskRepository implements TaskRepositoryPort {
  public tasks: TaskEntity[] = []
  async create(user: TaskEntity): Promise<TaskEntity> {
    this.tasks.push(user)
    return Promise.resolve(user)
  }
  async update(user: TaskEntity): Promise<TaskEntity> {
    const index = this.tasks.findIndex((task) => task.id === user.id)
    this.tasks[index] = user
    return Promise.resolve(user)
  }
  async delete(id: string): Promise<{ id: string }> {
    const index = this.tasks.findIndex((task) => task.id === id)
    this.tasks.splice(index, 1)
    return Promise.resolve({ id })
  }
  async getById(id: string): Promise<TaskEntity | null> {
    const task = this.tasks.find((task) => task.id === id)
    return Promise.resolve(task ?? null)
  }
  find(): Promise<TaskEntity[]> {
    return Promise.resolve(this.tasks)
  }

  findByCreatorId(creatorId: string): Promise<TaskEntity[]> {
    const tasks = this.tasks.filter((task) => task.creatorId === creatorId)
    return Promise.resolve(tasks)
  }
}

export { InMemoryTaskRepository }
