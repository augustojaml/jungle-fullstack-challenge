import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { InfraModule } from '@/infra/infra.module'

import { NotifyController } from './controllers/notify-controller'

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'meu_segredo_super_secreto',
    }),
    InfraModule,
  ],
  controllers: [NotifyController],
  providers: [],
  exports: [JwtModule],
})
export class NotificationsModule {}
