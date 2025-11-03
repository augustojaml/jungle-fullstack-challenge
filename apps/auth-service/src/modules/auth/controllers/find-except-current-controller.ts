import { Controller, Get, Request, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '../jwt-auth.guard'
import { FindUsersExceptCurrentUseCase } from '../use-cases/find-users-except-current-use-case'
// import { MeUserUseCase } from '../use-cases/me-user-use-case'

@Controller('/auth')
class FindExceptCurrentController {
  constructor(private readonly service: FindUsersExceptCurrentUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get('/users')
  async handle(@Request() req) {
    const { payload } = req.user
    return await this.service.execute({ loggedUserId: payload.sub })
  }
}

export { FindExceptCurrentController }
