import { randomUUID } from 'node:crypto'

import { Body, Controller, Post } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'

import { LoginUserDto, LoginUserResponseDto } from '../dtos/login-user-dto'

@Controller('/auth')
class LoginController {
  @Post('/login')
  async handle(@Body() dto: LoginUserDto) {
    const { email, password } = dto

    const user = {
      id: randomUUID(),
      name: 'John Doe',
      email,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30'

    const result = plainToInstance(
      LoginUserResponseDto,
      { user, token },
      {
        excludeExtraneousValues: true,
      },
    )
    console.log({ result })
    return result
  }
}

export { LoginController }
