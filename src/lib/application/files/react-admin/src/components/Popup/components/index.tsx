import { Select } from 'antd'
import type { FC } from 'react'
import styles from './index.module.less'
interface aboutProps {
  //   data?: string
}
const AntdInput: FC<any> = (props: any) => {
  const { data, arr } = props
  const { Option } = Select
  return (
    <div className={`flex flex-col ${styles.antdinputcom}`}>
      <label>{data}</label>
      <Select className=".w-full">
        {arr.map((value: any, index: any) => {
          return (
            <Option value="value" key={index}>
              {value}
            </Option>
          )
        })}
      </Select>
    </div>
  )
}

export default AntdInput
