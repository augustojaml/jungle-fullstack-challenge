import { IsString, IsUUID, MinLength } from 'class-validator'

class CreateParamTaskDto {
  @IsUUID()
  taskId!: string
}

class CreateBodyTaskDto {
  @IsString()
  @MinLength(10)
  content!: string
}

export { CreateBodyTaskDto, CreateParamTaskDto }
