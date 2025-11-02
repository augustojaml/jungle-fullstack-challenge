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
import { IsDateString, IsIn, IsOptional, IsString } from 'class-validator'

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsDateString()
  dueDate?: string

  @IsOptional()
  @IsIn(TASK_PRIORITY)
  priority?: TaskPriority

  @IsOptional()
  @IsIn(TASK_STATUS)
  status?: TaskStatus
}
