import { STORAGE_KEYS } from '@/shared/constants/storage-keys'
import { LocalStorage } from '@/shared/helpers/local-storage'

const tokenService = {
  setToken(token: string): void {
    LocalStorage.set(STORAGE_KEYS.AUTH.TOKEN, token)
  },

  getToken(): string | null {
    return LocalStorage.get<string>(STORAGE_KEYS.AUTH.TOKEN)
  },

  removeToken(): void {
    LocalStorage.delete(STORAGE_KEYS.AUTH.TOKEN)
  },

  setRefreshToken(refreshToken: string): void {
    LocalStorage.set(STORAGE_KEYS.AUTH.REFRESH_TOKEN, refreshToken)
  },

  getRefreshToken(): string | null {
    return LocalStorage.get<string>(STORAGE_KEYS.AUTH.REFRESH_TOKEN)
  },

  removeRefreshToken(): void {
    LocalStorage.delete(STORAGE_KEYS.AUTH.REFRESH_TOKEN)
  },

  isAuthenticated(): boolean {
    return !!tokenService.getToken()
  },
}

export { tokenService }
