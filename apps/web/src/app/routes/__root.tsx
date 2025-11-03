import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { envConfig } from '@/shared/config/env'

import { RootProviders } from '../providers'

const Route = createRootRoute({
  component: () => (
    <div className="bg-background font-display min-h-screen antialiased">
      <RootProviders>
        <Outlet />
        {envConfig.VITE_APP_ENVIRONMENT === 'development' && (
          <TanStackRouterDevtools position="bottom-right" />
        )}
      </RootProviders>
    </div>
  ),
})

export { Route }
