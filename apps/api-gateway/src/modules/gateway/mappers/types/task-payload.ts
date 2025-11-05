import { Comment, User } from '@repo/types'

export interface Payload {
  task: Task
}

export interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  priority: string
  status: string
  creatorId: string
  creator: Creator
  assignees: User[]
  comments: Comment[]
  createdAt: string
  updatedAt: string
}

export interface Creator {
  id: string
  name: string
  email: string
  avatarUrl: string | null
}

export interface Assignee {
  id: string
  name: string
  email: string
  avatarUrl: string | null
}

export interface TaskConsumerResponse {
  type: string
  title: string
  payload: Payload
}
