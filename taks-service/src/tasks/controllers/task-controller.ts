import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common'
import { Task } from 'src/@types'

import { TaskService } from '../services/task-service'

@Controller('/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  createTask(@Body('name') name: string) {
    const task = this.taskService.createTask(name)
    return task
  }

  @Get()
  @HttpCode(200)
  getTasks(): Task[] {
    return this.taskService.getTasks()
  }
}
