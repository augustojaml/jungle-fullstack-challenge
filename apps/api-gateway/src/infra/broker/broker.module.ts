import { Module } from '@nestjs/common'

import { WebsocketModule } from '../websocket/websocket.module'
import { BrokerService } from './broker.service'
import { OutboundConsumerService } from './outbound-consumer.service'

@Module({
  imports: [WebsocketModule],
  providers: [BrokerService, OutboundConsumerService],
  exports: [BrokerService, OutboundConsumerService],
})
export class BrokerModule {}
