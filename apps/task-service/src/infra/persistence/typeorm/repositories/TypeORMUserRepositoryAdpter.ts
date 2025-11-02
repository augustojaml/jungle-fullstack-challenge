import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'

import { TaskUserRepositoryPort } from '@/modules/task/contracts/task-user-repository.port'
import { TaskUserEntity } from '@/modules/task/entities/task-users-entity'

import { TaskUser } from '../entities/task-user'
import { taskUserMapper } from '../mappers/task-user-mapper'
@Injectable()
class TypeORMTaskUserRepositoryAdapter implements TaskUserRepositoryPort {
  constructor(
    @InjectRepository(TaskUser)
    private readonly repo: Repository<TaskUser>,
  ) {}

  async create(user: TaskUserEntity): Promise<TaskUserEntity> {
    const orm = await this.repo.save(taskUserMapper.toOrm(user))
    return taskUserMapper.toDomain(orm)
  }
  async findById(id: string): Promise<TaskUserEntity | null> {
    const orm = await this.repo.findOne({ where: { id } })

    if (!orm) {
      return null
    }

    return taskUserMapper.toDomain(orm)
  }

  async findByIds(ids: string[]): Promise<TaskUserEntity[]> {
    if (!ids || ids.length === 0) {
      return []
    }

    const users = await this.repo.find({
      where: {
        id: In(ids), // Operador In do TypeORM para buscar múltiplos IDs
      },
    })

    return users.map((user) => taskUserMapper.toDomain(user))
  }
}

export { TypeORMTaskUserRepositoryAdapter }
