import { APP_NAME } from './app-name'

export const STORAGE_KEYS = {
  AUTH: {
    TOKEN: `${APP_NAME}:auth:token`,
    REFRESH_TOKEN: `${APP_NAME}:auth:refresh-token`,
    USER: `${APP_NAME}:auth:user`,
  },
  THEME: `${APP_NAME}:ui:theme`,
} as const
