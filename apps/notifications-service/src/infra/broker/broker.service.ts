import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { Channel, connect, Connection } from 'amqplib'

@Injectable()
export class BrokerService implements OnModuleInit, OnModuleDestroy {
  private conn!: Connection
  private channel!: Channel

  // promise para aguardar o canal
  private _readyResolve!: (ch: Channel) => void
  readonly ready: Promise<Channel> = new Promise<Channel>((res) => {
    this._readyResolve = res
  })

  async onModuleInit() {
    // ajuste o host conforme seu ambiente (localhost se app fora do docker)
    this.conn = await connect('amqp://admin:admin@localhost:5672')
    this.channel = await this.conn.createChannel()
    await this.channel.prefetch(5)
    this._readyResolve(this.channel)
  }

  getChannel() {
    return this.channel
  }

  async getChannelAsync(): Promise<Channel> {
    if (this.channel) return this.channel
    return this.ready
  }

  async onModuleDestroy() {
    await this.channel?.close().catch(() => {})
    await this.conn?.close().catch(() => {})
  }
}
