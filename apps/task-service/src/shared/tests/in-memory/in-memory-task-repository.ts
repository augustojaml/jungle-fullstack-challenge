import {
  FindByCreatorOrUserIdProps,
  TaskRepositoryPort,
} from '@/modules/task/contracts/task-repository-port'
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

  findByCreatorOrUserId({
    userId,
    page = 1,
    size = 10,
  }: FindByCreatorOrUserIdProps): Promise<{
    items: TaskEntity[]
    total: number
    page: number
    size: number
  }> {
    const tasks = this.tasks.filter((task) => {
      const isCreator = task.creatorId === userId
      const isUser = task.assignees.some((assignee) => assignee.id === userId)
      return isCreator || isUser
    })

    const total = tasks.length

    const start = (page - 1) * size
    const end = start + size

    return Promise.resolve({
      items: tasks.slice(start, end),
      total,
      page,
      size,
    })
  }
}

export { InMemoryTaskRepository }
