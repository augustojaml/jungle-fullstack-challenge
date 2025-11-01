import { Controller, Get, Request, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '../jwt-auth.guard'
import { MeUserUseCase } from '../use-cases/me-user-use-case'

@Controller('/auth')
class MeUserController {
  constructor(private readonly meUserUseCase: MeUserUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async handle(@Request() req) {
    const { payload } = req.user

    const result = await this.meUserUseCase.execute({
      userId: payload.sub,
    })

    return result
  }
}

export { MeUserController }
