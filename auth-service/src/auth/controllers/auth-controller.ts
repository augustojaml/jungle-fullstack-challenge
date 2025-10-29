import { Body, Controller, Get, Post } from '@nestjs/common'

import { AuthService } from '../services/auth-service'

@Controller('/auth-service')
class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/auth')
  auth(@Body() body: { email: string; password: string }) {
    const user = this.authService.authWithCredentials(body)
    return user
  }

  @Get('/users')
  getUser() {
    return this.authService.getUser()
  }
}

export { AuthController }
