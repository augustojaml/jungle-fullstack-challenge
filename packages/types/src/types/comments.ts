import type { User } from './user'

interface Comment {
  id: string
  taskId: string
  authorId: string
  author: User | null
  content: string
  createdAt: Date
  updatedAt: Date
}

export { type Comment }
