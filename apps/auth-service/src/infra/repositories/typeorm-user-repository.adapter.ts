import { UserRepositoryPort } from '@/modules/auth/contracts/user-repository.port'
import { UserEntity } from '@/modules/auth/entities/user'

class TypeORMUserRepositoryAdapter implements UserRepositoryPort {
  async create(user: UserEntity): Promise<UserEntity> {
    console.log(user)
    throw new Error('Method not implemented.')
  }
  async findByEmail(email: string): Promise<UserEntity | null> {
    console.log(email)
    throw new Error('Method not implemented.')
  }
  async findById(id: string): Promise<UserEntity | null> {
    console.log(id)
    throw new Error('Method not implemented.')
  }
  async update(user: UserEntity): Promise<UserEntity> {
    console.log(user)
    throw new Error('Method not implemented.')
  }
}

export { TypeORMUserRepositoryAdapter }
