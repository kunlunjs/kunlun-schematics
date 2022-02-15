declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: number
    NODE_ENV: 'development' | 'production' | 'staging'
    DATABASE_URL: string
    JWT_SECRET_KEY: string
    RESOURCE_STATIC_PATH: string
    OSS_ACCESS_KEY_ID: string
    OSS_ACCESS_KEY_SECRET: string
    OSS_REGION: string
    OSS_BUCKET: string
    PAGE_SIZE: number
    PAGE_NUMBER: number
    QUERY_LIKE: 'true' | 'false'
    VOD_ACCESS_KEY_ID: string
    VOD_ACCESS_KEY_SECRET: string
    VOD_REGION: string
  }
}

declare namespace Express {
  interface Request {
    user: any
    headers: {
      'x-guid'?: string
    }
  }
}
