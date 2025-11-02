import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { RegisterParamsDto } from '../schema/register-schema'
import { authService } from '../services/auth-service'

const useRegisterMutation = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async (serviceData: RegisterParamsDto) => {
      const user = await authService.register(serviceData)
      alert(JSON.stringify(user))
      return user
    },
    onSuccess: () => {
      navigate({ to: '/auth/login' })
    },
  })
}

export { useRegisterMutation }
