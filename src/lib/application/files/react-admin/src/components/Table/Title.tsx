import { Space } from 'antd'
import type { FC } from 'react'
import { memo } from 'react'
import type { TableTitleProps } from '@/types'
import Icon from '../Icon'

interface KLTableTitleProps {
  title: string
}

export const KLTableTitle: FC<KLTableTitleProps> = memo(({ title }) => {
  return (
    <Space>
      <Icon name="UnorderedListOutlined" />
      {title}
    </Space>
  )
})

KLTableTitle.displayName = 'TableTitle'
// TODO fix: title is not a function
export const klTableTitle: (t: string) => TableTitleProps = title =>
  (<KLTableTitle title={title} />) as any
