import { ApiProperty } from '@nestjs/swagger'
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
  @ApiProperty({ example: 'Design login page', description: 'Task title' })
  @IsString()
  @MinLength(2)
  title!: string

  @ApiProperty({
    example: 'Create wireframes and specs',
    description: 'Task description',
  })
  @IsString()
  @MinLength(2)
  description!: string

  @ApiProperty({
    example: '2025-01-31T23:59:59.000Z',
    description: 'Due date (ISO 8601)',
  })
  @Type(() => Date)
  @IsDate()
  dueDate!: Date

  @ApiProperty({
    enum: TASK_PRIORITY,
    example: 'HIGH',
    description: 'Task priority',
  })
  @IsEnum(TASK_PRIORITY)
  priority!: TaskPriority

  @ApiProperty({
    enum: TASK_STATUS,
    example: 'OPEN',
    description: 'Task status',
  })
  @IsEnum(TASK_STATUS)
  status!: TaskStatus

  @ApiProperty({
    required: false,
    type: [String],
    description: 'Optional list of assignee user IDs (UUIDv4)',
    example: ['6c7f0a7e-7c3c-4d3b-9c1a-1f6e9d2b1a23'],
  })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsUUID('all', { each: true })
  assigneeIds?: string[]
}

export { CreateTaskDto }
