import { Input as InputAntd } from 'antd'
import type { FC } from 'react'
interface InputProps {}

const Input: FC<any> = (props: any) => {
  return <InputAntd {...props} />
}

export default Input
