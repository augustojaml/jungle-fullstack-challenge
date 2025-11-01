import { createFileRoute, redirect } from '@tanstack/react-router'

import { AuthLayout } from '@/app/layouts/auth-layout'
import { tokenService } from '@/features/auth/services/token-service'

const Route = createFileRoute('/auth')({
  beforeLoad: () => {
    const token = tokenService.getToken()
    if (token) {
      throw redirect({ to: '/task' })
    }
  },
  component: () => <AuthLayout />,
})

export { Route }
