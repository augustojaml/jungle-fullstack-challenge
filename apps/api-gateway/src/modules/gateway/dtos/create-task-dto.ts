import { ApiProperty } from '@nestjs/swagger'
import { TaskPriority, TaskStatus } from '@repo/types'
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

enum TaskStatusEnum {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE',
}

enum TaskPriorityEnum {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

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
    enum: TaskPriorityEnum,
    example: 'HIGH',
    description: 'Task priority',
  })
  @IsEnum(TaskPriorityEnum)
  priority!: TaskPriority

  @ApiProperty({
    enum: TaskStatusEnum,
    example: 'TODO',
    description: 'Task status',
  })
  @IsEnum(TaskStatusEnum)
  status!: TaskStatus

  @ApiProperty({
    required: false,
    type: [String],
    description: 'Optional list of assignee user IDs (UUIDv4)',
    example: ['d095119e-a8f9-4850-8b25-8e486cf74044'],
  })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsUUID('all', { each: true })
  assigneeIds?: string[]
}

export { CreateTaskDto }
