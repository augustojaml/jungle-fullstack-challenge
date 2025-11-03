import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import { CreateTaskCommentDto } from '../schema/create-task-comment-schema'
import { taskService } from '../services/task-service'

const useCreateTaskCommentMutation = (taskId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (serviceData: CreateTaskCommentDto) => {
      const tasks = await taskService.createTaskComment(taskId, serviceData)
      return tasks
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.TASK.FIND_TASK_COMMENTS],
      })
    },
  })
}

export { useCreateTaskCommentMutation }
