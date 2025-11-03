import { useQuery } from '@tanstack/react-query'

import { taskService } from '@/features/task/services/task-service'
import { QUERY_KEY } from '@/shared/constants/query-key'

interface UserFindTasksProps {
  enabled?: boolean
  page?: number
  size?: number
}

export const useFindTasksQuery = ({
  enabled = false,
  page = 1,
  size = 5,
}: UserFindTasksProps = {}) => {
  return useQuery({
    queryKey: [QUERY_KEY.TASK.FIND_TASKS, page, size],
    queryFn: async () => {
      const tasks = await taskService.findTasks(page, size)
      return tasks
    },
    enabled: enabled,
  })
}
