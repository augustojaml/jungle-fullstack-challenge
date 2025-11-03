import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import { UpdateTaskDto } from '../schema/update-task-dto'
import { taskService } from '../services/task-service'

const useUpdateTaskMutation = (taskId?: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (serviceData: UpdateTaskDto) => {
      const tasks = await taskService.updateTask(taskId || '', serviceData)
      return tasks
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.TASK.FIND_TASKS],
      })
    },
  })
}

export { useUpdateTaskMutation }
