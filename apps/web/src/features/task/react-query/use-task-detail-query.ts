import { useQuery } from '@tanstack/react-query'

import { taskService } from '@/features/task/services/task-service'
import { QUERY_KEY } from '@/shared/constants/query-key'

interface UserFindTasksProps {
  taskId: string
  enabled?: boolean
}

export const useTaskDetailQuery = ({
  taskId,
  enabled = false,
}: UserFindTasksProps) => {
  return useQuery({
    queryKey: [QUERY_KEY.TASK.TASK_DETAIL, taskId],
    queryFn: async () => {
      const tasks = await taskService.taskDetails(taskId)
      return tasks
    },
    enabled: enabled,
  })
}
