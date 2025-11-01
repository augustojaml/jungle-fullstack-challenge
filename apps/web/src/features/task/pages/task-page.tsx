import { useMemo } from 'react'

import {
  Status,
  Task,
  TaskTableBody,
} from '@/features/auth/components/task-table/task-table-body'
import { TaskTableHeader } from '@/features/auth/components/task-table/task-table-header'

const tasks: Task[] = Array.from({ length: 50 }, (_, i) => ({
  id: `${i + 1}`,
  title: `Task #${i + 1}`,
  team: ['Design Team', 'Development Team', 'BA Team'][i % 3],
  assignee: i % 2 === 0 ? { name: `Assignee #${i + 1}` } : undefined,
  date: `0${i + 1}Aug, 2021`,
  status: ['COMPLETED', 'IN_PROGRESS', 'DELAYED', 'BACKLOG'][i % 4] as Status,
}))
const TaskPage = () => {
  const counts = useMemo(() => {
    const base = { COMPLETED: 0, IN_PROGRESS: 0, BACKLOG: 0, DELAYED: 0 }
    for (const t of tasks) base[t.status]++
    return base
  }, [])
  return (
    <div className="mx-auto h-[calc(100vh-4rem)] w-full max-w-7xl overflow-hidden px-10 pt-24">
      <TaskTableHeader counts={counts} />
      <div className="scroll-content back h-full overflow-y-scroll bg-transparent">
        <div className="border-muted/60 bg-card/90 overflow-hidden rounded-lg border">
          <TaskTableBody tasks={tasks} />
        </div>
      </div>
    </div>
  )
}

export default TaskPage
