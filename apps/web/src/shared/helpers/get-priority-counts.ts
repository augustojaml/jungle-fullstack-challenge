import { Task, TASK_PRIORITY, TaskPriority } from '@repo/types'

const getPriorityCounts = (tasks: Task[]) => {
  const base = Object.fromEntries(TASK_PRIORITY.map((p) => [p, 0])) as Record<
    TaskPriority,
    number
  >

  for (const t of tasks) base[t.priority]++

  return base
}

export { getPriorityCounts }
