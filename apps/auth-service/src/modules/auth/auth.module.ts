import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { PersistenceModule } from '@/infra/persistence/persistence.module'

import { LoginController } from './controllers/login-controller'
import { RegisterController } from './controllers/registe-controller'
import { JwtAuthService } from './services/jwt-auth.service'
import { JwtAuthGuard } from './services/jwt-guard.service'
import { LoginUserUseCase } from './use-cases/login-user-use-case'
import { RegisterUserUseCase } from './use-cases/register-user-use-case'

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'meu_segredo_super_secreto',
      signOptions: { expiresIn: '1d' },
    }),
    PersistenceModule,
  ],
  controllers: [RegisterController, LoginController],
  providers: [
    RegisterUserUseCase,
    LoginUserUseCase,
    JwtAuthService,
    JwtAuthGuard,
  ],
  exports: [JwtAuthService, JwtModule, JwtAuthGuard],
})
export class AuthModule {}
