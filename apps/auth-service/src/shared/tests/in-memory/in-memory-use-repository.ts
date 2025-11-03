import { UserRepositoryPort } from '@/modules/auth/contracts/user-repository.port'
import { UserEntity } from '@/modules/auth/entities/user'

class InMemoryUserRepository implements UserRepositoryPort {
  public users: UserEntity[] = []

  async create(user: UserEntity): Promise<UserEntity> {
    this.users.push(user)
    return Promise.resolve(user)
  }
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = this.users.find((user) => user.email === email)
    return Promise.resolve(user ?? null)
  }
  async findById(id: string): Promise<UserEntity | null> {
    const user = this.users.find((user) => user.id === id)
    return Promise.resolve(user ?? null)
  }
  async update(user: UserEntity): Promise<UserEntity> {
    const index = this.users.findIndex((u) => u.id === user.id)
    this.users[index] = user
    return Promise.resolve(user)
  }

  async findExceptCurrent(userId: string): Promise<UserEntity[]> {
    const users = this.users.filter((user) => user.id !== userId)
    return Promise.resolve(users)
  }
}

export { InMemoryUserRepository }
