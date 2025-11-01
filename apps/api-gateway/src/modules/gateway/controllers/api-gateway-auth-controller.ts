import { Body, Controller, Get, Headers, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { extractBearerToken } from '@repo/utils'

import { AuthLoginParamsDto } from '../dtos/auth-login-dto'
import { AuthRegisterParamsDto } from '../dtos/auth-register-dto'
import { RefreshTokenParamsDto } from '../dtos/refresh-token-dto'
import { AuthProxyService } from '../services/auth-proxy.service'

@ApiTags('Auth')
@Controller('/api/auth')
class ApiGatewayAuthController {
  constructor(private readonly authProxy: AuthProxyService) {}

  @ApiOperation({
    summary: 'Register a new user',
    description: 'Create a new user account (public route)',
  })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
  })
  @Post('/register')
  async register(@Body() payload: AuthRegisterParamsDto) {
    return this.authProxy.register(payload)
  }

  @ApiOperation({
    summary: 'Login to the application',
    description: 'Get an access token to use the application (public route)',
  })
  @Post('/login')
  async login(@Body() payload: AuthLoginParamsDto) {
    return this.authProxy.login(payload)
  }

  @ApiOperation({
    summary: 'Refresh access token',
    description: 'Get a new access token with the refresh token (public route)',
  })
  @Post('/refresh')
  async refresh(@Body() payload: RefreshTokenParamsDto) {
    return this.authProxy.refresh(payload)
  }

  @ApiOperation({
    summary: 'Get user information (logged user only)',
    description: 'Get the user information of the logged user (private route)',
  })
  @Get('/me')
  async me(@Headers('authorization') authHeader: string) {
    const token = extractBearerToken(authHeader)
    return this.authProxy.me(token ?? '')
  }
}

export { ApiGatewayAuthController }
