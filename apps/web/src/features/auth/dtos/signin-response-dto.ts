import { User } from '@repo/types'

type UserResponse = Omit<User, 'password'>

interface SignResponseDto {
  token: string
  refreshToken: string
  user: UserResponse
}

export { type SignResponseDto }
