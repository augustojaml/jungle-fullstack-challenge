import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common'
import { Channel, connect, Connection } from 'amqplib'

@Injectable()
export class BrokerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(BrokerService.name)
  private conn!: Connection
  private channel!: Channel
  private ready!: Promise<Channel>
  private resolveReady!: (ch: Channel) => void

  async onModuleInit() {
    this.ready = new Promise<Channel>((r) => (this.resolveReady = r))
    await this.connect()
  }

  private async connect() {
    const url = process.env.RABBITMQ_URL || 'amqp://admin:admin@localhost:5672'
    this.logger.log(`📡 Connecting to RabbitMQ at ${url} (gateway)...`)
    try {
      this.conn = await connect(url)
      this.channel = await this.conn.createChannel()
      await this.channel.prefetch(10)
      this.resolveReady(this.channel)
      this.logger.log('✅ RabbitMQ connected (gateway)')

      this.conn.on('close', () => {
        this.logger.warn('⚠️  RabbitMQ connection closed, retrying in 5s...')
        setTimeout(() => this.connect(), 5000)
      })
      this.conn.on('error', (e) => this.logger.error(`🐇 RabbitMQ error: ${e}`))
    } catch (e) {
      this.logger.error(`❌ RabbitMQ connect failed: ${e}`)
      setTimeout(() => this.connect(), 5000)
    }
  }

  getChannelAsync(): Promise<Channel> {
    if (this.channel) return Promise.resolve(this.channel)
    return this.ready
  }

  async onModuleDestroy() {
    await this.channel?.close().catch(() => {})
    await this.conn?.close().catch(() => {})
  }
}
