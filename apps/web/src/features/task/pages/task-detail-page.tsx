import { useParams } from '@tanstack/react-router'

import { TaskDetail } from '../components/task-details'
import { useTaskDetailQuery } from '../react-query/use-task-detail-query'

const TaskDetailPage = () => {
  const { taskID } = useParams({ strict: false })

  const {
    data: taskDetails,
    isLoading,
    isError,
  } = useTaskDetailQuery({
    taskId: taskID as string,
    enabled: !!taskID,
  })

  return (
    <TaskDetail task={taskDetails} isLoading={isLoading} isError={isError} />
  )
}

export default TaskDetailPage
