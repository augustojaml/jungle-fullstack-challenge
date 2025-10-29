import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { ApiGateWayController } from './controllers/api-gateway-controller'
import { TaskProxyService } from './services/task-proxy.service'

@Module({
  imports: [HttpModule],
  controllers: [ApiGateWayController],
  providers: [TaskProxyService],
})
export class ApiGatewayModule {}
