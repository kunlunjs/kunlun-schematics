import { DynamicModule, Global, Module } from '@nestjs/common'
import { ALICLOUD_SMS_MODULE_OPTIONS } from './alicloud-sms.constant'
import { AlicloudSmsService } from './alicloud-sms.service'
import { AlicloudSmsOptions } from './interfaces'

@Global()
@Module({
  providers: [AlicloudSmsService],
  exports: [AlicloudSmsService]
})
export class AlicloudSmsModule {
  public static forRoot(options: AlicloudSmsOptions): DynamicModule {
    return {
      module: AlicloudSmsModule,
      providers: [
        {
          provide: ALICLOUD_SMS_MODULE_OPTIONS,
          useValue: options
        }
      ]
    }
  }
}
