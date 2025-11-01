import { Entity, OptionalType, TaskPriority, TaskStatus } from '@repo/types'

import { TaskCommentEntity } from './task-comment-entity'
import { TaskUserEntity } from './task-users-entity'

type TaskEntityProps = {
  title: string
  description: string
  dueDate: Date
  priority: TaskPriority
  status: TaskStatus
  creatorId: string
  creator: TaskUserEntity | null
  comments: TaskCommentEntity[]
  assignees: TaskUserEntity[]
  createdAt: Date
  updatedAt: Date
}

class TaskEntity extends Entity<TaskEntityProps> {
  private constructor(props: TaskEntityProps, id?: string) {
    super(props, id)
  }

  static create(
    props: OptionalType<
      TaskEntityProps,
      | 'creator'
      | 'comments'
      | 'assignees'
      | 'comments'
      | 'createdAt'
      | 'updatedAt'
    >,
    id?: string,
  ) {
    return new TaskEntity(
      {
        ...props,
        creator: props.creator ?? null,
        comments: props.comments ?? [],
        assignees: props.assignees ?? [],
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )
  }

  // getters
  get title() {
    return this.props.title
  }

  get description() {
    return this.props.description
  }

  get dueDate() {
    return this.props.dueDate
  }

  get priority() {
    return this.props.priority
  }

  get status() {
    return this.props.status
  }

  get creatorId() {
    return this.props.creatorId
  }

  get creator() {
    return this.props.creator
  }

  set creator(creator: TaskUserEntity | null) {
    this.props.creator = creator
  }

  get comments() {
    return this.props.comments
  }

  set comments(comments: TaskCommentEntity[]) {
    this.props.comments = comments
  }

  get assignees() {
    return this.props.assignees
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }
}

export { TaskEntity, type TaskEntityProps }
