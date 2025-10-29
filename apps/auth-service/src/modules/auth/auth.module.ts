import { Module } from '@nestjs/common'

import { RegisterController } from './controllers/registe-controller'

@Module({
  controllers: [RegisterController],
  // imports: [AuthModule],
})
export class AuthModule {}
