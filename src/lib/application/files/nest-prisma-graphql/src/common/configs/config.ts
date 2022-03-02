import type { Config } from './config.interface'

const config: Config = {
  nest: {
    port: 3000
  },
  cors: {
    enabled: true
  },
  swagger: {
    enabled: true,
    title: 'NestJS FTW',
    description: '',
    version: '1.0',
    path: 'swagger'
  },
  graphql: {
    playgroundEnabled: true,
    debg: true,
    sortSchema: true,
    schemaDestination: './src/schema.graphql'
  },
  security: {
    secret: 'kunlun',
    expiresIn: '2m',
    refreshIn: '7d',
    bcryptSaltOrRound: 10
  }
}

export default (): Config => config
