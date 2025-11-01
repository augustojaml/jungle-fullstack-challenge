import { Exclude, Expose, Type } from 'class-transformer'
import { IsString, MinLength } from 'class-validator'

class CreateTaskCommentDto {
  @IsString()
  taskId!: string

  @IsString()
  authorId!: string

  @IsString()
  @MinLength(10)
  content!: string
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

class CreateTaskCommentResponseDto {
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

  constructor(partial: Partial<CreateTaskCommentResponseDto>) {
    Object.assign(this, partial)
  }
}

export { CreateTaskCommentDto, CreateTaskCommentResponseDto }
