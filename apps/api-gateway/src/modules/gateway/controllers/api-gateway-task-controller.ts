import { Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '../jwt-auth.guard'
import { TaskProxyService } from '../services/task-proxy.service'

@ApiTags('Tasks')
@Controller('/api/tasks')
class ApiGatewayTaskController {
  constructor(private readonly taskProxy: TaskProxyService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create() {
    return this.taskProxy.create()
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async find() {
    return this.taskProxy.find()
  }
}

export { ApiGatewayTaskController }
