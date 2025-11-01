import { Entity, OptionalType } from '@repo/types'

type TaskUserEntityProps = {
  name: string
  email: string
  avatarUrl: string | null
  createdAt: Date
  updatedAt: Date
}

class TaskUserEntity extends Entity<TaskUserEntityProps> {
  private constructor(props: TaskUserEntityProps, id?: string) {
    super(props, id)
  }

  static create(
    props: OptionalType<
      TaskUserEntityProps,
      'avatarUrl' | 'createdAt' | 'updatedAt'
    >,
    id?: string,
  ) {
    return new TaskUserEntity(
      {
        ...props,
        avatarUrl: props.avatarUrl ?? null,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )
  }

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get avatarUrl() {
    return this.props.avatarUrl
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }
}

export { TaskUserEntity, type TaskUserEntityProps }
