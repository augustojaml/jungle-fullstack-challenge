import { useQuery } from '@tanstack/react-query'

import { taskService } from '@/features/task/services/task-service'
import { QUERY_KEY } from '@/shared/constants/query-key'

interface UserFindTasksProps {
  taskId?: string
  page?: number
  size?: number
}

const useFindTaskCommentsQuery = ({
  taskId,
  page,
  size,
}: UserFindTasksProps) => {
  return useQuery({
    queryKey: [QUERY_KEY.TASK.FIND_TASK_COMMENTS, taskId, page, size],
    queryFn: async () => {
      const result = await taskService.findTaskComment(taskId || '', page, size)
      return result
    },
    enabled: !!taskId,
  })
}

export { useFindTaskCommentsQuery }
