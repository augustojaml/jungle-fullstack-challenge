import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

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
}

export { TypeORMTaskUserRepositoryAdapter }
