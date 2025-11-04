import { createContext, useContext, useEffect, useRef } from 'react'
import { io, type Socket } from 'socket.io-client'

import { tokenService } from '@/features/auth/services/token-service'
import { useAuthStore } from '@/features/auth/store/use-auth-store'
import { envConfig } from '@/shared/config/env'

type WsSocket = Socket

const SocketContext = createContext<WsSocket | null>(null)

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore()
  const token = tokenService.getToken()
  const socketRef = useRef<WsSocket | null>(null)

  useEffect(() => {
    if (!token) return

    const socket: WsSocket = io(envConfig.VITE_WS_URL, {
      path: '/ws', // <-- ESSENCIAL
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

    socket.on('notification', (payload) => {
      console.log('[WS] notification recebida', payload)
    })

    return () => {
      socket.off('ws:connected')
      socket.off('notification')
      socket.disconnect()
    }
  }, [user?.id, token])

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => useContext(SocketContext)
