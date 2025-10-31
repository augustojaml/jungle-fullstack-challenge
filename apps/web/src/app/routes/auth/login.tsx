import { createFileRoute } from '@tanstack/react-router'

import LoginPage from '@/features/auth/pages/login-page'

const Route = createFileRoute('/auth/login')({
  component: () => <LoginPage />,
})

export { Route }
