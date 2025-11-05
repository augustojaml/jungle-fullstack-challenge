import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { consoleLog } from '@repo/utils'

import { AppModule } from './app.module'
import { HttpExceptionFilter } from './http-exception.filter'
import { envConfig } from './shared/env/env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.useGlobalFilters(new HttpExceptionFilter())
  consoleLog.log(`Notifications service running on port ${envConfig.PORT}`)
  await app.listen(process.env.PORT ?? envConfig.PORT)
}
bootstrap()
