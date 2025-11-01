import {
  TASK_PRIORITY,
  TASK_STATUS,
  type TaskPriority,
  type TaskStatus,
} from '@repo/types'
import { Exclude, Expose, Type } from 'class-transformer'
import { IsDate, IsEnum, IsString, MinLength } from 'class-validator'

class CreateTaskDto {
  @IsString()
  @MinLength(2)
  title!: string

  @IsString()
  @MinLength(2)
  description!: string

  @Type(() => Date)
  @IsDate()
  dueDate!: Date

  @IsEnum(TASK_PRIORITY)
  priority!: TaskPriority

  @IsEnum(TASK_STATUS)
  status!: TaskStatus

  @IsString()
  creatorId!: string
}

class CreateTaskResponseDto {
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

  constructor(partial: Partial<CreateTaskResponseDto>) {
    Object.assign(this, partial)
  }
}

export { CreateTaskDto, CreateTaskResponseDto }
