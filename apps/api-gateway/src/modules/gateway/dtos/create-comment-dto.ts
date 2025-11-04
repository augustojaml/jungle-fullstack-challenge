import { ApiProperty } from '@nestjs/swagger'
import {
  ArrayUnique,
  IsArray,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator'

class CreateParamTaskDto {
  @ApiProperty({
    description: 'Task ID (UUIDv4)',
    example: '3b1d9e30-5a7c-4f0b-9d7b-12a3456789ab',
  })
  @IsUUID()
  taskId!: string
}

class CreateTaskCommentDto {
  @ApiProperty({
    description: 'Comment content',
    example: 'This task needs a review by Monday.',
  })
  @IsString()
  @MinLength(10)
  content!: string

  @ApiProperty({
    description: 'List of assignee user IDs (UUIDv4)',
    example: [
      '3b1d9e30-5a7c-4f0b-9d7b-12a3456789ab',
      '3b1d9e30-5a7c-4f0b-9d7b-12a3456789cd',
    ],
  })
  @IsArray()
  @ArrayUnique()
  // @IsUUID('all', { each: true })
  assigneeIds?: string[]
}

export { CreateParamTaskDto, CreateTaskCommentDto }
