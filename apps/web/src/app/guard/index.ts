import { redirect } from '@tanstack/react-router'

import { tokenService } from '@/features/auth/services/token-service'

export function requireAuth(
  { location }: { location: { href: string } },
  to = '/auth/login',
) {
  const token = tokenService.getToken()

  if (!token) {
    throw redirect({ to, search: { from: location.href } })
  }
}
