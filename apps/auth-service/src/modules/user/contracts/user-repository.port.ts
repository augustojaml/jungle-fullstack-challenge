import { UserEntity } from '../entities/user'

interface UserRepositoryPort {
  create(user: UserEntity): Promise<UserEntity>
  findByEmail(email: string): Promise<UserEntity | null>
  findById(id: string): Promise<UserEntity | null>
  update(user: UserEntity): Promise<UserEntity>
}

export { type UserRepositoryPort }
