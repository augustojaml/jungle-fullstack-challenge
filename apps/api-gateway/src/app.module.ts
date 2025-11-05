import { Module } from '@nestjs/common'
import { ThrottlerModule } from '@nestjs/throttler'

import { GatewayModule } from './modules/gateway/gateway.module'

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 1000, limit: 10 }],
    }),
    GatewayModule,
  ],
})
export class AppModule {}
