import { Controller, Get, Post, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '../jwt-auth.guard'

@Controller('/api/tasks')
class ApiGatewayTaskController {
  @UseGuards(JwtAuthGuard)
  @Post('/')
  async register() {
    return { data: 'add task' }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async find() {
    return { data: 'find task' }
  }
}

export { ApiGatewayTaskController }
