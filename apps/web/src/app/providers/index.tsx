import type { ReactNode } from 'react'

import { BootstrapProvider } from './bootstrap-provider'
import { QueryClientProvider } from './query-client-provider'
import { ThemeProvider } from './theme-provider'
import { CustomToastProvider } from './toast-provider'

const PROVIDERS = [
  { component: QueryClientProvider, key: 'queryClientProvider' },
  { component: ThemeProvider, key: 'themeProvider' },
  { component: CustomToastProvider, key: 'toastProvider' },
  { component: BootstrapProvider, key: 'bootstrapProvider' },
]

export const RootProviders = ({ children }: { children: ReactNode }) => {
  const wrappedProviders = PROVIDERS.reduceRight(
    (acc, { component: Provider }) => {
      return <Provider>{acc}</Provider>
    },
    children,
  )

  return (
    <div className="bg-background font-display min-h-screen antialiased">
      {wrappedProviders}
    </div>
  )
}
