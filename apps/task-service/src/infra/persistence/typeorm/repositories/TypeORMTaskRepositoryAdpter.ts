import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import {
  FindByCreatorOrUserIdProps,
  TaskRepositoryPort,
} from '@/modules/task/contracts/task-repository-port'
import { TaskEntity } from '@/modules/task/entities/task-entity'

import { Task } from '../entities/task'
import { TaskAssignee } from '../entities/task-assignee'
import { taskMapper } from '../mappers/task-mapper'
@Injectable()
class TypeORMTaskRepositoryAdapter implements TaskRepositoryPort {
  constructor(
    @InjectRepository(Task)
    private readonly repo: Repository<Task>,
  ) {}

  async create(task: TaskEntity): Promise<TaskEntity> {
    const orm = await this.repo.save(taskMapper.toOrm(task))

    const saved = await this.repo.findOne({
      where: { id: orm.id },
      relations: ['creator', 'assignees'],
    })

    return taskMapper.toDomain(saved!)
  }
  async update(task: TaskEntity): Promise<TaskEntity> {
    const orm = await this.repo.save(taskMapper.toOrm(task))
    return taskMapper.toDomain(orm)
  }
  async delete(id: string): Promise<{ id: string }> {
    await this.repo.delete(id)
    return { id }
  }
  async getById(id: string): Promise<TaskEntity | null> {
    const orm = await this.repo.findOne({
      where: { id },
      relations: {
        creator: true,
        assignees: true,
        // comments: true,
      },
    })

    if (!orm) {
      return null
    }

    return taskMapper.toDomain(orm)
  }
  async findByCreatorOrUserId(props: FindByCreatorOrUserIdProps): Promise<{
    items: TaskEntity[]
    total: number
    page: number
    size: number
  }> {
    const page = Math.max(1, props.page ?? 1)
    const size = Math.max(1, props.size ?? 10)
    const offset = (page - 1) * size

    const { userId } = props

    const baseQb = this.repo
      .createQueryBuilder('t')
      .where('t.creatorId = :userId', { userId })
      .orWhere((qb) => {
        const sub = qb
          .subQuery()
          .select('1')
          .from(TaskAssignee, 'ta')
          .where('ta.taskId = t.id')
          .andWhere('ta.userId = :userId')
          .getQuery()
        return `EXISTS ${sub}`
      })

    const total = await baseQb.clone().getCount()

    const rows = await baseQb
      .clone()
      .leftJoinAndSelect('t.creator', 'creator')
      .leftJoinAndSelect('t.assignees', 'assignees')
      .leftJoinAndSelect('assignees.user', 'assigneeUser')
      .orderBy('t.createdAt', 'DESC')
      .skip(offset)
      .take(size)
      .getMany()

    return {
      items: rows.map(taskMapper.toDomain),
      total,
      page,
      size,
    }
  }
}

export { TypeORMTaskRepositoryAdapter }
