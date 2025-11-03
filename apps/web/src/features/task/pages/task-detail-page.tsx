// src/app/tasks/components/task-detail-card.tsx

import { taskDetailsMock } from '@/shared/mocks/task-details-mock'

import { TaskDetail } from '../components/task-details'

const TaskDetailPage = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <TaskDetail task={taskDetailsMock.task} />
}

export default TaskDetailPage
