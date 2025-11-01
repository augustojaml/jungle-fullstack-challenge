import { Controller, Post } from '@nestjs/common'

@Controller('/notifications')
class NotificationsController {
  @Post()
  async handle() {
    return { message: 'Notification  is ok!' }
  }
}

export { NotificationsController }
