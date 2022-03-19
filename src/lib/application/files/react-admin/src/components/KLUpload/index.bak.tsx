import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Modal, Upload } from 'antd'
import type { FC } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { services } from '@/services'
import styles from './index.module.less'

// import { services } from '@/services'

interface KLUploadProps {
  value?: any
  onChange?: (valuse: any) => void
}
interface FileListProps {
  uid?: string
  name?: string
  status?: string
  url?: string
  response?: any
}
interface ObjProps {
  loading: boolean
  imageUrl: string
  previewImage: string
  previewVisible: boolean
  previewTitle: string
  fileList: Array<FileListProps>
}
const KLUpload: FC<KLUploadProps> = (props: KLUploadProps) => {
  const { value = [], onChange } = props
  const [obj, setObj] = useState<ObjProps>({
    loading: false,
    imageUrl: '',
    previewImage: '',
    previewVisible: false,
    previewTitle: '',
    fileList: []
  })
  const trigger = (current: any) => {
    onChange?.(current)
  }
  useEffect(() => {
    let arr: any[] = []
    if (value.length) {
      arr = value.map((val: any) => {
        return {
          uid: '',
          status: 'done',
          url: val
        }
      })
    }
    setObj({ ...obj, fileList: arr })
    trigger(value)
  }, [])

  const [uploadType, setUploadType] = useState('image')
  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  }
  const getOtherBase64 = (file: any, type: string, callback: any) => {
    let blob: any
    if (type === 'video') {
      blob = new Blob([file], { type: 'video/*' })
    } else if (type === 'image') {
      blob = new Blob([file], { type: 'image/*' })
    }
    const url = URL.createObjectURL(blob)
    if (file.type.startsWith('image')) {
      setUploadType('image')
    } else {
      setUploadType('video')
    }
    callback(url)
  }

  const handleCancel = () => setObj({ ...obj, previewVisible: false })
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setObj({
      ...obj,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    })
  }
  const handleChange = ({ fileList }: { fileList: Array<FileListProps> }) => {
    const list: any[] = []
    fileList.forEach((val, index) => {
      if (val?.response) {
        list[index] = val?.response?.data?.url
      }
    })
    setObj({ ...obj, fileList })
    trigger(list)
  }
  const beforeUpload = async (file: any) => {
    const type = file.type.split('/')[0]
    const form = new FormData()
    form.append('file', file)
    const res = await services['文件管理@文件上传']({ file: form })
    const arr: any[] = [...obj.fileList]
    if (res?.data?.url) {
      arr.push({ uid: '', status: 'done', url: res?.data?.url })
    }
    const list = arr.map(val => {
      return val.url
    })
    setObj({ ...obj, fileList: arr })
    trigger(list)
  }
  const upprops: any = {
    action: '',
    listType: 'picture-card',
    fileList: obj.fileList,
    multiple: true,
    onPreview: handlePreview,
    // onChange: handleChange
    beforeUpload: beforeUpload
  }

  const uploadButton = (
    <div>
      {obj.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  )

  return (
    <div className={styles.kluploadwrapper}>
      <Upload {...upprops}>
        <div className="flex-col felx">{uploadButton}</div>
      </Upload>
      <Modal
        visible={obj.previewVisible}
        title={obj.previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        {uploadType === 'image' ? (
          <img alt="example" style={{ width: '100%' }} src={obj.previewImage} />
        ) : (
          <video controls style={{ width: '100%' }}>
            <source src={obj.previewImage} type="video/mp4" />
          </video>
        )}
      </Modal>
    </div>
  )
}

export default KLUpload
