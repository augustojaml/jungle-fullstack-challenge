// import { Task } from '@repo/types'

import { TaskConsumerResponse } from './types/task-payload'

export const taskWsMapper = (
  data: TaskConsumerResponse,
  type: 'task:created' | 'task:updated',
) => {
  console.log('[taskWsMapper]', JSON.stringify(data, null, 2))
  const task = data.payload.task
  const recipients = task.assignees?.map((a) => a.id) ?? []

  const selectType = {
    'task:created': {
      title: 'New Task',
      message: `${task.creator?.name ?? 'Someone'} created a new task`,
    },
    'task:updated': {
      title: 'Task Updated',
      message: `${task.creator?.name ?? 'Someone'} updated a task`,
    },
  } as const

  const notification = {
    type: data.type,
    title: data.title ?? selectType[type].title,
    message: selectType[type].message,
    data: {
      taskId: task.id,
      taskTitle: task.title,
      priority: task.priority,
      creatorName: task.creator?.name ?? '',
    },
  }

  return {
    notification,
    recipients,
  }
}
