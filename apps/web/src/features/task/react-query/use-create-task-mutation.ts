import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import { CreateTaskDto } from '../schema/create-task-schema'
import { taskService } from '../services/task-service'

const useCreateTaskMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (serviceData: CreateTaskDto) => {
      const tasks = await taskService.createTask(serviceData)
      return tasks
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.TASK.FIND_TASKS],
      })
    },
  })
}

export { useCreateTaskMutation }
