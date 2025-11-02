// params dto
import { IsUUID } from 'class-validator'
export class UpdateTaskParamsDto {
  @IsUUID('4')
  taskId!: string
}

// body dto
import {
  TASK_PRIORITY,
  TASK_STATUS,
  type TaskPriority,
  type TaskStatus,
} from '@repo/types'
import {
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator'

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  title?: string

  @IsOptional()
  @IsString()
  @MinLength(2)
  description?: string

  // se o client manda ISO string (recomendado)
  @IsOptional()
  @IsDateString()
  dueDate?: string
  // se você prefere Date mesmo, troque por:
  // @IsOptional() @Type(() => Date) @IsDate() dueDate?: Date

  @IsOptional()
  @IsIn(TASK_PRIORITY) // << para arrays 'as const'
  priority?: TaskPriority

  @IsOptional()
  @IsIn(TASK_STATUS)
  status?: TaskStatus
}
