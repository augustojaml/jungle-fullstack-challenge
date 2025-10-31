import { Controller, Get } from '@nestjs/common'

@Controller('/tasks')
class FindTasksController {
  @Get('/')
  async handle() {
    return { message: 'Find tasks  is ok!' }
  }
}

export { FindTasksController }
