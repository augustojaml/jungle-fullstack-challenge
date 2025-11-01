import { createFileRoute } from '@tanstack/react-router'

import TaskDetailPage from '@/features/task/pages/task-detail-page'

const Route = createFileRoute('/task/$taskID')({
  component: () => <TaskDetailPage />,
})

export { Route }
