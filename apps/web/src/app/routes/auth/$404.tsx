import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/$404')({
  beforeLoad: () => {
    throw redirect({ to: '/auth/login' })
  },
})
