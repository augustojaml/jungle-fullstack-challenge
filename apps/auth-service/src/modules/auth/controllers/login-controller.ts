import { Body, Controller, Post } from '@nestjs/common'

import { LoginUserDto } from '../dtos/login-user-dto'
import { LoginUserUseCase } from '../use-cases/login-user-use-case'

@Controller('/auth')
class LoginController {
  constructor(private readonly loginUserUseCase: LoginUserUseCase) {}

  @Post('/login')
  async handle(@Body() dto: LoginUserDto) {
    const { email, password } = dto

    const result = await this.loginUserUseCase.execute({
      email,
      password,
    })

    return result
  }
}

export { LoginController }
