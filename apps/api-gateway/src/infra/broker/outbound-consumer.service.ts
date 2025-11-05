import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import type { Channel, ConsumeMessage } from 'amqplib'

import { commentWsMapper } from '@/modules/gateway/mappers/comment-ws-mapper'
import { taskWsMapper } from '@/modules/gateway/mappers/task-ws-mapper'

import { WsService } from '../websocket/ws.service'
import { BrokerService } from './broker.service'

@Injectable()
export class OutboundConsumerService implements OnModuleInit {
  private readonly logger = new Logger(OutboundConsumerService.name)
  private ch!: Channel

  // mesmo exchange usado pelo notification-service
  private readonly exchange = 'notifications.outbound'
  private readonly queue = 'api-gateway.notifications'
  // bindings exatos (já que usamos “:” e não “.”)
  private readonly bindingKeys = ['task:created', 'task:updated', 'comment:new']

  constructor(
    private readonly broker: BrokerService,
    private readonly ws: WsService,
  ) {}

  async onModuleInit() {
    this.ch = await this.broker.getChannelAsync()

    // garante infraestrutura
    await this.ch.assertExchange(this.exchange, 'topic', { durable: true })
    await this.ch.assertQueue(this.queue, { durable: true })

    for (const key of this.bindingKeys) {
      await this.ch.bindQueue(this.queue, this.exchange, key)
    }

    await this.ch.consume(this.queue, (msg) => this.onMessage(msg), {
      noAck: false,
    })

    this.logger.log(
      `✅ OUTBOUND consumer ligado: exchange=${this.exchange} queue=${this.queue} bindings=${this.bindingKeys.join(', ')}`,
    )
  }

  private onMessage(msg: ConsumeMessage | null) {
    if (!msg) return
    const rk = msg.fields.routingKey
    const content = msg.content.toString('utf8')

    try {
      const data = JSON.parse(content)

      if (data.type === 'task:created' || data.type === 'task:updated') {
        const { recipients, notification } = taskWsMapper(data, data.type)
        this.ws.emitToUsers(recipients, 'notification', notification)
      }

      if (data.type === 'comment:new') {
        const { recipients, notification } = commentWsMapper(data, data.type)
        this.ws.emitToUsers(recipients, 'notification', notification)
      }
      // console.log(data.type)

      this.ch.ack(msg)
    } catch (e) {
      this.logger.error(`Erro processando ${rk}: ${(e as Error).message}`)
      this.ch.nack(msg, false, false)
    }
  }
}
