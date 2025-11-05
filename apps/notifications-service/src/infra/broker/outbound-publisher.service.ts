// apps/app-notifications/src/infra/broker/outbound-publisher.service.ts
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import type { Channel, Options } from 'amqplib'

import { BrokerService } from './broker.service'

// TODO:  Implement Type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OutboundPayload = Record<string, any>

@Injectable()
export class OutboundPublisherService implements OnModuleInit {
  private readonly logger = new Logger(OutboundPublisherService.name)
  private ch!: Channel

  static readonly EXCHANGE = 'notifications.outbound'

  constructor(private readonly broker: BrokerService) {}

  async onModuleInit() {
    this.ch = await this.broker.getChannelAsync()
    await this.ch.assertExchange(OutboundPublisherService.EXCHANGE, 'topic', {
      durable: true,
    })
  }

  async publish(
    routingKey: string,
    data: OutboundPayload,
    opts?: {
      // TODO:  Implement Type
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      headers?: Record<string, any>
      correlationId?: string
      replyTo?: string
    },
  ) {
    const body = Buffer.from(JSON.stringify(data))
    const options: Options.Publish = {
      persistent: true,
      contentType: 'application/json',
      headers: opts?.headers,
      correlationId: opts?.correlationId,
      replyTo: opts?.replyTo,
    }

    const ok = this.ch.publish(
      OutboundPublisherService.EXCHANGE,
      routingKey,
      body,
      options,
    )
    if (!ok) this.logger.warn(`backpressure em ${routingKey}`)
    this.logger.log(
      `➡️  OUTBOUND published: ${routingKey} ${body.toString('utf8')}`,
    )
  }
}
