import { type TaskPriority, type TaskStatus } from '@repo/types'
import { Exclude, Expose, Type } from 'class-transformer'
import { IsString } from 'class-validator'

class FindTasksDto {
  @IsString()
  creatorId!: string
}

class FindTasksResponseDto {
  @Expose() id!: string
  @Expose() title!: string
  @Expose() description!: string

  @Expose()
  @Type(() => Date)
  dueDate!: Date

  @Expose() priority!: TaskPriority
  @Expose() status!: TaskStatus
  @Expose() creatorId!: string

  @Expose()
  @Type(() => Date)
  createdAt!: Date

  @Expose()
  @Type(() => Date)
  updatedAt!: Date

  @Exclude() deletedAt?: Date | null

  constructor(partial: Partial<FindTasksResponseDto>) {
    Object.assign(this, partial)
  }
}

export { FindTasksDto, FindTasksResponseDto }
