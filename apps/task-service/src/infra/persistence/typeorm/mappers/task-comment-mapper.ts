import { TaskCommentEntity } from '@/modules/task/entities/task-comment-entity'

import { TaskComment } from '../entities/task-comment'
import { taskUserMapper } from './task-user-mapper'

export const taskCommentMapper = {
  toDomain(orm: TaskComment): TaskCommentEntity {
    return TaskCommentEntity.create(
      {
        taskId: orm.taskId,
        authorId: orm.authorId,
        author: orm.author ? taskUserMapper.toDomain(orm.author) : null,
        content: orm.content,
        createdAt: orm.createdAt,
        updatedAt: orm.updatedAt,
      },
      orm.id,
    )
  },

  toOrm(dom: TaskCommentEntity): TaskComment {
    const o = new TaskComment()
    o.id = dom.id
    o.taskId = dom.taskId
    o.authorId = dom.authorId
    o.content = dom.content
    o.createdAt = dom.createdAt
    o.updatedAt = dom.updatedAt
    return o
  },
}
