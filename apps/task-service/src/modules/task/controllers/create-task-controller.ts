import { Controller, Post } from '@nestjs/common'

@Controller('/tasks')
class CreateTaskController {
  @Post()
  async handle() {
    return { message: 'Create task  is ok!' }
  }
}

export { CreateTaskController }
