import { useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import { authService } from '../services/auth-service'
import { tokenService } from '../services/token-service'

const useFindExceptCurrentQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.AUTH.USERS],
    queryFn: async () => {
      const users = await authService.findExceptCurrent()
      return users
    },
    enabled: !!tokenService.getToken(),
  })
}

export { useFindExceptCurrentQuery }
