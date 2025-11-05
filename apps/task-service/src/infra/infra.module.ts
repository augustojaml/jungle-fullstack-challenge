import { Module } from '@nestjs/common'

import { BrokerModule } from './broker/broker.module'
import { PersistenceModule } from './persistence/persistence.module'

@Module({
  imports: [BrokerModule, PersistenceModule],
  exports: [BrokerModule, PersistenceModule],
})
export class InfraModule {}
