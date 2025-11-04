import { Task } from '@repo/types'

export const taskWsMapper = (task: Task, type: 'created' | 'updated') => {
  const recipients = task.assignees.map((a) => a.id)

  const selectType = {
    created: {
      type: 'task:created' as const,
      title: 'New task',
      message: `${task.creator?.name ?? 'Someone'} created a new task`,
    },
    updated: {
      type: 'task:updated' as const,
      title: 'Task updated',
      message: `${task.creator?.name ?? 'Someone'} updated a task`,
    },
  }

  const notification = {
    type: selectType[type].type,
    title: selectType[type].title,
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
