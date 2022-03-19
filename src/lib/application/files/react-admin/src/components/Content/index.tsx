import { Select } from 'antd'
import type { FC } from 'react'
import { useCallback, useState } from 'react'
import BGSetting from '../BGSetting'
import ContentTitle from '../ContentTitle'
import IsLink from '../LinkSetting'
import styles from './index.module.less'

const { Option } = Select
interface ContentProps {
  item?: any
  index?: number
  ondelete?: (value: any) => void
}

const Content: FC<ContentProps> = (props: ContentProps) => {
  const { item, index, ondelete } = props
  const [isDisabled, setIsDisabled] = useState(true)
  const [isEnter, setIsEnter] = useState(false)
  const triggerChange = () => {
    console.log(22)
  }
  const changeInput = (values: any) => {
    console.log(values)
  }
  const onMouseLeave = useCallback(() => {
    setIsDisabled(true)
    setIsEnter(false)
  }, [isEnter])
  const onBGChange = (value: any) => {
    console.log(value)
  }
  const onSwitchChange = () => {
    console.log(2)
  }
  return (
    <div
      className={`${styles.contentmodel} hover:bg-[rgba(216,216,216,0.5)]`}
      onMouseLeave={onMouseLeave}
      onMouseEnter={() => {
        setIsEnter(true)
      }}
    >
      <ContentTitle
        onChange={changeInput}
        values={item}
        isEnter={isEnter}
        index={index}
        onDeleteContent={() => ondelete?.(index)}
      />
      <div className="mb-2">来源</div>
      <Select>
        <Option value="adress">地址</Option>
        <Option value="link">网址</Option>
        <Option value="phone">电话</Option>
      </Select>
      <BGSetting title="" onChange={onBGChange} />
      <div className="mt-4 py-2">按钮</div>
      <IsLink onChange={onSwitchChange} />
    </div>
  )
}

export default Content
