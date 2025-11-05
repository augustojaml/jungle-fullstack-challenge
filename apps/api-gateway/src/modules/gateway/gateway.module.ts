import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { InfraModule } from '@/infra/infra.module'

import { ApiGatewayAuthController } from './controllers/api-gateway-auth-controller'
import { ApiGatewayTaskController } from './controllers/api-gateway-task-controller'
import { JwtStrategy } from './jwt.strategy'
import { JwtAuthGuard } from './jwt-auth.guard'
import { AuthProxyService } from './services/auth-proxy.service'
import { NotificationProxyService } from './services/notification-proxy.service'
import { TaskProxyService } from './services/task-proxy.service'

@Module({
  imports: [HttpModule, InfraModule],
  controllers: [ApiGatewayAuthController, ApiGatewayTaskController],
  providers: [
    AuthProxyService,
    TaskProxyService,
    NotificationProxyService,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [JwtStrategy, JwtAuthGuard],
})
export class GatewayModule {}
