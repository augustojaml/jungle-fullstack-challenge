import { Module } from '@nestjs/common'

import { PersistenceModule } from '@/infra/persistence/persistence.module'

import { LoginController } from './controllers/login-controller'
import { RegisterController } from './controllers/registe-controller'
import { RegisterUserUseCase } from './use-cases/register-user-use-case'

@Module({
  controllers: [RegisterController, LoginController],
  imports: [PersistenceModule],
  providers: [RegisterUserUseCase],
})
export class AuthModule {}
