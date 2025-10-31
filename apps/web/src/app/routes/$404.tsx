import { createFileRoute } from '@tanstack/react-router'

import { ErrorIconWave } from '@/shared/components/composites/error-icon-wave'

export const Route = createFileRoute('/$404')({
  component: () => {
    return <ErrorIconWave isNavigateToHome />
  },
})
