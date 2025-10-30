import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'
import { UnauthorizedError } from '@/shared/errors/unauthorized-error'
import { passwdBcrypt } from '@/shared/helpers/passwd-bcrypt'

import { UserRepositoryPort } from '../contracts/user-repository.port'
import { RegisterUserDto } from '../dtos/register-user-dto'
import { UserEntity } from '../entities/user'

class LoginUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(data: RegisterUserDto): Promise<UserEntity> {
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

    return user
  }
}

export { LoginUserUseCase }
