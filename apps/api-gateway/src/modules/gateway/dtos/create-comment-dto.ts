import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUUID, MinLength } from 'class-validator'

class CreateParamTaskDto {
  @ApiProperty({
    description: 'Task ID (UUIDv4)',
    example: '3b1d9e30-5a7c-4f0b-9d7b-12a3456789ab',
  })
  @IsUUID()
  taskId!: string
}

class CreateBodyTaskDto {
  @ApiProperty({
    description: 'Comment content',
    example: 'This task needs a review by Monday.',
  })
  @IsString()
  @MinLength(10)
  content!: string
}

export { CreateBodyTaskDto, CreateParamTaskDto }
