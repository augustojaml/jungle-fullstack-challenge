import { Body, Controller, Post } from '@nestjs/common'

import { RefreshTokenParamsDto } from '../dtos/refresh-token-dto'
import { AuthService } from '../services/auth.service'
import { RefreshTokenUseCase } from '../use-cases/refresh-token-use-case'

@Controller('/auth')
class RefreshTokenController {
  constructor(
    private readonly authService: AuthService,
    private readonly refreshToken: RefreshTokenUseCase,
  ) {}

  @Post('/refresh')
  async refresh(@Body() body: RefreshTokenParamsDto) {
    const response = await this.refreshToken.execute({
      refreshToken: body.refreshToken,
    })

    const token = await this.authService.generateToken({
      sub: response.user.id,
      expiresIn: '15m',
    })

    const refreshToken = await this.authService.generateToken({
      sub: response.user.id,
      expiresIn: '7d',
    })

    return { token, refreshToken, user: response.user }
  }
}

export { RefreshTokenController }
