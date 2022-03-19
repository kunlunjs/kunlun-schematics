import { message } from 'antd'
// @ts-ignore
import type { UploadRequestOption } from 'rc-upload/lib/interface'
import { useCallback, useEffect, useState } from 'react'
import { upload } from '@/services/a2s.adapter'
import { sizeFormat } from '@/utils'

export default function useUpload(
  value: string,
  onChange?: (file: string) => void,
  opt?: {
    mimeTypes: string[]
    maxSize: number
  }
) {
  const [uploadFile, setUploadFile] = useState(value)
  const [loading, setLoading] = useState(false)

  const mimeTypes = opt?.mimeTypes
  const maxSize = opt?.maxSize

  useEffect(() => {
    setUploadFile(value)
  }, [value])

  const handleChange = useCallback(
    info => {
      if (info.file.status === 'uploading') {
        setLoading(true)
        return
      }
      // if (info.file.status === 'done') {
      //   const fileUrl = info.file.response.url
      //   setUploadFile(fileUrl)
      //   setLoading(false)
      //   onChange?.(fileUrl)
      // }
    },
    [onChange]
  )

  const customRequest: (opt: UploadRequestOption) => void = async ({
    file,
    onSuccess,
    onError
  }) => {
    // @ts-ignore
    const { success, data, message } = await upload(file as File)
    if (!success) {
      onError!(new Error(message))
    } else {
      onSuccess!(data!.url)
      setUploadFile(data!.url)
      setLoading(false)
      onChange?.(data!.url)
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
        message.error(`图片大小必须小于 ${sizeFormat(maxSize)}!`)
      }
    }
    return matchTypes && matchSize
  }

  return {
    file: uploadFile,
    loading,
    clean: () => setUploadFile(''),
    handleChange,
    customRequest,
    beforeUpload
  }
}
