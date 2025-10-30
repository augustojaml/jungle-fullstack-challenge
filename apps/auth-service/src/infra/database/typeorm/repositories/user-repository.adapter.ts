// src/modules/auth/infra/repositories/user-repository.adapter.ts
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserRepositoryPort } from '@/modules/auth/contracts/user-repository.port'
import { UserEntity } from '@/modules/auth/entities/user'

import { User } from '../entities/user'

@Injectable()
class TypeORMUserRepositoryAdapter implements UserRepositoryPort {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  private toDomain(orm: User): UserEntity {
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
  }

  private toOrm(dom: UserEntity): User {
    // se UserEntity expõe props, ajuste os nomes
    const u = new User()
    u.id = dom.id
    u.name = dom.props.name
    u.email = dom.props.email
    u.password = dom.props.password
    u.avatarUrl = dom.props.avatarUrl ?? null
    u.createdAt = dom.props.createdAt
    u.updatedAt = dom.props.updatedAt
    return u
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const saved = await this.repo.save(this.toOrm(user))
    return this.toDomain(saved)
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const found = await this.repo.findOne({ where: { email } })
    return found ? this.toDomain(found) : null
  }

  async findById(id: string): Promise<UserEntity | null> {
    const found = await this.repo.findOne({ where: { id } })
    return found ? this.toDomain(found) : null
  }

  async update(user: UserEntity): Promise<UserEntity> {
    const saved = await this.repo.save(this.toOrm(user))
    return this.toDomain(saved)
  }
}

export { TypeORMUserRepositoryAdapter }
