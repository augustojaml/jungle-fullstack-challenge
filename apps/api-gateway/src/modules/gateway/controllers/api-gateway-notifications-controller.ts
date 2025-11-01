import { Controller, Post, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '../jwt-auth.guard'
import { NotificationProxyService } from '../services/notification-proxy.service'

@ApiTags('Notifications')
@Controller('/api/notifications')
class ApiGatewayNotificationsController {
  constructor(private readonly notificationProxy: NotificationProxyService) {}

  @ApiOperation({
    summary: 'Create a new notification',
    description: 'Create a new notification (public route)',
  })
  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create() {
    return this.notificationProxy.create()
  }
}

export { ApiGatewayNotificationsController }
