import { Body, Controller, Post } from '@nestjs/common'

@Controller('/auth')
class RegisterController {
  @Post('/users')
  async handle(
    @Body() body: { name: string; email: string; password: string },
  ) {
    const { name, email, password } = body
    return { user: { name, email, password } }
  }
}

export { RegisterController }
