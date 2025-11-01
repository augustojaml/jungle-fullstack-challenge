import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { authService } from '../services/auth-service'
import { tokenService } from '../services/token-service'
import { useAuthStore } from '../store/use-auth-store'

export const useMeQuery = () => {
  const navigate = useNavigate()
  const { setAuthData } = useAuthStore()
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const token = tokenService.getToken()
      if (!token) {
        navigate({ to: '/auth/login' })
      }
      const user = await authService.me()
      setAuthData(user)
      return user
    },
    enabled: !!tokenService.getToken(),
  })
}
