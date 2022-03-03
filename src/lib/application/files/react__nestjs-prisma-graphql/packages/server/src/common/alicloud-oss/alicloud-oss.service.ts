import { Inject, Injectable, Logger } from '@nestjs/common'
import * as OSS from 'ali-oss'
import { ALICLOUD_OSS_MODULE_CONFIG } from './alicloud-oss.constant'
import { AlicloudOssConfig, UploadedFileMetadata } from './interfaces'
@Injectable()
export class AlicloudOssService {
  private clients: Record<string, OSS> = {}
  private defaultClient: OSS

  constructor(
    @Inject(ALICLOUD_OSS_MODULE_CONFIG)
    private readonly config: AlicloudOssConfig
  ) {}

  async upload(
    file: UploadedFileMetadata,
    options?: OSS.PutObjectOptions
  ): Promise<string> {
    try {
      if (file.bucket && !this.clients[file.bucket]) {
        const config = { ...this.config.options, bucket: file.bucket }
        this.clients[file.bucket] = new OSS(config)
      }

      const client = file.bucket
        ? this.clients[file.bucket]
        : this.defaultClient
      const filename = file.customName ?? file.originalname
      const path = file.folder ? `${file.folder}/${filename}` : filename

      const uploadResponse = await client.put(path, file.buffer, options)
      file.url = uploadResponse.url
      Logger.log(
        `Object "${filename}" upload successfully`,
        AlicloudOssService.name
      )
      return file.url
    } catch (err) {
      throw new Error(/* err */)
    }
  }
}
