import { useQuery } from '@tanstack/react-query'

import { taskService } from '@/features/task/services/task-service'
import { QUERY_KEY } from '@/shared/constants/query-key'

interface UserFindTasksProps {
  taskId?: string
}

const useFindTaskCommentsQuery = ({ taskId }: UserFindTasksProps) => {
  return useQuery({
    queryKey: [QUERY_KEY.TASK.FIND_TASK_COMMENTS, taskId],
    queryFn: async () => {
      const result = await taskService.findTaskComment(taskId || '')
      return result
    },
    enabled: !!taskId,
  })
}

export { useFindTaskCommentsQuery }
