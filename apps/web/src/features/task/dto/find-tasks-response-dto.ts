import { Task } from '@repo/types'

type FindTaskResponseDto = {
  tasks: Task[]
  total: number
  page: number
  size: number
}

export { type FindTaskResponseDto }
