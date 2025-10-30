import { Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '../jwt-auth.guard'

@ApiTags('Tasks')
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
