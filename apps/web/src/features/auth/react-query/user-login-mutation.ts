import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { LoginParamsDto } from '../schema/login-schema'
import { authService } from '../services/auth-service'
import { useAuthStore } from '../store/use-auth-store'

const useLoginMutation = () => {
  const navigate = useNavigate()
  const { setAuthData } = useAuthStore()
  return useMutation({
    mutationFn: async (serviceData: LoginParamsDto) => {
      const user = await authService.login(serviceData)
      setAuthData(user)
    },
    onSuccess: () => {
      navigate({ to: '/' })
    },
  })
}

export { useLoginMutation }
