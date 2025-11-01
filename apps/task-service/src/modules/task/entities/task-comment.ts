import { Entity, OptionalType } from '@repo/types'

import { CreatorEntity } from './creator-entity'

type TaskCommentEntityProps = {
  taskId: string
  authorId: string
  author?: CreatorEntity
  content: string
  createdAt: Date
  updatedAt: Date
}

class TaskCommentEntity extends Entity<TaskCommentEntityProps> {
  private constructor(props: TaskCommentEntityProps, id?: string) {
    super(props, id)
  }

  static create(
    props: OptionalType<TaskCommentEntityProps, 'createdAt' | 'updatedAt'>,
    id?: string,
  ) {
    return new TaskCommentEntity(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )
  }

  // getters
  get taskId() {
    return this.props.taskId
  }

  get authorId() {
    return this.props.authorId
  }

  get author() {
    return this.props.author
  }

  get content() {
    return this.props.content
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }
}

export { TaskCommentEntity, type TaskCommentEntityProps }
