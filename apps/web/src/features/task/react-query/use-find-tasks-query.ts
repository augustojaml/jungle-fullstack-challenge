import { useQuery } from '@tanstack/react-query'

import { taskService } from '@/features/task/services/task-service'
import { QUERY_KEY } from '@/shared/constants/query-key'

interface UserFindTasksProps {
  enabled?: boolean
}

export const useFindTasksQuery = ({
  enabled = false,
}: UserFindTasksProps = {}) => {
  return useQuery({
    queryKey: [QUERY_KEY.TASK.FIND_TASKS],
    queryFn: async () => {
      const tasks = await taskService.findTasks()
      return tasks
    },
    enabled: enabled,
  })
}
