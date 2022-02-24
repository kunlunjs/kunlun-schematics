import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
import chalk from 'chalk'
import { useContainer } from 'class-validator'
import { AppModule } from './app.module'
import { PrismaService } from './common/prisma'
import { PrismaClientExceptionFilter } from './filters'
import type { EnvironmentConfiguration } from './interfaces'
import { setupSwagger } from './swagger/setup'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true
  })
  const { httpAdapter } = app.get(HttpAdapterHost)

  /* config */
  const configService = app.get(ConfigService)
  const PORT = configService.get<EnvironmentConfiguration>('PORT', {
    infer: true
  }) as number

  /* prisma */
  const prismaService: PrismaService = await app.get<PrismaService>(
    PrismaService
  )
  prismaService.enableShutdownHooks(app)

  // app.setGlobalPrefix('api')
  // for async validator
  useContainer(app.select<AppModule>(AppModule), {
    fallbackOnErrors: true
  })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )
  // app.useGlobalInterceptors()
  /* filters */
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

  /* swagger */
  setupSwagger(app)

  await app.listen(PORT)
  console.log(
    chalk.green(
      `⚡️ Application is running on: ${chalk.underline(await app.getUrl())}`
    )
  )
}

bootstrap()
