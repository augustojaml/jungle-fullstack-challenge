import type { TaskPriority } from './task-priority'
import type { TaskStatus } from './task-status'

interface Task {
  title: string
  description?: string
  dueDate?: string
  priority: TaskPriority
  status: TaskStatus
}

export { type Task }
