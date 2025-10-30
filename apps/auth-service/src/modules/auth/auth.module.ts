import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { PersistenceModule } from '@/infra/persistence/persistence.module'

import { LoginController } from './controllers/login-controller'
import { RegisterController } from './controllers/registe-controller'
import { JwtStrategy } from './jwt.strategy'
import { JwtAuthGuard } from './jwt-auth.guard'
import { AuthService } from './services/auth.service'
import { LoginUserUseCase } from './use-cases/login-user-use-case'
import { RegisterUserUseCase } from './use-cases/register-user-use-case'

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'meu_segredo_super_secreto',
    }),
    PersistenceModule,
  ],
  controllers: [RegisterController, LoginController],
  providers: [
    RegisterUserUseCase,
    LoginUserUseCase,
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [AuthService, JwtModule, JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}
