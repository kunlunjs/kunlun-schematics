import { ApolloDriver } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { AppController } from './app.controller'
import { AppResolver } from './app.resolver'
import { AppService } from './app.service'
import { config } from './common/configs'
import { PrismaModule } from './common/prisma'
import { GqlConfigService } from './gql-config.service'
import { loggingMiddleware } from './middlewares'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [loggingMiddleware()]
      }
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useClass: GqlConfigService
    }),
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
  exports: []
})
export class AppModule {}
