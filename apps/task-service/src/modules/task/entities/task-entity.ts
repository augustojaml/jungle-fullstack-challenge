import { Entity, OptionalType, TaskPriority, TaskStatus } from '@repo/types'

import { CreatorEntity } from './creator-entity'

type TaskEntityProps = {
  title: string
  description: string | null
  dueDate: Date | null
  priority: TaskPriority
  status: TaskStatus
  creatorId: string
  creator?: CreatorEntity
  assignees: string[]
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
      'description' | 'dueDate' | 'assignees' | 'createdAt' | 'updatedAt'
    >,
    id?: string,
  ) {
    return new TaskEntity(
      {
        ...props,
        description: props.description ?? null,
        dueDate: props.dueDate ?? null,
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
