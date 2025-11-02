import { API_ROUTES } from '@/shared/constants/api-routes'
import { api } from '@/shared/libs/axios'

import { FindTaskResponseDto } from '../dto/find-tasks-response-dto'

const taskService = {
  findTasks: async () => {
    const { data: result } = await api.get<FindTaskResponseDto>(
      `${API_ROUTES.TASK.FIND_TASKS}`,
    )

    return result
  },
}

export { taskService }
