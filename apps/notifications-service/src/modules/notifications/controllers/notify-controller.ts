// apps/app-notifications/src/interface/http/notify.controller.ts
import { Body, Controller, Post } from '@nestjs/common'
import { OutboundPublisherService } from 'src/infra/broker/outbound-publisher.service'

@Controller('/notify')
export class NotifyController {
  constructor(private readonly publisher: OutboundPublisherService) {}

  @Post('/task-created')

  // TODO:  Implement DTO
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async taskCreated(@Body() body: any) {
    await this.publisher.publish('task.created', {
      type: 'task:new',
      title: 'New Task Created',
      payload: body, // { task: {...} }
    })
    return { ok: true }
  }
}
