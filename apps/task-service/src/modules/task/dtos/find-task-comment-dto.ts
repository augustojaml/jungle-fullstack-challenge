import { Exclude, Expose, Type } from 'class-transformer'
import { IsNumber, IsString } from 'class-validator'

class FindTaskCommentsDto {
  @IsString()
  userId!: string

  @IsString()
  taskId!: string

  @Type(() => Number)
  @IsNumber()
  page?: number = 1

  @Type(() => Number)
  @IsNumber()
  size?: number = 10
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

  @Exclude() password!: string

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial)
  }
}

class FindTaskCommentDto {
  @Expose() id!: string
  @Expose() taskId!: string
  @Expose() authorId!: string

  @Expose()
  @Type(() => UserDto)
  author!: UserDto | null

  @Expose() content!: string

  @Expose()
  @Type(() => Date)
  createdAt!: Date

  @Expose()
  @Type(() => Date)
  updatedAt!: Date

  constructor(partial: Partial<FindTaskCommentDto>) {
    Object.assign(this, partial)
  }
}

class FindTaskCommentsResponseDto {
  @Expose()
  @Type(() => FindTaskCommentDto)
  comments!: FindTaskCommentDto[]

  @Expose() total!: number

  @Expose() page!: number
  @Expose() size!: number

  constructor(partial: Partial<FindTaskCommentsResponseDto>) {
    Object.assign(this, partial)
  }
}

export { FindTaskCommentDto, FindTaskCommentsDto, FindTaskCommentsResponseDto }
