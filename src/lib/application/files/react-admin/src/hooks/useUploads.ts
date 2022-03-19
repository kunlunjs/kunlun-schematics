import { message } from 'antd'
import type { RcFile, UploadFile } from 'antd/lib/upload/interface'
import type { UploadRequestOption } from 'rc-upload/lib/interface'
import { useCallback, useState } from 'react'
import { upload } from '@/services/a2s.adapter'
import { sizeFormat } from '@/utils'

let uid = 0

function generateUploadFiles(value?: string[]) {
  return (value ?? []).map(item => {
    const urlSplited = item.split('/')
    return {
      // eslint-disable-next-line no-plusplus
      uid: `${++uid}`,
      name: urlSplited[urlSplited.length - 1] ?? '',
      status: 'done',
      url: item
    } as UploadFile
  })
}

export default function useUploads(
  value: string[],
  onChange?: (file: string[]) => void,
  opt?: {
    mimeTypes?: string[]
    maxSize?: number
  }
) {
  const fileList = generateUploadFiles(value) ?? []
  const [loading, setLoading] = useState(false)

  const mimeTypes = opt?.mimeTypes
  const maxSize = opt?.maxSize

  const handleChange = useCallback(
    info => {
      const { status, response, url } = info.file
      if (status === 'uploading') {
        setLoading(true)
      } else if (status === 'removed') {
        const clone = [...value]
        const index = value.indexOf(url)
        if (index > -1) {
          clone.splice(index, 1)
          onChange?.(clone)
        }
      }
    },
    [onChange, value]
  )

  const customRequest: (opt: UploadRequestOption) => void = async ({
    file,
    onSuccess,
    onError
  }) => {
    // @ts-ignore
    const { success, data } = await upload(file as RcFile)
    if (!success) {
      onError?.(new Error('上传出错'))
    } else {
      // @ts-ignore
      onSuccess?.(data!, file)
      setLoading(false)
      const fileUrl = data.url
      onChange?.([...(value ?? []), fileUrl])
    }
  }

  function beforeUpload(file: File): boolean {
    let matchTypes = true
    let matchSize = true
    if (mimeTypes) {
      matchTypes = mimeTypes.includes(file.type)
      if (!matchTypes) {
        message.error(`仅支持上传 ${mimeTypes.join(' ')} 格式的文件!`)
      }
    }
    if (maxSize) {
      matchSize = file.size < maxSize
      if (!matchSize) {
        message.error(`文件必须小于 ${sizeFormat(maxSize)}!`)
      }
    }
    return matchTypes && matchSize
  }

  return {
    fileList,
    loading,
    handleChange,
    customRequest,
    beforeUpload
  }
}
