import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'

import { ResourceAlreadyExistsError } from '@/shared/errors/resource-already-exists-error'
import { passwdBcrypt } from '@/shared/helpers/passwd-bcrypt'

import { UserRepositoryPort } from '../contracts/user-repository.port'
import {
  RegisterUserDto,
  RegisterUserResponseDto,
} from '../dtos/register-user-dto'
import { UserEntity } from '../entities/user'

@Injectable()
class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(
    data: RegisterUserDto,
  ): Promise<{ user: RegisterUserResponseDto }> {
    const user = await this.userRepository.findByEmail(data.email)

    if (user) {
      throw new ResourceAlreadyExistsError()
    }

    const hashPassword = await passwdBcrypt.hash(data.password)

    const userEntity = UserEntity.create({ ...data, password: hashPassword })
    const userCreated = await this.userRepository.create(userEntity)

    const response = plainToInstance(RegisterUserResponseDto, {
      id: userCreated.id,
      ...userCreated.props,
    })

    return {
      user: response,
    }
  }
}

export { RegisterUserUseCase }
