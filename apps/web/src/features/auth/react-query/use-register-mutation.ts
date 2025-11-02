import { useMutation } from '@tanstack/react-query'

import { RegisterParamsDto } from '../schema/register-schema'
import { authService } from '../services/auth-service'

const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (serviceData: RegisterParamsDto) => {
      const user = await authService.register(serviceData)
      return user
    },
  })
}

export { useRegisterMutation }
