import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'

import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'
import { UnauthorizedError } from '@/shared/errors/unauthorized-error'
import { passwdBcrypt } from '@/shared/helpers/passwd-bcrypt'

import { UserRepositoryPort } from '../contracts/user-repository.port'
import { LoginUserDto, LoginUserResponseDto } from '../dtos/login-user-dto'

@Injectable()
class LoginUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(data: LoginUserDto): Promise<{ user: LoginUserResponseDto }> {
    const user = await this.userRepository.findByEmail(data.email)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const comparePassword = await passwdBcrypt.compare(
      data.password,
      user.password,
    )

    if (!comparePassword) {
      throw new UnauthorizedError()
    }

    const result = plainToInstance(LoginUserResponseDto, {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })

    return { user: result }
  }
}

export { LoginUserUseCase }
