import { TaskEntity } from '@/modules/task/entities/task-entity'

import { Task } from '../entities/task'
import { taskUserMapper } from './task-user-mapper'

/**
title: string
  description: string
  dueDate: Date
  priority: TaskPriority
  status: TaskStatus
  creatorId: string
  creator: TaskUserEntity | null
 */

const taskMapper = {
  toDomain: (orm: Task): TaskEntity => {
    // ajuste conforme seu factory estático
    return TaskEntity.create(
      {
        title: orm.title,
        description: orm.description,
        dueDate: orm.dueDate,
        priority: orm.priority,
        status: orm.status,
        creatorId: orm.creatorId,
        creator: orm.creator ? taskUserMapper.toDomain(orm.creator) : null,
        createdAt: orm.createdAt,
        updatedAt: orm.updatedAt,
      },
      orm.id,
    )
  },
  toOrm: (entity: TaskEntity): Task => {
    // se UserEntity expõe props, ajuste os nomes
    const task = new Task()
    task.id = entity.id
    task.title = entity.title
    task.description = entity.description
    task.dueDate = entity.dueDate
    task.priority = entity.priority
    task.status = entity.status
    task.creatorId = entity.creatorId
    task.createdAt = entity.createdAt
    task.updatedAt = entity.updatedAt
    return task
  },
}

export { taskMapper }
