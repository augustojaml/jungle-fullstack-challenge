import { Module } from '@nestjs/common'

import { BrokerService } from './broker.service'
import { ConsumerService } from './consumer.service'
import { OutboundPublisherService } from './outbound-publisher.service'

@Module({
  providers: [BrokerService, ConsumerService, OutboundPublisherService],
  exports: [BrokerService, OutboundPublisherService],
})
export class BrokerModule {}
