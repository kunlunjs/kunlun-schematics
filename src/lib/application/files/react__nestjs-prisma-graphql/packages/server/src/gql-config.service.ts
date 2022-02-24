import type { ApolloDriverConfig } from '@nestjs/apollo'
import { Injectable } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ConfigService } from '@nestjs/config'
import type { GqlOptionsFactory } from '@nestjs/graphql'
import type { Request } from 'express'
import type { GraphQLConfig } from './interfaces'

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(private configService: ConfigService) {}

  createGqlOptions(): ApolloDriverConfig {
    const graphqlConfig = this.configService.get<GraphQLConfig>('graphql')
    return {
      // schema options
      autoSchemaFile: './src/schema.graphql',
      sortSchema: graphqlConfig?.sortSchema,
      buildSchemaOptions: {
        numberScalarMode: 'integer'
      },
      // subscription
      debug: graphqlConfig?.debg,
      installSubscriptionHandlers: true,
      playground: graphqlConfig?.playgroundEnabled,
      context: ({ req }: { req: Request }) => ({ req })
    }
  }
}
