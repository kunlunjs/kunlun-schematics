import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Upload, Tooltip } from 'antd'
import type { UploadProps } from 'antd/lib/upload'
import Icon from '@/components/Icon'
import useUpload from '@/hooks/useUpload'
import { onPreview } from '@/utils'
import styles from './index.module.less'

export type SingleImageUploadProps = {
  value: string
  // disabled?: boolean
  onChange?: (value: string) => void
} & Omit<UploadProps, 'value' | 'onChange'>

const SingleImageUpload: React.FC<SingleImageUploadProps> = ({
  disabled,
  value,
  onChange,
  ...uploadProps
}) => {
  const { file, clean, loading, beforeUpload, handleChange, customRequest } =
    useUpload(value, onChange)

  return (
    <Upload
      {...(uploadProps as UploadProps)}
      fileList={
        file
          ? [
              {
                uid: '-1',
                url: file,
                name: '',
                status: 'success'
              }
            ]
          : []
      }
      // listType="picture-card"
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      customRequest={customRequest}
      onPreview={onPreview}
      className={styles.upload}
    >
      {file ? (
        <Tooltip
          title={
            <img
              src={file}
              alt="original"
              className="max-h-full max-w-full object-contain"
            />
          }
        >
          <div className="flex items-center">
            <img
              src={file}
              alt="thumbnail"
              className="object-contain h-10 w-auto max-w-9/10"
            />
            <DeleteOutlined
              className="cursor-pointer ml-4 !text-red-300 !hover:text-red-600"
              onClick={e => {
                e.stopPropagation()
                clean()
                onChange?.('')
              }}
            />
          </div>
        </Tooltip>
      ) : (
        <div>
          {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
          {/* <div className="mt-2">点击上传</div> */}
          {loading ? (
            <LoadingOutlined />
          ) : (
            <Button size="small" icon={<Icon name="UploadOutlined" />}>
              点击上传
            </Button>
          )}
        </div>
      )}
    </Upload>
  )
}

export default SingleImageUpload
