import { Module } from '@nestjs/common'

import { LoginController } from './controllers/login-controller'
import { RegisterController } from './controllers/registe-controller'

@Module({
  controllers: [RegisterController, LoginController],
  // imports: [AuthModule],
})
export class AuthModule {}
