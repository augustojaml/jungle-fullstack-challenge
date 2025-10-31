import {
  QueryClient,
  QueryClientProvider as ClientProvider,
} from '@tanstack/react-query'
import { type FC, type ReactNode } from 'react'

const queryClient = new QueryClient()

const QueryClientProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <ClientProvider client={queryClient}>{children}</ClientProvider>
}

export { queryClient, QueryClientProvider }
