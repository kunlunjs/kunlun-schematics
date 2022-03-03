// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import * as RPCClient from '@alicloud/pop-core'
import { Inject, Injectable, Logger } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { AlicloudSmsOptions, AlicloudSmsResponse } from './interfaces'
import { ALICLOUD_SMS_MODULE_OPTIONS } from '.'

@Injectable()
export class AlicloudSmsService {
  private client: RPCClient

  constructor(
    @Inject(ALICLOUD_SMS_MODULE_OPTIONS)
    private readonly options: AlicloudSmsOptions
  ) {
    const config = {
      ...{
        endpoint: 'https://dysmsapi.aliyuncs.com',
        apiVersion: '2017-05-25'
      },
      ...this.options.config
    }
    this.client = new RPCClient(config)
  }

  /**
   * Send message
   * @template T
   * @param {string} templateCode 短信模板ID
   * @param {string | string[]} phoneNumbers 接受短信的手机号码
   * @param {T} templateParam 短信模板变量对应的实际值，JSON格式
   * @param {string} signName 短信签名名称
   * @param {string} regionId 地区ID
   * @returns {(Promise<boolean | null>)}
   * @memberof AlicloudSmsService
   */
  async sendSms(
    templateCode: string,
    phoneNumbers: string | string[],
    templateParam: Record<string, string> | string,
    signName?: string,
    regionId?: string
  ) {
    if (!signName && !this.options?.defaults?.signName) {
      Logger.error('Error encountered: "SignName" was not provided')
    }

    if (!regionId && !this.options?.defaults?.regionId) {
      Logger.error('Error encountered: "RegionId" was not provided.')
    }

    const params = {
      RegionId: regionId ?? this.options?.defaults?.regionId,
      SignName: signName ?? this.options?.defaults?.signName,
      PhoneNumbers: Array.isArray(phoneNumbers)
        ? phoneNumbers.join(',')
        : phoneNumbers,
      TemplateCode: templateCode,
      TemplateParam:
        typeof templateParam === 'string'
          ? templateParam
          : JSON.stringify(templateParam)
    }

    try {
      const requestOption = { method: 'POST' }
      const response: AlicloudSmsResponse = await this.client.request(
        'SendSms',
        params,
        requestOption
      )

      if (this.options.logger) {
        if (response.Message === 'OK') {
          Logger.log(
            `Sent message to "${params.PhoneNumbers}" successfully.`,
            'AlicloudSmsModule'
          )
        } else {
          Logger.warn(
            `Sent message to "${params.PhoneNumbers}" failed, response "${response.Message}".`,
            'AlicloudSmsModule'
          )
        }
      }
    } catch (err) {
      // throw err // new Error(err)
    }
  }
}
