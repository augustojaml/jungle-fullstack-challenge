import { Controller, Post, UseGuards } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'

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
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 201, description: 'Notification created' })
  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create() {
    return this.notificationProxy.create()
  }
}

export { ApiGatewayNotificationsController }
