import type { Comment } from './comments'
import type { TaskPriority } from './task-priority'
import type { TaskStatus } from './task-status'
import type { User } from './user'

interface Task {
  id: string
  title: string
  description: string
  dueDate: Date
  priority: TaskPriority
  status: TaskStatus
  creatorId: string
  creator: User | null
  comments: Comment[]
  assignees: User[]
  createdAt: Date
  updatedAt: Date
}

export { type Task }
