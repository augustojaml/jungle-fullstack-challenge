import { API_ROUTES } from '@/shared/constants/api-routes'
import { api } from '@/shared/libs/axios'

import { SignResponseDto } from '../dtos/signin-reponse-dto'
import { LoginParamsDto } from '../schema/login-schema'
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
  logout: () => {
    tokenService.removeToken()
    tokenService.removeRefreshToken()
  },
  register: () => {},
}

export { authService }
