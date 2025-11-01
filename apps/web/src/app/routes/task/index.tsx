import { createFileRoute } from '@tanstack/react-router'

import TaskPage from '@/features/task/pages/task-page'

const Route = createFileRoute('/task/')({
  component: () => <TaskPage />,
})

export { Route }
