import { Expose } from 'class-transformer'
import { IsString } from 'class-validator'

class DeleteTaskDto {
  @IsString()
  taskId!: string

  @IsString()
  userId!: string
}

class DeleteTaskResponseDto {
  @Expose() id!: string

  constructor(partial: Partial<DeleteTaskResponseDto>) {
    Object.assign(this, partial)
  }
}

export { DeleteTaskDto, DeleteTaskResponseDto }
