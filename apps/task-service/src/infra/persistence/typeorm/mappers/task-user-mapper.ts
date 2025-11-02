import { TaskUserEntity } from '@/modules/task/entities/task-users-entity'

import { TaskUser } from '../entities/task-user'

const taskUserMapper = {
  toDomain: (orm: TaskUser): TaskUserEntity => {
    // ajuste conforme seu factory estático
    return TaskUserEntity.create(
      {
        name: orm.name,
        email: orm.email,
        avatarUrl: orm.avatarUrl ?? null,
        createdAt: orm.createdAt,
        updatedAt: orm.updatedAt,
      },
      orm.id,
    )
  },
  toOrm: (dom: TaskUserEntity): TaskUser => {
    // se UserEntity expõe props, ajuste os nomes
    const task = new TaskUser()
    task.id = dom.id
    task.name = dom.name
    task.email = dom.email
    task.avatarUrl = dom.avatarUrl ?? null
    task.createdAt = dom.createdAt
    task.updatedAt = dom.updatedAt
    return task
  },
}

export { taskUserMapper }
