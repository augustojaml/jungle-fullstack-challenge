import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { ApiGatewayAuthController } from './controllers/api-gateway-auth-controller'
import { AuthProxyService } from './services/auth-proxy.service'

@Module({
  imports: [HttpModule],
  controllers: [ApiGatewayAuthController],
  providers: [AuthProxyService],
})
export class GatewayModule {}
