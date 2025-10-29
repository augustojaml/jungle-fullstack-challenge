import { Entity } from '@/shared/types/entity'
import { OptionalType } from '@/shared/types/optional'

type UserEntityProps = {
  name: string
  email: string
  password: string
  avatarUrl: string | null
  createdAt: Date
  updatedAt: Date
}

class UserEntity extends Entity<UserEntityProps> {
  private constructor(props: UserEntityProps, id?: string) {
    super(props, id)
  }

  static create(
    props: OptionalType<
      UserEntityProps,
      'avatarUrl' | 'createdAt' | 'updatedAt'
    >,
    id?: string,
  ) {
    return new UserEntity(
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

  get password() {
    return this.props.password
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

export { UserEntity, type UserEntityProps }
