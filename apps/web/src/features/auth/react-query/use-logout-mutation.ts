import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { authService } from '../services/auth-service'
import { useAuthStore } from '../store/use-auth-store'

const useLogoutMutation = () => {
  const { clearAuthData } = useAuthStore()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async () => {
      authService.logout()
      clearAuthData()
      navigate({ to: '/auth/login' })
    },
  })
}

export { useLogoutMutation }
