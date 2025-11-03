import { BellRing, ClipboardList, Users2, Workflow } from 'lucide-react'

import { ErrorIconWave } from '@/shared/components/composites/error-icon-wave'

type TaskDetailErrorProps = {
  onRetry?: () => void
}

const TaskDetailError = ({ onRetry }: TaskDetailErrorProps) => {
  return (
    <ErrorIconWave
      icons={[ClipboardList, Workflow, Users2, BellRing]}
      title="Failed to load this task"
      message="We couldn't retrieve the task details. Please try again."
      onRetry={onRetry}
      isNavigateToHome
    />
  )
}

export { TaskDetailError }
