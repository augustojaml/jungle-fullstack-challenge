import { Task } from '@repo/types'
import { Comment } from '@repo/types'

import { API_ROUTES } from '@/shared/constants/api-routes'
import { api } from '@/shared/libs/axios'

import { FindTaskResponseDto } from '../dto/find-tasks-response-dto'
import { CreateTaskCommentDto } from '../schema/create-task-comment-schema'
import { CreateTaskDto } from '../schema/create-task-schema'
import { UpdateTaskDto } from '../schema/update-task-dto'

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

  updateTask: async (taskId: string, data: UpdateTaskDto) => {
    const { data: result } = await api.put<{ task: Task }>(
      `${API_ROUTES.TASK.UPDATE_TASK(taskId)}`,
      data,
    )

    return result.task
  },

  taskDetails: async (taskId: string) => {
    const { data: result } = await api.get<{ task: Task }>(
      `${API_ROUTES.TASK.TASK_DETAIL(taskId)}`,
    )

    return result.task
  },

  findTaskComment: async (taskId: string) => {
    const { data: result } = await api.get<{
      comments: Comment[]
      total: number
      page: number
      size: number
    }>(`${API_ROUTES.TASK.FIND_TASK_COMMENTS(taskId)}`)
    return result
  },

  createTaskComment: async (taskId: string, data: CreateTaskCommentDto) => {
    const { data: result } = await api.post<{ comment: Comment }>(
      `${API_ROUTES.TASK.CREATE_TASK_COMMENT(taskId)}`,
      data,
    )

    return result.comment
  },
}

export { taskService }
