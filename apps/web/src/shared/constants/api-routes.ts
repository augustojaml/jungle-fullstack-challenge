const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
  },
  TASK: {
    FIND_TASKS: '/tasks',
  },
} as const

export { API_ROUTES }
