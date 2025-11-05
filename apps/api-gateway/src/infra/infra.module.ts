import { Module } from '@nestjs/common'

import { BrokerModule } from './broker/broker.module'
import { WebsocketModule } from './websocket/websocket.module'

@Module({
  imports: [BrokerModule, WebsocketModule],
  exports: [BrokerModule, WebsocketModule],
})
export class InfraModule {}
