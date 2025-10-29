import { type User } from '@repo/types'

import { UserEntity } from '../entities/user'

interface RegisterUserRequestDto {
  name: string
  email: string
  password: string
}

type UserResponseDto = {
  user: Omit<User, 'password'>
}

const toUserResponseDto = (user: UserEntity): UserResponseDto => {
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  }
}

export { type RegisterUserRequestDto, toUserResponseDto, type UserResponseDto }
