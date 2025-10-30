import { Body, Controller, Post } from '@nestjs/common'

import { LoginUserDto } from '../dtos/login-user-dto'
import { AuthService } from '../services/auth.service'
import { LoginUserUseCase } from '../use-cases/login-user-use-case'

@Controller('/auth')
class LoginUserController {
  constructor(
    private readonly authService: AuthService,
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  @Post('/login')
  async handle(@Body() dto: LoginUserDto) {
    const { email, password } = dto

    const result = await this.loginUserUseCase.execute({
      email,
      password,
    })

    const token = await this.authService.generateToken({
      sub: result.user.id,
      expiresIn: '15m',
    })

    const refreshToken = await this.authService.generateToken({
      sub: result.user.id,
      expiresIn: '7d',
    })

    return { token, refreshToken, user: result.user }
  }
}

export { LoginUserController }
