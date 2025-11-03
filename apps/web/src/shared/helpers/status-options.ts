import { TaskPriority, TaskStatus } from '@repo/types'

const priorityOptions: { key: TaskPriority; value: string }[] = [
  { key: 'LOW', value: 'Low' },
  { key: 'MEDIUM', value: 'Medium' },
  { key: 'HIGH', value: 'High' },
  { key: 'URGENT', value: 'Urgent' },
]

const statusOptions: { key: TaskStatus; value: string }[] = [
  { key: 'TODO', value: 'To Do' },
  { key: 'IN_PROGRESS', value: 'In Progress' },
  { key: 'REVIEW', value: 'In Review' },
  { key: 'DONE', value: 'Done' },
]

export { priorityOptions, statusOptions }
