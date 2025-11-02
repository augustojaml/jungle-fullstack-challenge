import {
  TASK_PRIORITY,
  TASK_STATUS,
  type TaskPriority,
  type TaskStatus,
} from '@repo/types'
import { Exclude, Expose, Type } from 'class-transformer'
import {
  ArrayUnique,
  IsArray,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator'

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

  @IsOptional()
  @IsString()
  creatorId?: string

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsUUID('all', { each: true })
  assigneeIds?: string[]
}

class UserDto {
  @Expose() name!: string
  @Expose() email!: string
  @Expose() avatarUrl!: string | null

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial)
  }
}

class CreateTaskCommentDto {
  @IsString()
  taskId!: string

  @IsString()
  authorId!: string

  @IsString()
  @MinLength(10)
  content!: string
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

  @Exclude()
  @Type(() => UserDto)
  creator!: UserDto

  @Exclude()
  @Type(() => UserDto)
  assignees!: UserDto[]

  @Exclude()
  @Type(() => CreateTaskCommentDto)
  comments!: CreateTaskCommentDto

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
