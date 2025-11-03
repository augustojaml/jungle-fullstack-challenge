const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
    USERS: '/auth/users',
  },
  TASK: {
    FIND_TASKS: '/tasks',
    CREATE_TASK: '/tasks',
    TASK_DETAIL: (taskId: string) => `/tasks/${taskId}`,
    DELETE_TASK: (taskId: string) => `/tasks/${taskId}`,
  },
} as const

export { API_ROUTES }
