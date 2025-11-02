import {
  TASK_PRIORITY,
  TASK_STATUS,
  type TaskPriority,
  type TaskStatus,
} from '@repo/types'
import { Exclude, Expose, Type } from 'class-transformer'
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator'

class UpdateTaskDto {
  @IsOptional()
  @IsString()
  userId?: string

  @IsOptional()
  @IsString()
  taskId?: string

  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dueDate?: Date

  @IsOptional()
  @IsEnum(TASK_PRIORITY)
  priority?: TaskPriority

  @IsOptional()
  @IsEnum(TASK_STATUS)
  status?: TaskStatus
}

class UserDto {
  @Expose() name!: string
  @Expose() email!: string
  @Expose() avatarUrl!: string | null

  @Expose()
  @Type(() => Date)
  createdAt!: Date

  @Expose()
  @Type(() => Date)
  updatedAt!: Date

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial)
  }
}

class CommentResponseDto {
  @Expose() id!: string
  @Expose() taskId!: string
  @Expose() authorId!: string

  @Expose()
  @Type(() => UserDto)
  author!: UserDto

  @Expose() content!: string

  @Expose()
  @Type(() => Date)
  createdAt!: Date

  @Expose()
  @Type(() => Date)
  updatedAt!: Date

  constructor(partial: Partial<CommentResponseDto>) {
    Object.assign(this, partial)
  }
}

class UpdateTaskResponseDto {
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
  @Type(() => UserDto)
  creator!: UserDto

  @Expose()
  @Type(() => CommentResponseDto)
  comments!: CommentResponseDto[]

  @Expose()
  @Type(() => UserDto)
  assignees!: UserDto[]

  @Expose()
  @Type(() => Date)
  createdAt!: Date

  @Expose()
  @Type(() => Date)
  updatedAt!: Date

  @Exclude() deletedAt?: Date | null

  constructor(partial: Partial<UpdateTaskResponseDto>) {
    Object.assign(this, partial)
  }
}

export { UpdateTaskDto, UpdateTaskResponseDto }
