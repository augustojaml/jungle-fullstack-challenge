import { type TaskPriority, type TaskStatus } from '@repo/types'
import { Exclude, Expose, Type } from 'class-transformer'
import { IsNumber, IsString } from 'class-validator'

class FindTasksDto {
  @IsString()
  userId!: string

  @Type(() => Number)
  @IsNumber()
  page?: number = 1

  @Type(() => Number)
  @IsNumber()
  size?: number = 10

  @Type(() => Number)
  @IsString()
  title?: string
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
  @Type(() => UserDto)
  creator!: UserDto

  @Expose()
  @Type(() => Date)
  createdAt!: Date

  @Expose()
  @Type(() => Date)
  updatedAt!: Date

  @Exclude() deletedAt?: Date | null

  constructor(partial: Partial<FindTasksDto>) {
    Object.assign(this, partial)
  }
}

class FindTasksResponsePaginationDto {
  @Expose()
  @Type(() => FindTasksResponseDto)
  tasks!: FindTasksResponseDto[]

  @Expose() total!: number

  @Expose() page!: number
  @Expose() size!: number

  constructor(partial: Partial<FindTasksResponsePaginationDto>) {
    Object.assign(this, partial)
  }
}

export { FindTasksDto, FindTasksResponseDto, FindTasksResponsePaginationDto }
