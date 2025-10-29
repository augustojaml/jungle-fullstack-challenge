import { Module } from '@nestjs/common'

import { AuthModule } from './auth/task-module'

@Module({
  imports: [AuthModule],
})
export class AppModule {}
