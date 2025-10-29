import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common'
import { Task } from 'src/@types'

import { TaskProxyService } from '../services/task-proxy.service'

@Controller('/api-gateway')
class ApiGateWayController {
  constructor(private readonly taskProxy: TaskProxyService) {}

  @Get('tasks')
  @HttpCode(200)
  async getTasks(): Promise<Task[]> {
    return this.taskProxy.getTasks()
  }

  @Post('tasks')
  @HttpCode(201)
  async createTask(@Body('name') name: string): Promise<Task> {
    return this.taskProxy.createTask(name)
  }

  @Post('auth')
  @HttpCode(201)
  async authenticateUser(
    @Body('username') name: string,
    @Body('password') password: string,
  ): Promise<{ token: string }> {
    return this.taskProxy.authenticateUser(name, password)
  }

  @Get('auth')
  @HttpCode(200)
  async getUser(): Promise<{
    id: string
    name: string
    email: string
    password: string
  }> {
    return this.taskProxy.getUser()
  }
}

export { ApiGateWayController }
