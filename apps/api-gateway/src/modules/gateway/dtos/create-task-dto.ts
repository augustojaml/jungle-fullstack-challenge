import {
  TASK_PRIORITY,
  TASK_STATUS,
  TaskPriority,
  TaskStatus,
} from '@repo/types'
import { Type } from 'class-transformer'
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
}

export { CreateTaskDto }
