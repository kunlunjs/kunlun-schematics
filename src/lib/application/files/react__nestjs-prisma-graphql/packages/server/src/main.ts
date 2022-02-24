import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
// import chalk from 'chalk'
import { AppModule } from './app.module'
import { PrismaService } from './common/prisma/prisma.service'
import { PrismaClientExceptionFilter } from './filters'
import type { CorsConfig, NestConfig, SwaggerConfig } from './interfaces'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const prismaService: PrismaService = app.get<PrismaService>(PrismaService)
  prismaService.enableShutdownHooks(app)

  const configService = app.get<ConfigService>(ConfigService)
  const nestConfig = configService.get<NestConfig>('nest', { infer: true })
  const corsConfig = configService.get<CorsConfig>('cors')
  const swaggerConfig = configService.get<SwaggerConfig>('swagger')

  const { httpAdapter } = app.get(HttpAdapterHost)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )
  // app.useGlobalGuards()
  // app.useGlobalPipes()
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

  if (corsConfig?.enabled) {
    app.enableCors()
  }

  if (swaggerConfig?.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title || 'NestJS')
      .setDescription(swaggerConfig.description || ``)
      .setVersion(swaggerConfig.version || '1.0')
      .build()

    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup(swaggerConfig.path || 'swagger', app, document)
  }

  await app.listen(process.env.PORT || nestConfig.port || 3000)
  console.log(
    // chalk.green()
    // `⚡️ Application is running on: ${chalk.underline(await app.getUrl())}`
    `⚡️ Application is running on: ${await app.getUrl()}`
  )
}

bootstrap()
