import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'

import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'

import { UserRepositoryPort } from '../contracts/user-repository.port'
import { MeUserDto, MeUserResponseDto } from '../dtos/me-user-dto'

@Injectable()
class MeUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute({ userId }: MeUserDto): Promise<{ user: MeUserResponseDto }> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const response = plainToInstance(MeUserResponseDto, {
      id: user.id,
      ...user.props,
    })

    return {
      user: response,
    }
  }
}

export { MeUserUseCase }
