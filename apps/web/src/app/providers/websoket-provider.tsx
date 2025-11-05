import { useQueryClient } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useRef } from 'react'
import { io, type Socket } from 'socket.io-client'

import { tokenService } from '@/features/auth/services/token-service'
import { useAuthStore } from '@/features/auth/store/use-auth-store'
import { WebSocketComment } from '@/shared/@types/websocket-comment'
import { envConfig } from '@/shared/config/env'
import { QUERY_KEY } from '@/shared/constants/query-key'

import { useToast } from './toast-provider'

type WsSocket = Socket

const SocketContext = createContext<WsSocket | null>(null)

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore()
  const token = tokenService.getToken()
  const socketRef = useRef<WsSocket | null>(null)
  const queryClient = useQueryClient()
  const { showToast } = useToast()

  useEffect(() => {
    if (!token) return

    const socket: WsSocket = io(envConfig.VITE_WS_URL, {
      path: envConfig.VITE_WS_PATH,
      transports: ['websocket'],
      auth: { token },
    })

    socketRef.current = socket

    // ==== DEBUG CONNECT ======================================================
    socket.on('connect', () => {
      console.log('[WS] CONNECTED', socket.id)
    })

    socket.on('connect_error', (err) => {
      console.error('[WS] CONNECT_ERROR', err.message, err)
    })

    socket.on('disconnect', (reason) => {
      console.warn('[WS] DISCONNECT', reason)
    })
    // ========================================================================

    socket.on('ws:connected', (data) => {
      console.log('[WS] ws:connected', data)
    })

    socket.on('notification', async (payload: WebSocketComment) => {
      showToast({
        title: payload.title,
        message: payload.message,
        type: 'success',
        position: 'top-right',
        duration: 5000,
      })
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.TASK.FIND_TASKS],
      })
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.TASK.FIND_TASK_COMMENTS],
      })
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.TASK.TASK_DETAIL, payload.data.taskId],
      })
    })

    return () => {
      socket.off('ws:connected')
      socket.off('notification')
      socket.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, token])

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => useContext(SocketContext)
