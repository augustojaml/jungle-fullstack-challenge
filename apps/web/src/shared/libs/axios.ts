import axios from 'axios'

import { tokenService } from '@/features/auth/services/token-service'

import { envConfig } from '../config/env'

export const api = axios.create({
  baseURL: `${envConfig.VITE_API_URL}`,
})

api.interceptors.request.use(
  (config) => {
    const token = tokenService.getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    if (error.response.status === 401) {
      // TODO: REFRESH TOKEN
      tokenService.removeToken()
    }
    return Promise.reject(error)
  },
)
