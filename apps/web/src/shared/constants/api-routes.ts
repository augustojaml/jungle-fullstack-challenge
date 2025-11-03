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
  },
} as const

export { API_ROUTES }
