import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { NotificationsController } from './controllers/notifications-controller'

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'meu_segredo_super_secreto',
    }),
  ],
  controllers: [NotificationsController],
  providers: [],
  exports: [JwtModule],
})
export class NotificationsModule {}
