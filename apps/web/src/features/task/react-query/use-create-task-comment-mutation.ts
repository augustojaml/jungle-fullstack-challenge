import { User } from '@repo/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import { CreateTaskCommentDto } from '../schema/create-task-comment-schema'
import { taskService } from '../services/task-service'

interface UseCreateTaskCommentMutationProps {
  taskId: string
  assignees: User[]
}

const useCreateTaskCommentMutation = ({
  taskId,
  assignees,
}: UseCreateTaskCommentMutationProps) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (serviceData: CreateTaskCommentDto) => {
      const tasks = await taskService.createTaskComment(
        taskId,
        serviceData,
        assignees,
      )
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
