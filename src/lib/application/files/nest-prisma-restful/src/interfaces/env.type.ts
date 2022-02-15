export interface EnvironmentConfiguration {
  NODE_ENV: 'development' | 'production' | string
  POET: number
  DATABASE_URL: string
  /* JWT */
  JWT_SECRET_KEY: string
  JWT_EXPIRATION_TIME: string
  /* HTTP */
  HTTP_TIMEOUT: number
  HTTP_MAX_REDIRECTS: number
  /* Cache */
  CACHE_TTL: number
  /* Redis */
  REDIS_HOST: string
  REDIS_PORT: number
  REDIS_PASSWORD: string
  /* throttle */
  THROTTLE_TTL: number
  THROTTLE_LIMIT: number
  /* upload/static server */
  RESOURCE_UPLOADMODE: string
  RESOURCE_STATIC_PATH: string
  RESOURCE_FILE_PATH: string
  /* Aliyun OSS */
  OSS_ACCESS_KEY_ID: string
  OSS_ACCESS_KEY_SECRET: string
  OSS_REGION: string
  OSS_BUCKET: string
  /* EOS */
  EOS_ACCESS_KEY_ID: string
  EOS_ACCESS_KEY_SECRET: string
  EOS_ENDPOINT: string
  EOS_BUCKET: string
}
