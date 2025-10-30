import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { PersistenceModule } from '@/infra/persistence/persistence.module'

import { LoginUserController } from './controllers/login-user-controller'
import { RefreshTokenController } from './controllers/refresh-token-controller'
import { RegisterUserController } from './controllers/registe-user-controller'
import { JwtStrategy } from './jwt.strategy'
import { JwtAuthGuard } from './jwt-auth.guard'
import { AuthService } from './services/auth.service'
import { LoginUserUseCase } from './use-cases/login-user-use-case'
import { RefreshTokenUseCase } from './use-cases/refresh-token-use-case'
import { RegisterUserUseCase } from './use-cases/register-user-use-case'

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'meu_segredo_super_secreto',
    }),
    PersistenceModule,
  ],
  controllers: [
    RegisterUserController,
    LoginUserController,
    RefreshTokenController,
  ],
  providers: [
    RegisterUserUseCase,
    LoginUserUseCase,
    RefreshTokenUseCase,
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [AuthService, JwtModule, JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}
