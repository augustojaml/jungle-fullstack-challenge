import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'

import { UnauthorizedError } from '@/shared/errors/unauthorized-error'

import { UserRepositoryPort } from '../contracts/user-repository.port'
import {
  FindExceptCurrentDto,
  FindExceptCurrentResponseDto,
} from '../dtos/find-except-current-dto'

@Injectable()
class FindUsersExceptCurrentUseCase {
  constructor(private readonly userRepositoryPort: UserRepositoryPort) {}

  async execute({
    loggedUserId,
  }: FindExceptCurrentDto): Promise<{ users: FindExceptCurrentResponseDto[] }> {
    const user = await this.userRepositoryPort.findById(loggedUserId)

    if (!user) {
      throw new UnauthorizedError()
    }

    const findExceptCurrent = await this.userRepositoryPort.findExceptCurrent(
      user.id,
    )

    const response = findExceptCurrent.map((user) => {
      return plainToInstance(FindExceptCurrentResponseDto, {
        id: user.id,
        ...user.props,
      })
    })

    return {
      users: response,
    }
  }
}

export { FindUsersExceptCurrentUseCase }
