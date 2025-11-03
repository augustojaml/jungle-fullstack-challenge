import { type TaskPriority, type TaskStatus } from '@repo/types'
import { Exclude, Expose, Type } from 'class-transformer'
import { IsString } from 'class-validator'

class GetTaskDto {
  @IsString()
  taskId!: string

  @IsString()
  creatorId!: string
}

class UserDto {
  @Expose() id!: string
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

class GetTaskResponseDto {
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
  @Type(() => UserDto)
  assignees!: UserDto[]

  @Expose()
  @Type(() => Date)
  createdAt!: Date

  @Expose()
  @Type(() => Date)
  updatedAt!: Date

  @Exclude() deletedAt?: Date | null

  constructor(partial: Partial<GetTaskResponseDto>) {
    Object.assign(this, partial)
  }
}

export { GetTaskDto, GetTaskResponseDto }
