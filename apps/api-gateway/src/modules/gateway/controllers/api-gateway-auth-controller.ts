import { Body, Controller, Post } from '@nestjs/common'

import { AuthLogionParamsDto } from '../dtos/auth-login-dto'
import { type AuthRegisterParamsDto } from '../dtos/auth-register-dto'
import { RefreshTokenParamsDto } from '../dtos/refresh-token-dto'
import { AuthProxyService } from '../services/auth-proxy.service'

@Controller('/api/auth')
class ApiGatewayAuthController {
  constructor(private readonly authProxy: AuthProxyService) {}

  @Post('/register')
  async register(@Body() payload: AuthRegisterParamsDto) {
    return this.authProxy.register(payload)
  }

  @Post('/login')
  async login(@Body() payload: AuthLogionParamsDto) {
    return this.authProxy.login(payload)
  }

  @Post('/refresh')
  async refresh(@Body() payload: RefreshTokenParamsDto) {
    return this.authProxy.refresh(payload)
  }
}

export { ApiGatewayAuthController }
