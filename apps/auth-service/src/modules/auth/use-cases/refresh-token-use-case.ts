import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'

import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'
import { UnauthorizedError } from '@/shared/errors/unauthorized-error'

import { UserRepositoryPort } from '../contracts/user-repository.port'
import {
  RefreshTokenParamsDto,
  RefreshTokenResponseDto,
} from '../dtos/refresh-token-dto'
import { AuthService } from '../services/auth.service'

@Injectable()
class RefreshTokenUseCase {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepositoryPort,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async execute({ refreshToken }: RefreshTokenParamsDto): Promise<any> {
    const data = await this.authService.verifyToken(refreshToken)

    if (!data) {
      throw new UnauthorizedError()
    }

    const user = await this.userRepository.findById(data.sub)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const result = plainToInstance(RefreshTokenResponseDto, {
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

export { RefreshTokenUseCase }
