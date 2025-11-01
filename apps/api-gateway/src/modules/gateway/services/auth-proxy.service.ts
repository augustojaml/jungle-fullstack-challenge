import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { User } from '@repo/types'
import { firstValueFrom } from 'rxjs'

import { AuthLoginParamsDto } from '../dtos/auth-login-dto'
import { AuthRegisterParamsDto } from '../dtos/auth-register-dto'
import { RefreshTokenParamsDto } from '../dtos/refresh-token-dto'

@Injectable()
class AuthProxyService {
  private readonly authServiceUrl =
    process.env.AUTH_SERVICE_URL ?? 'http://localhost:3002'

  constructor(private readonly http: HttpService) {}

  async register(payload: AuthRegisterParamsDto) {
    const { data } = await firstValueFrom(
      this.http.post<User>(`${this.authServiceUrl}/auth/register`, payload),
    )
    return data
  }

  async login(payload: AuthLoginParamsDto) {
    const { data } = await firstValueFrom(
      this.http.post<User>(`${this.authServiceUrl}/auth/login`, payload),
    )
    return data
  }
  async refresh(payload: RefreshTokenParamsDto) {
    const { data } = await firstValueFrom(
      this.http.post<User>(`${this.authServiceUrl}/auth/refresh`, payload),
    )
    return data
  }

  async me(accessToken: string) {
    const { data } = await firstValueFrom(
      this.http.get<User>(`${this.authServiceUrl}/auth/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    )
    return data
  }
}

export { AuthProxyService }
