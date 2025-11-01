import { PlusIcon } from 'lucide-react'

import { BadgeStatus } from '@/shared/components/customs/badge-status'
import { Button } from '@/shared/components/primitives/button'

interface TaskTableHeaderProps {
  counts: {
    COMPLETED: number
    IN_PROGRESS: number
    BACKLOG: number
    DELAYED: number
  }
}

const TaskTableHeader = ({ counts }: TaskTableHeaderProps) => {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <BadgeStatus status="COMPLETED" count={counts.COMPLETED} />
        <BadgeStatus status="IN_PROGRESS" count={counts.IN_PROGRESS} />
        <BadgeStatus status="BACKLOG" count={counts.BACKLOG} />
        <BadgeStatus status="DELAYED" count={counts.DELAYED} />
      </div>
      <Button>
        <PlusIcon className="mr-1.5 h-4 w-4" />
        Create Task
      </Button>
    </div>
  )
}

export { TaskTableHeader }
