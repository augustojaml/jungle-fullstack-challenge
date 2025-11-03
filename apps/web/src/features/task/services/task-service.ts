import { Task } from '@repo/types'

import { API_ROUTES } from '@/shared/constants/api-routes'
import { api } from '@/shared/libs/axios'

import { FindTaskResponseDto } from '../dto/find-tasks-response-dto'
import { CreateTaskDto } from '../schema/create-task-schema'

const taskService = {
  findTasks: async () => {
    const { data: result } = await api.get<FindTaskResponseDto>(
      `${API_ROUTES.TASK.FIND_TASKS}`,
    )

    return result
  },
  createTask: async (data: CreateTaskDto) => {
    const { data: result } = await api.post<FindTaskResponseDto>(
      `${API_ROUTES.TASK.CREATE_TASK}`,
      data,
    )

    return result
  },

  deleteTask: async (taskId: string) => {
    const { data: result } = await api.delete<FindTaskResponseDto>(
      `${API_ROUTES.TASK.DELETE_TASK(taskId)}`,
    )

    return result
  },

  taskDetails: async (taskId: string) => {
    const { data: result } = await api.get<{ task: Task }>(
      `${API_ROUTES.TASK.TASK_DETAIL(taskId)}`,
    )

    return result.task
  },
}

export { taskService }
