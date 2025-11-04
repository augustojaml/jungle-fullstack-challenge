import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import {
  FindByTaskIdProps,
  TaskCommentRepositoryPort,
} from '@/modules/task/contracts/task-comment-repository.port'
import { TaskCommentEntity } from '@/modules/task/entities/task-comment-entity'

import { TaskComment } from '../entities/task-comment'
import { taskCommentMapper } from '../mappers/task-comment-mapper'

@Injectable()
class TypeORMTaskCommentRepositoryAdapter implements TaskCommentRepositoryPort {
  constructor(
    @InjectRepository(TaskComment)
    private readonly repo: Repository<TaskComment>,
  ) {}

  async create(comment: TaskCommentEntity): Promise<TaskCommentEntity> {
    const orm = await this.repo.save(taskCommentMapper.toOrm(comment))
    const updated = await this.repo.findOne({
      where: { id: orm.id },
      relations: ['author'],
    })

    return taskCommentMapper.toDomain(updated!)
  }

  async findByTaskId(props: FindByTaskIdProps): Promise<{
    items: TaskCommentEntity[]
    total: number
    page: number
    size: number
  }> {
    const page = Math.max(1, props.page ?? 1)
    const size = Math.max(1, props.size ?? 10)
    const offset = (page - 1) * size

    const qb = this.repo
      .createQueryBuilder('c')
      .where('c.taskId = :taskId', { taskId: props.taskId })

    const total = await qb.clone().getCount()

    const rows = await qb
      .clone()
      .leftJoinAndSelect('c.author', 'author')
      .orderBy('c.createdAt', 'DESC')
      .skip(offset)
      .take(size)
      .getMany()

    return {
      items: rows.map(taskCommentMapper.toDomain),
      total,
      page,
      size,
    }
  }
}

export { TypeORMTaskCommentRepositoryAdapter }
