import { Injectable } from '@nestjs/common'

import { WsGateway } from './ws.gateway'

/**
 * Serviço para emissão de eventos via Socket.IO.
 * Injete este serviço em controllers/consumers e chame emitToUsers.
 */
@Injectable()
export class WsService {
  constructor(private readonly gateway: WsGateway) {}

  /**
   * Emite para múltiplos usuários pela sala 'user:{id}'
   */
  emitToUsers(userIds: string[], event: string, payload: unknown) {
    if (!userIds?.length) return
    const rooms = userIds.map((id) => `user:${id}`)
    this.gateway.server.to(rooms).emit(event, payload)
  }

  /**
   * Opcional: emitir para 1 usuário
   */
  emitToUser(userId: string, event: string, payload: unknown) {
    this.gateway.server.to(`user:${userId}`).emit(event, payload)
  }

  /**
   * Opcional: broadcast geral (evite para notificações)
   */
  emitBroadcast(event: string, payload: unknown) {
    this.gateway.server.emit(event, payload)
  }
}
