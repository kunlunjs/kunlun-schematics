import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Radio } from 'antd'
import type { FC } from 'react'
import { useState } from 'react'
// import Album from '../Album'
import KLUpload from '../KLUpload/index'

interface PictureSelectProps {
  values?: any
  onChange?: (values: any) => void
}

const PictureSelect: FC<PictureSelectProps> = (props: PictureSelectProps) => {
  const { values, onChange } = props
  const [showIcon, setShowIcon] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImgUrl] = useState('')
  const [current, setCurrent] = useState(1)
  const [imageList, setImageList] = useState<any[]>([])

  // 暴露上传的组件值
  const imageChange = (values: any) => {
    onChange?.(values)
  }

  return (
    <div className="bg- flex flex-col h-auto py-2 px-2  justify-center ">
      <div className="flex items-center justify-between">
        <div
          style={{ color: '#306FD7', fontWeight: '500', marginBottom: '20px' }}
        >
          图片:
        </div>
        <div className="flex items-center relative">
          <div
            onClick={() => {
              setShowIcon(!showIcon)
            }}
            style={{ fontSize: '12px', paddingLeft: '18px' }}
          >
            {showIcon ? <DownOutlined /> : <UpOutlined />}
          </div>
        </div>
      </div>
      <div style={{ marginBottom: '10px' }}>来源</div>
      <Radio.Group
        name="radiogroup"
        defaultValue={1}
        style={{ marginBottom: '10px' }}
      >
        <Radio
          value={1}
          style={{ paddingRight: '60px' }}
          onChange={() => {
            setCurrent(1)
          }}
        >
          本地
        </Radio>
        <Radio
          value={2}
          onChange={() => {
            setCurrent(2)
          }}
        >
          系统内
        </Radio>
      </Radio.Group>
      {
        current == 1 ? <KLUpload onChange={imageChange} /> : null
        // <Album onChange={imageChange} />
      }
    </div>
  )
}

export default PictureSelect
