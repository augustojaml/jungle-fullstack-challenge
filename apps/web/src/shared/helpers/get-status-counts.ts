import { Task, TASK_STATUS, TaskStatus } from '@repo/types'

const getStatusCounts = (tasks: Task[]) => {
  const base = Object.fromEntries(TASK_STATUS.map((s) => [s, 0])) as Record<
    TaskStatus,
    number
  >

  for (const t of tasks) base[t.status]++

  return base
}

export { getStatusCounts }
