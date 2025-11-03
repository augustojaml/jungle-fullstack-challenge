import { User } from '@repo/types'

import { API_ROUTES } from '@/shared/constants/api-routes'
import { api } from '@/shared/libs/axios'

import { MeResponseDto } from '../dtos/me-response-dto'
import { SignResponseDto } from '../dtos/signin-response-dto'
import { LoginParamsDto } from '../schema/login-schema'
import { RegisterParamsDto } from '../schema/register-schema'
import { tokenService } from './token-service'

const authService = {
  login: async ({ email, password }: LoginParamsDto) => {
    const { data: result } = await api.post<SignResponseDto>(
      `${API_ROUTES.AUTH.LOGIN}`,
      {
        email,
        password,
      },
    )
    tokenService.setToken(result.token)
    tokenService.setRefreshToken(result.refreshToken)
    return result.user
  },

  me: async () => {
    const { data: result } = await api.get<MeResponseDto>(
      `${API_ROUTES.AUTH.ME}`,
    )
    return result.user
  },

  logout: () => {
    tokenService.removeToken()
  },
  register: async ({ name, email, password }: RegisterParamsDto) => {
    const { data: result } = await api.post<{ user: User }>(
      `${API_ROUTES.AUTH.REGISTER}`,
      {
        name,
        email,
        password,
      },
    )
    return result.user
  },
  findExceptCurrent: async () => {
    const { data: result } = await api.get<{ users: User[] }>(
      `${API_ROUTES.AUTH.USERS}`,
    )

    return result.users
  },
}

export { authService }
