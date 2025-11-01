import { Entity, OptionalType } from '@repo/types'

type CreatorEntityProps = {
  name: string
  email: string
  avatarUrl: string | null
  createdAt: Date
  updatedAt: Date
}

class CreatorEntity extends Entity<CreatorEntityProps> {
  private constructor(props: CreatorEntityProps, id?: string) {
    super(props, id)
  }

  static create(
    props: OptionalType<
      CreatorEntityProps,
      'avatarUrl' | 'createdAt' | 'updatedAt'
    >,
    id?: string,
  ) {
    return new CreatorEntity(
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

export { CreatorEntity, type CreatorEntityProps }
