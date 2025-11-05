import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { PersistenceModule } from '@/infra/persistence/persistence.module'
import { envConfig } from '@/shared/env/env'

import { FindExceptCurrentController } from './controllers/find-except-current-controller'
import { LoginUserController } from './controllers/login-user-controller'
import { MeUserController } from './controllers/me-user-controller'
import { RefreshTokenController } from './controllers/refresh-token-controller'
import { RegisterUserController } from './controllers/registe-user-controller'
import { JwtStrategy } from './jwt.strategy'
import { JwtAuthGuard } from './jwt-auth.guard'
import { AuthService } from './services/auth.service'
import { FindUsersExceptCurrentUseCase } from './use-cases/find-users-except-current-use-case'
import { LoginUserUseCase } from './use-cases/login-user-use-case'
import { MeUserUseCase } from './use-cases/me-user-use-case'
import { RefreshTokenUseCase } from './use-cases/refresh-token-use-case'
import { RegisterUserUseCase } from './use-cases/register-user-use-case'

@Module({
  imports: [
    JwtModule.register({
      secret: envConfig.JWT_SECRET,
    }),
    PersistenceModule,
  ],
  controllers: [
    RegisterUserController,
    LoginUserController,
    RefreshTokenController,
    MeUserController,
    FindExceptCurrentController,
  ],
  providers: [
    RegisterUserUseCase,
    LoginUserUseCase,
    RefreshTokenUseCase,
    FindUsersExceptCurrentUseCase,
    MeUserUseCase,
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [AuthService, JwtModule, JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}
