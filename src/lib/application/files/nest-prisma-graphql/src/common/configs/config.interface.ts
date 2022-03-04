export interface Config {
  nest: NestConfig
  cors: CorsConfig
  eos?: EOSConfig
  http?: HTTPConfig
  oss?: AliOSSConfig
  redis?: RedisConfig
  cache?: CacheConfig
  static?: StaticConfig
  swagger: SwaggerConfig
  graphql: GraphQLConfig
  throttle?: ThrottleConfig
  security: SecurityConfig
  database?: DatabaseConfig
}

export interface DatabaseConfig {
  databaseUrl: string
}

export interface NestConfig {
  port: number
}

export interface CorsConfig {
  enabled: boolean
}

export interface StaticConfig {
  uploadMode: string
  filePath: string
  staticPath: string
}

export interface SwaggerConfig {
  enabled: boolean
  title: string
  path: string
  version: string
  description: string
}

export interface GraphQLConfig {
  playgroundEnabled: boolean
  debg: boolean
  sortSchema: boolean
  schemaDestination: string
}

export interface ThrottleConfig {
  ttl: number
  limit: number
}

export interface SecurityConfig {
  secret: string
  expiresIn: string
  refreshIn: string
  bcryptSaltOrRound: string | number
}

export interface HTTPConfig {
  timeout: number
  maxRedirects: number
}

export interface CacheConfig {
  ttl: number
}

export interface RedisConfig {
  host: string
  port: number
  password: string
}

export interface AliOSSConfig {
  accessKeyId: string
  accessKeySecret: string
  region: string
  bucket: string
}

export interface EOSConfig {
  accessKeyId: string
  accessKeySecret: string
  bucket: string
  endpoint: string
}
