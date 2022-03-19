import { Button, Upload } from 'antd'
import useUploads from '@/hooks/useUploads'

interface KLUploadProps {
  className?: string
  value?: string[]
  onChange?: (value: string[]) => void
  children?: React.ReactNode
  maxCount?: number
  opt?: {
    mimeTypes?: string[]
    maxSize?: number
  }
}

const KLUpload = ({
  className,
  value,
  onChange,
  children,
  maxCount,
  opt
}: KLUploadProps) => {
  const { beforeUpload, customRequest, fileList, handleChange } = useUploads(
    value ?? [],
    onChange,
    opt
  )

  return (
    <Upload
      maxCount={maxCount}
      className={className}
      fileList={fileList}
      customRequest={customRequest}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {children ?? <Button className="w-30">点击上传</Button>}
    </Upload>
  )
}

export default KLUpload
