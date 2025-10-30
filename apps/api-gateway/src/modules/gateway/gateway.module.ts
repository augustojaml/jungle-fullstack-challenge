import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { ApiGatewayAuthController } from './controllers/api-gateway-auth-controller'
import { ApiGatewayTaskController } from './controllers/api-gateway-task-controller'
import { JwtStrategy } from './jwt.strategy'
import { JwtAuthGuard } from './jwt-auth.guard'
import { AuthProxyService } from './services/auth-proxy.service'

@Module({
  imports: [HttpModule],
  controllers: [ApiGatewayAuthController, ApiGatewayTaskController],
  providers: [AuthProxyService, JwtStrategy, JwtAuthGuard],
  exports: [JwtStrategy, JwtAuthGuard],
})
export class GatewayModule {}
