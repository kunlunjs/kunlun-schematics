import type { FC } from 'react'
import { useState } from 'react'
import { SketchPicker } from 'react-color'

interface ColorSelectProps {
  value?: string
  onChangeColor: (value: any) => void
}

const ColorSelect: FC<ColorSelectProps> = (props: ColorSelectProps) => {
  const { value, onChangeColor } = props
  const [colorObj, setColorObj] = useState<any>({ background: value ?? '#fff' })
  const handleChangeComplete = (color: any) => {
    console.log(color)
    setColorObj({ background: color.rgb })
    onChangeColor?.(color.rgb)
  }
  return (
    <>
      <SketchPicker
        color={colorObj.background}
        onChangeComplete={handleChangeComplete}
      />
    </>
  )
}
export default ColorSelect
