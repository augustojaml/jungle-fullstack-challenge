import { Body, Controller, Post } from '@nestjs/common'

import { RegisterUserDto } from '../dtos/register-user-dto'
import { RegisterUserUseCase } from '../use-cases/register-user-use-case'

@Controller('/auth')
class RegisterUserController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  @Post('/register')
  async handle(@Body() dto: RegisterUserDto) {
    const { name, email, password } = dto

    const result = await this.registerUserUseCase.execute({
      name,
      email,
      password,
    })

    return result
  }
}

export { RegisterUserController }
