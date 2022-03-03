import { DynamicModule, Global, Module } from '@nestjs/common'
import { ALICLOUD_OSS_MODULE_CONFIG } from './alicloud-oss.constant'
import { AlicloudOssService } from './alicloud-oss.service'
import { AlicloudOssConfig } from './interfaces'

@Global()
@Module({
  providers: [AlicloudOssService],
  exports: [AlicloudOssService]
})
export class AlicloudOssModule {
  public static withConfig(config: AlicloudOssConfig): DynamicModule {
    return {
      module: AlicloudOssModule,
      providers: [
        {
          provide: ALICLOUD_OSS_MODULE_CONFIG,
          useValue: config
        }
      ]
    }
  }
}
