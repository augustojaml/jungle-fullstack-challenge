import { createFileRoute, Outlet } from '@tanstack/react-router'

import { requireAuth } from '@/app/guard'
import { MainHeader } from '@/shared/components/layouts/main-header'

const Route = createFileRoute('/task')({
  beforeLoad: ({ location }) => {
    requireAuth({ location })
  },
  component: () => (
    <div className="bg-background text-foreground relative min-h-screen">
      <MainHeader />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="from-primary/25 to-destructive/25 absolute -top-12 -left-20 h-72 w-72 rounded-full bg-linear-to-br blur-3xl" />
        <div className="to-primary/20 from-secondary-400/20 absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-linear-to-tr blur-3xl" />
      </div>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 pt-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  ),
})

export { Route }
