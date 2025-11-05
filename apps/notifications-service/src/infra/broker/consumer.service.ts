// apps/notifications-service/src/infra/broker/consumer.service.ts
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import type { Channel, ConsumeMessage } from 'amqplib'

import { BrokerService } from './broker.service'
import { OutboundPublisherService } from './outbound-publisher.service'

type EventBody = {
  type: string
  title?: string
  payload: unknown
}

@Injectable()
export class ConsumerService implements OnModuleInit {
  private readonly logger = new Logger(ConsumerService.name)
  private ch!: Channel

  // INBOUND (origem: task-service)
  private readonly IN_EXCHANGE = 'tasks'
  private readonly IN_QUEUE = 'notifications.tasks'
  private readonly IN_BINDINGS = [
    'task:created',
    'task:updated',
    'comment:new',
  ] as const

  constructor(
    private readonly broker: BrokerService,
    private readonly outbound: OutboundPublisherService, // republica para notifications.outbound
  ) {}

  async onModuleInit() {
    this.ch = await this.broker.getChannelAsync()

    // garante infra de entrada
    await this.ch.assertExchange(this.IN_EXCHANGE, 'topic', { durable: true })
    await this.ch.assertQueue(this.IN_QUEUE, { durable: true })

    for (const key of this.IN_BINDINGS) {
      await this.ch.bindQueue(this.IN_QUEUE, this.IN_EXCHANGE, key)
    }

    await this.ch.consume(this.IN_QUEUE, (msg) => this.onMessage(msg), {
      noAck: false,
    })

    this.logger.log(
      `✅ Consumer ligado: exchange=${this.IN_EXCHANGE} queue=${this.IN_QUEUE} bindings=${this.IN_BINDINGS.join(', ')}`,
    )
  }

  private async onMessage(msg: ConsumeMessage | null) {
    if (!msg) return
    const rk = msg.fields.routingKey
    const raw = msg.content.toString('utf8')

    try {
      // tenta parsear; se já vier no formato EventBody, reaproveita
      let parsed: EventBody
      try {
        const maybe = JSON.parse(raw)
        parsed =
          maybe && typeof maybe === 'object' && 'type' in maybe
            ? (maybe as EventBody)
            : { type: rk, title: undefined, payload: maybe }
      } catch {
        parsed = { type: rk, title: undefined, payload: raw }
      }

      this.logger.log(
        `📥 RECEBIDO (${rk}) type=${parsed.type} title="${parsed.title ?? ''}"`,
      )
      // opcional: log de payload separado para não poluir
      this.logger.debug(`🗃️ payload: ${JSON.stringify(parsed.payload)}`)

      // 🔁 republica para o api-gateway ouvir em `notifications.outbound`
      await this.outbound.publish(rk, {
        type: parsed.type, // mantém o mesmo type
        title: parsed.title ?? this.titleFor(rk),
        payload: parsed.payload,
      })

      this.ch.ack(msg)
    } catch (e) {
      this.logger.error(`Falha ao processar (${rk}): ${(e as Error).message}`)
      this.ch.nack(msg, false, false)
    }
  }

  private titleFor(rk: string) {
    switch (rk) {
      case 'task:created':
        return 'New Task Created'
      case 'task:updated':
        return 'Task Updated'
      case 'comment:new':
        return 'New Task Comment Created'
      default:
        return rk
    }
  }
}
