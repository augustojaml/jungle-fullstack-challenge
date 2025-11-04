// params dto
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'
export class UpdateTaskParamsDto {
  @ApiProperty({
    description: 'Task ID (UUIDv4)',
    example: '3b1d9e30-5a7c-4f0b-9d7b-12a3456789ab',
  })
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
  @ApiPropertyOptional({
    example: 'Design login page - v2',
    description: 'Task title',
  })
  @IsOptional()
  @IsString()
  title?: string

  @ApiPropertyOptional({
    example: 'Add dark mode specs',
    description: 'Task description',
  })
  @IsOptional()
  @IsString()
  description?: string

  @ApiPropertyOptional({
    example: '2025-02-15T10:00:00.000Z',
    description: 'Due date (ISO 8601)',
  })
  @IsOptional()
  @IsDateString()
  dueDate?: string

  @ApiPropertyOptional({
    enum: TASK_PRIORITY,
    example: 'MEDIUM',
    description: 'Task priority',
  })
  @IsOptional()
  @IsIn(TASK_PRIORITY)
  priority?: TaskPriority

  @ApiPropertyOptional({
    enum: TASK_STATUS,
    example: 'IN_PROGRESS',
    description: 'Task status',
  })
  @IsOptional()
  @IsIn(TASK_STATUS)
  status?: TaskStatus
}
