import { VideoCameraOutlined } from '@ant-design/icons'
import { VodPlayer } from '@nanjing-high-tech-zone/components'
import { Button, message, Modal, Upload } from 'antd'
import type { RcFile } from 'antd/lib/upload'
import { useState } from 'react'
import { services } from '@/services'
;(() => {
  const script = document.createElement('script')
  script.src = 'https://gosspublic.alicdn.com/aliyun-oss-sdk-6.13.0.min.js'
  document.body.appendChild(script)
  const script1 = document.createElement('script')
  script1.src = '/aliyun-upload-sdk-1.5.2/aliyun-upload-sdk-1.5.2.min.js'
  document.body.appendChild(script1)
})()

export type VodUploadProps = {
  value?: string
  onChange?: (value?: string) => void
}

const VodUpload = ({ value, onChange }: VodUploadProps) => {
  const [progress, setProgress] = useState<number>()

  const [selectedFile, setSelectedFile] = useState<RcFile>()

  const onBeforeUpload = (file: RcFile) => {
    setSelectedFile(file)
    return false
  }

  const onRemove = () => {
    setSelectedFile(undefined)
  }

  const onUpload = () => {
    const uploader = new AliyunUpload.Vod({
      userId: '122',
      async onUploadstarted(uploadInfo) {
        let resp
        //上传方式，需要根据uploadInfo.videoId是否有值，调用视频点播的不同接口获取uploadauth和uploadAddress，如果videoId有值，调用刷新视频上传凭证接口，否则调用创建视频上传凭证接口
        if (uploadInfo.videoId) {
          resp = await services['VOD管理@获取VOD上传配置']({
            videoId: uploadInfo.videoId as string
          })
        } else {
          //如果uploadInfo.videoId不存在，调用获取视频上传地址和凭证接口
          resp = await services['VOD管理@获取VOD上传配置']({
            fileName: uploadInfo.file.name,
            title: uploadInfo.file.name.split('.').slice(0, -1).join('.')
          })
        }
        if (resp.success) {
          uploader.setUploadAuthAndAddress(
            uploadInfo,
            resp.data!.UploadAuth,
            resp.data!.UploadAddress,
            uploadInfo.videoId ?? resp.data!.VideoId
          )
        } else {
          message.error('上传失败')
        }
      },
      // 可选参数，设置上传进度回调
      onUploadProgress: (uploadInfo, totalSize, loadedPercent) => {
        setProgress((loadedPercent * 100) as number)
      },
      // 可选参数，设置上传成功回调
      onUploadSucceed: info => {
        setProgress(undefined)
        onRemove()
        console.log('success', info)
        setTimeout(() => {
          onChange?.(info.videoId)
        }, 1000)
      },
      // 可选参数，设置上传失败回调
      onUploadFailed: err => {
        message.error('上传失败，请重试')
        onRemove()
      }
    })
    uploader.addFile(selectedFile)
    uploader.startUpload()
  }

  const onReset = () => {
    Modal.confirm({
      title: '确认要清空视频吗？',
      onOk: () => {
        onRemove()
        onChange?.(undefined)
      }
    })
  }

  return (
    <div>
      {value && (
        <div className="mb-4">
          <VodPlayer vid={value} height="160px" />
        </div>
      )}
      <Upload
        fileList={selectedFile ? [selectedFile] : []}
        disabled={!!progress}
        accept="video/*"
        beforeUpload={onBeforeUpload}
        onRemove={onRemove}
      >
        <Button>
          <VideoCameraOutlined /> 选择文件
        </Button>
      </Upload>
      {progress && (
        <div className="bg-gray-200 h-1 my-2">
          <div
            className="h-full bg-blue-500"
            style={{
              width: `${progress}%`
            }}
          />
        </div>
      )}
      {selectedFile && (
        <div className="flex my-2 items-center">
          <Button onClick={onUpload}>确认上传</Button>
          <Button className="ml-3" onClick={onReset}>
            清空
          </Button>
        </div>
      )}
    </div>
  )
}

export default VodUpload
