import { createFileRoute } from '@tanstack/react-router'

import { requireAuth } from '@/app/guard'
import { TaskLayout } from '@/app/layouts/task-layout'

const Route = createFileRoute('/task')({
  beforeLoad: ({ location }) => {
    requireAuth({ location })
  },
  component: () => <TaskLayout />,
})

export { Route }
