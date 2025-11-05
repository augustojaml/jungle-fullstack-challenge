/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common'
import { Channel, connect, Connection, Options } from 'amqplib'

@Injectable()
export class BrokerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(BrokerService.name)
  private conn!: Connection
  private channel!: Channel

  private ready!: Promise<Channel>
  private resolveReady!: (ch: Channel) => void

  // exchange principal para o domínio de tarefas
  private readonly exchange = 'tasks'
  private readonly exchangeType = 'topic' as const

  async onModuleInit() {
    this.ready = new Promise<Channel>((r) => (this.resolveReady = r))
    await this.connect()
  }

  private async connect() {
    const url = process.env.RABBITMQ_URL || 'amqp://admin:admin@localhost:5672'
    this.logger.log(`📡 Connecting to RabbitMQ at ${url} (task-service)...`)

    try {
      this.conn = await connect(url)
      this.channel = await this.conn.createChannel()
      await this.channel.prefetch(10)

      // garante a existência do exchange
      await this.channel.assertExchange(this.exchange, this.exchangeType, {
        durable: true,
      })

      this.resolveReady(this.channel)
      this.logger.log(`✅ RabbitMQ connected (exchange: ${this.exchange})`)

      this.conn.on('close', () => {
        this.logger.warn('⚠️  RabbitMQ connection closed, retrying in 5s...')
        setTimeout(() => this.connect(), 5000)
      })
      this.conn.on('error', (err) => {
        this.logger.error(`🐇 RabbitMQ connection error: ${err.message}`)
      })
    } catch (err) {
      this.logger.error(`❌ Failed to connect to RabbitMQ: ${err}`)
      setTimeout(() => this.connect(), 5000)
    }
  }

  getChannelAsync(): Promise<Channel> {
    if (this.channel) return Promise.resolve(this.channel)
    return this.ready
  }

  /**
   * Publica eventos no exchange 'tasks'
   * Exemplo de uso:
   *  await broker.publish('task:created', { ... })
   */
  async publish(
    routingKey: 'task:created' | 'task:updated' | 'comment:new' | string,

    data: Record<string, any>,
    opts?: {
      headers?: Record<string, any>
      correlationId?: string
      replyTo?: string
    },
  ) {
    const ch = await this.getChannelAsync()

    const body = Buffer.from(JSON.stringify(data))
    const options: Options.Publish = {
      persistent: true,
      contentType: 'application/json',
      headers: opts?.headers,
      correlationId: opts?.correlationId,
      replyTo: opts?.replyTo,
    }

    const ok = ch.publish(this.exchange, routingKey, body, options)
    if (!ok) this.logger.warn(`⚠️ backpressure em ${routingKey}`)

    this.logger.log(`📤 Enviado → ${routingKey}: ${body.toString('utf8')}`)
  }

  async onModuleDestroy() {
    await this.channel?.close().catch(() => {})
    await this.conn?.close().catch(() => {})
  }
}
