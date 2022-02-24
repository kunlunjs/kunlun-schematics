## Instaling

```bash
pnpm i
```

#### 开发环境

```bash
# 启动前端服务
# 启动后端服务
cd packages/server && pnpm start:dev
```

#### 生产环境

```bash
# 前端构建
cd packages/web && npm run build
cd packages/web && npm run serve

# 启动后端服务
cd packages/server && pnpm start:prod
# or 使用 pm2 启动后端服务守护进程
cd packages/server && pnpm start:pm2
```

## Developing

安装项目根目录依赖

```bash
pnpm i prettier eslint -W -D
```

安装子项目依赖

```bash
# 为 packages/web 安装 dependencies：react
pnpm i react -r --filter @kunlunjs-schematics/react-nestjs_prisma__web
# 为 packages/server 安装 dependencies: @nestjs/core @nestjs/common
pnpm i @nestjs/core @nestjs/common -r --filter @kunlunjs-schematics/react-nestjs_prisma__server
# 为 packages/server 安装 devDependencies: typescript
pnpm i typescript -D -r --filter @kunlunjs-schematics/react-nestjs_prisma__server
```

## Features

### Web

- React
- React Query
- React Router
- TailwindCSS
- Webpack/Vite

### Server

- NestJS
- Prisma
- Swagger
- GraphQL

## Overview

## Prisma Setup

### 1. Install Dependencies

```bash
pnpm i
# or
yarn
# or
npm i
```

### 2. PostgreSQL with Docker

```bash
# 通过 docker 启动数据库
docker-compose -f docker-compose.db.yml up -d
# or
npm run docker:db

# 进入容器
docker exec -it <容器ID> base
# 查看容器信息
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <容器ID>
```

### 3. Prisma Migrate

```bash
npx prisma migrate dev
# or
npm run migrate:dev

npx prisma migrate dev --create-only
# or
npm run migrate:dev:create

npx prisma migrate deploy
# or
npm run migrate:deploy
```

### 4. Prisma: Prisma Client JS

```bash
npx prisma generate
```

### 5. Seed the database data with the script

```bash
npm run seed
```

### 6. Start NestjS Server

```bash
npm run start
# watch mode
npm run start:dev
```

## GraphQL Playground

```bash

```

## RESTful Api

open `http://localhost:3000/swagger`

## Docker

```bash
docker build -t <your username>/nestjs-prisma-server .
docker build -t nestjs-prisma-server .

docker run -d -t -p 3000:3000 --env-file .env nestjs-prisma-server
```

### Docker compose

## Schema Development

## 模块封装及使用指南

```ts
import { Injectable, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, HttpAdapterHost, NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
import type { Prisma } from '@prisma/client'
import { AppModule } from 'src/app.module'
import { PrismaClientExceptionFilter } from 'src/filters/prisma-client-exception.filter'
import type { PrismaOptionsFactory, PrismaServiceOptions } from 'src/interfaces'
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
bootstrap()

// example1 ------------------------------------------------
@Module({
  imports: [PrismaModule.forRoot()]
})
class AppModule1 {}

// example2 ------------------------------------------------
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

// example3 ------------------------------------------------
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

// example4 ------------------------------------------------
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

// example5 ------------------------------------------------
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

// example6 ------------------------------------------------
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

// example7 ------------------------------------------------
@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: PrismaClientExceptionFilter
    }
  ]
})
class AppModule7 {}
```

## 常见问题

```error
Return type of exported function has or is using private name 'PaginatedType'.
```

[解决方案](https://github.com/MichalLytek/type-graphql/issues/670)：关闭 tsconfig.json 中的 `"declaration": true`
