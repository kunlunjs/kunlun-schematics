import { Popover } from 'antd'
import type { FC } from 'react'
import { useState } from 'react'
import ColorSelect from '../ColorSelect'

interface BGSettingProps {
  value?: any
  onChange?: (value: any) => void
}

const ColorSetting: FC<BGSettingProps> = (props: BGSettingProps) => {
  const { value, onChange } = props
  const [status, setStatus] = useState(false)
  const [bg, setBG] = useState(value)
  const onChangeColor = (color: {
    r: number
    g: number
    b: number
    a: number
  }) => {
    setBG(`rgba(${color.r},${color.g},${color.b},${color.a})`)
    onChange?.(`rgba(${color.r},${color.g},${color.b},${color.a})`)
  }
  // useEffect(() => {
  //   document.onclick = () => {
  //     setStatus(false)
  //   }
  // }, [status])

  return (
    <>
      <Popover
        content={<ColorSelect value={value} onChangeColor={onChangeColor} />}
      >
        {!bg ? (
          <div
            className="h-6 text-center text-[10px] leading-5 w-20"
            style={{
              border: '1px solid #666'
            }}
          >
            请选择颜色
          </div>
        ) : (
          <div
            className="h-6 mt-2 w-20"
            style={{ background: bg }}
            // onClick={(e: any) => {
            //   e.nativeEvent.stopImmediatePropagation()
            //   setStatus(true)
            // }}
          />
        )}
      </Popover>
    </>
  )
}
export default ColorSetting
