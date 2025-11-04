import { Exclude, Expose, Type } from 'class-transformer'
import {
  ArrayUnique,
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator'

class CreateTaskCommentParamDto {
  @IsString()
  @IsOptional()
  taskId?: string
}

class CreateTaskCommentBodyDto {
  @IsString()
  @IsOptional()
  content?: string

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsUUID('all', { each: true })
  assigneeIds?: string[]
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

class ToCommentTaskUserResponseDto {
  @Expose() id!: string
  @Expose() name!: string
  @Expose() email!: string
  @Expose() avatarUrl!: string | null

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
  @Type(() => ToCommentTaskUserResponseDto)
  author!: ToCommentTaskUserResponseDto | null

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

export {
  CreateTaskCommentBodyDto,
  CreateTaskCommentDto,
  CreateTaskCommentParamDto,
  CreateTaskCommentResponseDto,
  ToCommentTaskUserResponseDto,
}
