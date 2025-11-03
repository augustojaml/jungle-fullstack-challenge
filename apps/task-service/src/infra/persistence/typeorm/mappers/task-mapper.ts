import { TaskEntity } from '@/modules/task/entities/task-entity'

import { Task } from '../entities/task'
import { TaskAssignee } from '../entities/task-assignee'
import { taskCommentMapper } from './task-comment-mapper'
import { taskUserMapper } from './task-user-mapper'

const taskMapper = {
  toDomain: (orm: Task): TaskEntity => {
    return TaskEntity.create(
      {
        title: orm.title,
        description: orm.description,
        dueDate: orm.dueDate,
        priority: orm.priority,
        status: orm.status,
        creatorId: orm.creatorId,
        creator: orm.creator ? taskUserMapper.toDomain(orm.creator) : null,
        assignees:
          orm.assignees?.map((a) => taskUserMapper.toDomain(a.user)) || [],
        comments: orm.comments?.map((c) => taskCommentMapper.toDomain(c)) || [],
        createdAt: orm.createdAt,
        updatedAt: orm.updatedAt,
      },
      orm.id,
    )
  },

  toOrm: (entity: TaskEntity): Task => {
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

    if (entity.props.assignees?.length > 0) {
      task.assignees = entity.props.assignees
        .filter((userEntity) => userEntity?.id)
        .map((userEntity) => {
          const assignee = new TaskAssignee()
          assignee.userId = userEntity.id
          return assignee
        })
    }

    return task
  },
}

export { taskMapper }
