import { IsString } from 'class-validator'
class GetTaskDto {
  @IsString()
  taskId!: string
}

export { GetTaskDto }
