// src/modules/auth/infra/repositories/user-repository.adapter.ts
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserRepositoryPort } from '@/modules/auth/contracts/user-repository.port'
import { UserEntity } from '@/modules/auth/entities/user'

import { User } from '../entities/user'
import { userMapper } from '../mappers/user-mapper'

@Injectable()
class TypeORMUserRepositoryAdapter implements UserRepositoryPort {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async create(user: UserEntity): Promise<UserEntity> {
    const saved = await this.repo.save(userMapper.toOrm(user))
    return userMapper.toDomain(saved)
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const found = await this.repo.findOne({ where: { email } })
    return found ? userMapper.toDomain(found) : null
  }

  async findById(id: string): Promise<UserEntity | null> {
    const found = await this.repo.findOne({ where: { id } })
    return found ? userMapper.toDomain(found) : null
  }

  async update(user: UserEntity): Promise<UserEntity> {
    const saved = await this.repo.save(userMapper.toOrm(user))
    return userMapper.toDomain(saved)
  }
}

export { TypeORMUserRepositoryAdapter }
