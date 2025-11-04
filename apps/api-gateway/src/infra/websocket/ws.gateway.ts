import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import * as jwt from 'jsonwebtoken'
import { Server, Socket } from 'socket.io'

import { envConfig } from '@/shared/config/env'

@WebSocketGateway({
  cors: { origin: '*' },
  path: envConfig.WS_PATH || '/ws',
})
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server!: Server

  handleConnection(client: Socket) {
    try {
      const token = client.handshake?.auth?.token as string | undefined
      if (!token) return client.disconnect(true)

      const secret = envConfig.AUTH_SERVICE_JWT_SECRET
      if (!secret) {
        // sem secret = sem auth = sem conexão
        return client.disconnect(true)
      }

      // se usar chave pública RS256, troque verify por chave pública e { algorithms: ['RS256'] }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload = jwt.verify(token, secret) as any
      const userId = payload?.sub
      if (!userId) return client.disconnect(true)

      client.data.userId = userId

      client.join(`user:${userId}`)

      client.emit('ws:connect', { ok: true, userId })
      console.log('ws:connect', { ok: true, userId })
    } catch (error) {
      console.error(error)
      client.disconnect(true)
    }
  }

  handleDisconnect(client: Socket) {
    console.log('ws:disconnected', client.data.userId)
  }
}
