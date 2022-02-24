import { Injectable, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, HttpAdapterHost, NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
import type { Prisma } from '@prisma/client'
import { AppModule } from '@/app.module'
import { PrismaClientExceptionFilter } from '@/filters/prisma-client-exception.filter'
import type { PrismaOptionsFactory, PrismaServiceOptions } from '@/interfaces'
import { PrismaModule } from './prisma.module'
import { PrismaService } from './prisma.service'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  // enable shutdown hook
  const prismaService: PrismaService = app.get(PrismaService)
  prismaService.enableShutdownHooks(app)
  // equivalent to example4
  prismaService.$use(async (params, next) => {
    // Before query: change params
    const result = await next(params)
    // After query: result
    return result
  })

  const { httpAdapter } = app.get(HttpAdapterHost)
  // equivalent to example7
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

  await app.listen(3000)
}
// bootstrap()

// example1 --------------------------------
@Module({
  imports: [PrismaModule.forRoot()]
})
class AppModule1 {}

// example2 --------------------------------
@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        prismaOptions: {
          log: ['info']
        },
        explicitConnect: true
      }
    })
  ]
})
class AppModule2 {}

// example3 --------------------------------
@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        prismaOptions: {
          log: ['info', 'query']
        },
        explicitConnect: false
      }
    })
  ]
})
class AppModule3 {}

// example4 --------------------------------
function loggingMiddleware() {
  return async (params: any, next: any) => {
    const before = Date.now()
    const result = await next(params)
    const after = Date.now()
    console.log(
      `Query ${params.model}.${params.action} took ${after - before}ms`
    )
    return result
  }
}

@Module({
  imports: [
    PrismaModule.forRoot({
      prismaServiceOptions: {
        middlewares: [
          async (params: any, next: any) => {
            // Before query: change params
            const result = await next(params)
            // After query: result
            return result
          },
          loggingMiddleware()
        ]
      }
    })
  ]
})
class AppModule4 {}

// example5 --------------------------------
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule.forRootAsync({
      isGlobal: true,
      useFactory: async (configService: ConfigService) => {
        return {
          prismaOptions: {
            log: [
              configService.get('log')
            ] as Prisma.PrismaClientOptions['log'],
            datasources: {
              db: {
                url: configService.get('DATABASE_URL') as string
              }
            }
          },
          explicitConnect: configService.get('explicit') as boolean
        }
      },
      inject: [ConfigService]
    })
  ]
})
class AppModule5 {}

// example6 --------------------------------
@Injectable()
class PrismaConfigService implements PrismaOptionsFactory {
  constructor() {}

  createPrismaOptions(): PrismaServiceOptions | Promise<PrismaServiceOptions> {
    return {
      prismaOptions: {
        log: ['info', 'query']
      },
      explicitConnect: true
    }
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule.forRootAsync({
      isGlobal: true,
      useClass: PrismaConfigService
    })
  ]
})
class AppModule6 {}

// example7 --------------------------------
@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: PrismaClientExceptionFilter
    }
  ]
})
class AppModule7 {}
