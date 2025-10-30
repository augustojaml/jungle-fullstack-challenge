import { UserEntity } from '@/modules/auth/entities/user'

import { User } from '../entities/user'

const userMapper = {
  toDomain: (orm: User): UserEntity => {
    // ajuste conforme seu factory estático
    return UserEntity.create(
      {
        name: orm.name,
        email: orm.email,
        password: orm.password,
        avatarUrl: orm.avatarUrl ?? null,
        createdAt: orm.createdAt,
        updatedAt: orm.updatedAt,
      },
      orm.id,
    )
  },
  toOrm: (dom: UserEntity): User => {
    // se UserEntity expõe props, ajuste os nomes
    const u = new User()
    u.id = dom.id
    u.name = dom.name
    u.email = dom.email
    u.password = dom.password
    u.avatarUrl = dom.avatarUrl ?? null
    u.createdAt = dom.createdAt
    u.updatedAt = dom.updatedAt
    return u
  },
}

export { userMapper }
