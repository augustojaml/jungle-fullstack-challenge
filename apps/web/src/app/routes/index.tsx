// src/app/routes/index.tsx
import { createFileRoute, redirect } from '@tanstack/react-router'

const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({ to: '/task' })
  },
})

export { Route }
