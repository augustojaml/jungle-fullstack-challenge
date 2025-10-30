import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/infra/database/database-module'

import { LoginController } from './controllers/login-controller'
import { RegisterController } from './controllers/registe-controller'
import { RegisterUserUseCase } from './use-cases/register-user-use-case'

@Module({
  controllers: [RegisterController, LoginController],
  imports: [DatabaseModule],
  providers: [RegisterUserUseCase],
})
export class AuthModule {}
