import {
  TASK_PRIORITY,
  TASK_STATUS,
  TaskPriority,
  TaskStatus,
} from '@repo/types'
import { Type } from 'class-transformer'
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
  @IsArray()
  @ArrayUnique()
  @IsUUID('all', { each: true })
  assigneeIds?: string[]
}

export { CreateTaskDto }
