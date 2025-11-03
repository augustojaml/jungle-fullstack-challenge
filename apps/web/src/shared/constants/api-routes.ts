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
    UPDATE_TASK: (taskId: string) => `/tasks/${taskId}`,
    CREATE_TASK_COMMENT: (taskId: string) => `/tasks/${taskId}/comments`,
    FIND_TASK_COMMENTS: (taskId: string) => `/tasks/${taskId}/comments`,
  },
} as const

export { API_ROUTES }
