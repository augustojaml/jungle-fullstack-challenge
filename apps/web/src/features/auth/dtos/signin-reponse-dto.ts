import { User } from '@repo/types'

type UserResponse = Omit<User, 'password'>

export interface SignResponseDto {
  token: string
  refreshToken: string
  user: UserResponse
}
