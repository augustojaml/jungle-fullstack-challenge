import { useEffect } from 'react'

import { useMeQuery } from '@/features/auth/react-query/use-me-query'
import { tokenService } from '@/features/auth/services/token-service'
import { useAuthStore } from '@/features/auth/store/use-auth-store'
import { LoadingIconWave } from '@/shared/components/composites/loading-icon-wave'

const BootstrapProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading, isError } = useMeQuery()
  const { setAuthData } = useAuthStore()

  useEffect(() => {
    if (user) {
      setAuthData(user)
    }
  }, [setAuthData, user])

  useEffect(() => {
    if (isError) {
      tokenService.removeToken()
    }
  }, [isError])

  if (isLoading) {
    return <LoadingIconWave />
  }

  return <>{children}</>
}

export { BootstrapProvider }
