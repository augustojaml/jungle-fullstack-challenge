import { Module } from '@nestjs/common'

import { BrokerModule } from './broker/broker.module'

@Module({
  imports: [BrokerModule],
  exports: [BrokerModule],
})
export class InfraModule {}
