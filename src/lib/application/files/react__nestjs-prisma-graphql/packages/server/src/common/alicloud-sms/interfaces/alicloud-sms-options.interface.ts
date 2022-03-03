/**
 * @see https://usercenter.console.aliyun.com/#/manage/ak
 */
export interface AlicloudSmsOptions {
  config: {
    accessKeyId: string
    accessKeySecret: string
    /**
     * @default 'https://dysmsapi.aliyuncs.com'
     */
    endpoint?: string
    /**
     * @default 2017-05-25
     */
    apiVersion?: string
    opt?: {
      /**
       * @default 3000
       */
      timeout?: number
      /**
       * @default true
       */
      formatParams?: boolean
      /**
       * @default GET
       */
      method?: 'GET' | 'POST'
      headers?: Record<string, string | boolean | number>
    }
  }
  defaults?: {
    signName?: string
    regionId?: string
  }
  /**
   * @default false
   */
  logger?: boolean
}
