import axios from 'axios'

import { tokenService } from '@/features/auth/services/token-service'

import { envConfig } from '../config/env'

export const api = axios.create({
  baseURL: `${envConfig.VITE_API_URL}/api`,
})

let isRefreshing = false
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let failedQueue: any[] = []

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function processQueue(error: any, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  failedQueue = []
}

api.interceptors.request.use((config) => {
  const token = tokenService.getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config

    if (error.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then((token) => {
          originalConfig.headers.Authorization = `Bearer ${token}`
          return api(originalConfig)
        })
      }

      isRefreshing = true

      try {
        const refreshToken = tokenService.getRefreshToken()

        const { data } = await axios.post(
          `${envConfig.VITE_API_URL}/api/auth/refresh`,
          { refreshToken },
        )

        tokenService.setToken(data.token)
        tokenService.setRefreshToken(data.refreshToken)

        processQueue(null, data.accessToken)
        isRefreshing = false

        originalConfig.headers.Authorization = `Bearer ${data.accessToken}`
        return api(originalConfig)
      } catch (err) {
        processQueue(err, null)
        isRefreshing = false
        tokenService.removeToken()
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  },
)
