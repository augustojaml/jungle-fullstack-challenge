import { Body, Controller, Post } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { randomUUID } from 'crypto'

import {
  RegisterUserDto,
  RegisterUserResponseDto,
} from '../dtos/register-user-dto'

@Controller('/auth')
class RegisterController {
  @Post('/users')
  async handle(@Body() dto: RegisterUserDto) {
    const { name, email, password } = dto

    const user = {
      id: randomUUID(),
      name,
      email,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // return { user: { name, email, password } }

    const response = plainToInstance(RegisterUserResponseDto, user, {
      excludeExtraneousValues: true,
    })

    return { user: response }
  }
}

export { RegisterController }
