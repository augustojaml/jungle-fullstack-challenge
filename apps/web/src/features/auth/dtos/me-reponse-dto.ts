import { User } from '@repo/types'

type UserResponse = Omit<User, 'password'>

interface MeResponseDto {
  user: UserResponse
}

export { type MeResponseDto }
