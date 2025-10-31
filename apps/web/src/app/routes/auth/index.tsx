import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/')({
  beforeLoad: () => {
    // redireciona imediatamente para /auth/login
    throw redirect({ to: '/auth/login' })
  },
})
