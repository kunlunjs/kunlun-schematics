import { Image } from 'antd'
import type { FC } from 'react'
import { useState } from 'react'
import { isImageUrl } from '@/utils'

interface KLImageProps {
  items: string | string[]
  width?: number
}

export const KLImage: FC<KLImageProps> = ({ items, width = 32 }) => {
  const [visible, setVisible] = useState(false)
  return Array.isArray(items) ? (
    <>
      <Image
        preview={{ visible: false }}
        width={width}
        src={items[0]}
        onClick={() => setVisible(true)}
      />
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup
          preview={{ visible, onVisibleChange: vis => setVisible(vis) }}
        >
          {items.map(i => (
            <Image key={i} src={i} />
          ))}
        </Image.PreviewGroup>
      </div>
    </>
  ) : isImageUrl(items) ? (
    <Image width={width} src={items} />
  ) : null
}
