import { UserRepositoryPort } from '@/modules/user/contracts/user-repository.port'
import { UserEntity } from '@/modules/user/entities/user'

class InMemoryUserRepository implements UserRepositoryPort {
  public items: UserEntity[] = []
  async create(user: UserEntity): Promise<UserEntity> {
    this.items.push(user)
    return Promise.resolve(user)
  }
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = this.items.find((item) => item.email === email)
    return Promise.resolve(user ?? null)
  }
  async findById(id: string): Promise<UserEntity | null> {
    const user = this.items.find((item) => item.id === id)
    return Promise.resolve(user ?? null)
  }
  async update(user: UserEntity): Promise<UserEntity> {
    const index = this.items.findIndex((item) => item.id === user.id)
    this.items[index] = user
    return Promise.resolve(user)
  }
}

export { InMemoryUserRepository }
