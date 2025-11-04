import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
class GetTaskDto {
  @ApiProperty({
    description: 'Task ID',
    example: '3b1d9e30-5a7c-4f0b-9d7b-12a3456789ab',
  })
  @IsString()
  taskId!: string
}

export { GetTaskDto }
