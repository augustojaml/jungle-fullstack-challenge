import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import { taskService } from '../services/task-service'

const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (taskId: string) => {
      const tasks = await taskService.deleteTask(taskId)
      return tasks
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.TASK.FIND_TASKS],
      })
    },
  })
}

export { useDeleteTaskMutation }
