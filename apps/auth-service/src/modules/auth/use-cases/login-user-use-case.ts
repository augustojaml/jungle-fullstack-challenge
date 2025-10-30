import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'
import { UnauthorizedError } from '@/shared/errors/unauthorized-error'
import { passwdBcrypt } from '@/shared/helpers/passwd-bcrypt'

import { UserRepositoryPort } from '../contracts/user-repository.port'
import { LoginUserDto } from '../dtos/login-user-dto'
import { UserEntity } from '../entities/user'

@Injectable()
class LoginUserUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(
    data: LoginUserDto,
  ): Promise<{ user: UserEntity; token: string }> {
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

    const token = this.jwtService.sign({
      id: user.id,
    })

    return { user, token }
  }
}

export { LoginUserUseCase }
