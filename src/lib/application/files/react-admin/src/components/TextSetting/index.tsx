import { createFromIconfontCN } from '@ant-design/icons'
import { Select } from 'antd'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import ColorSelect from '../ColorSelect'
import styles from './index.module.less'

const { Option } = Select
interface TextObj {
  fontStyle?: string
  fontSize?: number
  fontWeight?: string
  fontItalic?: string
  underline?: string
  color?: string
}
interface TextProps {
  value?: any
  onChange?: (value: TextObj) => void
  nullDisplay?: () => void
}
const TextSetting: FC<TextProps> = (props: TextProps) => {
  const { value, onChange, nullDisplay } = props
  const MyIcon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2637867_386w7vq7hot.js' // 在 iconfont.cn 上生成
  })
  const [selectColor, setSelectColor] = useState(false)
  const [textObj, settextObj] = useState<TextObj>({
    fontStyle: 'font-san',
    fontSize: 16,
    fontWeight: 'normal',
    fontItalic: 'not-italic',
    underline: 'no-underline',
    color: 'rgba(0,0,0,0,1)'
  })
  const [textStatus, setTextStatus] = useState({
    fontWeight: false,
    fontItalic: false,
    underline: false
  })

  const triggerChange = (changedValue: TextObj) => {
    onChange?.({
      ...textObj,
      ...value,
      ...changedValue
    })
  }

  const handleChangeFontStyle = (value: any) => {
    settextObj({ ...textObj, fontStyle: value })
    triggerChange({ fontStyle: value })
  }
  const handleChangeFontSize = (value: any) => {
    settextObj({ ...textObj, fontSize: value })
    triggerChange({ fontSize: value })
  }
  const changeFontWeight = () => {
    let fontWeight = 'normal'
    if (!textStatus.fontWeight) {
      setTextStatus({ ...textStatus, fontWeight: true })
      fontWeight = 'bold'
    } else {
      setTextStatus({ ...textStatus, fontWeight: false })
    }
    settextObj({ ...textObj, fontWeight: fontWeight })
    triggerChange({ fontWeight: fontWeight })
  }
  const changeFontItalic = () => {
    let fontItalic = 'not-italic'
    if (!textStatus.fontItalic) {
      fontItalic = 'italic'
      setTextStatus({ ...textStatus, fontItalic: true })
    } else {
      setTextStatus({ ...textStatus, fontItalic: false })
    }
    settextObj({ ...textObj, fontItalic: fontItalic })
    triggerChange({ fontItalic: fontItalic })
  }
  const changeFontUnderline = () => {
    let underline = 'no-underline'
    if (!textStatus.underline) {
      underline = 'underline'
      setTextStatus({ ...textStatus, underline: true })
    } else {
      setTextStatus({ ...textStatus, underline: false })
    }
    settextObj({ ...textObj, underline: underline })
    triggerChange({ underline: underline })
  }
  const changeFontColor = (e: any) => {
    e.nativeEvent.stopImmediatePropagation()
    setSelectColor(true)
  }
  const onChangeColor = (color: {
    r: number
    g: number
    b: number
    a: number
  }) => {
    settextObj({
      ...textObj,
      color: `rgba(${color.r},${color.g},${color.b},${color.a})`
    })
    triggerChange({
      color: `rgba(${color.r},${color.g},${color.b},${color.a})`
    })
  }
  useEffect(() => {
    document.onclick = () => setSelectColor(false)
  }, [selectColor])
  return (
    <div
      className={`bg-white rounded-[4px] ${styles.texwrapperblock} p-4 text-24px w-60`}
    >
      <div className="flex border-1 text-wrapper-block-title pb-2 text-18px items-center justify-between">
        <span>文字设置</span>
        <span
          className="text-[rgba(0,0,0,0.6)] text-22px"
          onClick={() => {
            nullDisplay?.()
          }}
        >
          x
        </span>
      </div>
      <div className="mt-6 mb-2">大标题设置</div>
      <div className="flex">
        <div className="flex-1 mr-4">
          <div className="my-4 text-16px text-[rgba(0,0,0,0.8)]">字体</div>
          <Select
            defaultValue="font-sans"
            style={{ width: 145 }}
            onChange={handleChangeFontStyle}
          >
            <Option value="font-sans">sans</Option>
            <Option value="font-serif">serif</Option>
            <Option value="font-mono">mono</Option>
            {/* <Option value="Arial">Arial</Option>
            <Option value="tahoma">Tahoma</Option>
            <Option value="verdan">Verdana</Option>
            <Option value="serif">Serif</Option>
            <Option value="sans-serif">Sans-Serif</Option>
            <Option value="monospace">Monospace</Option>
            <Option value="cursive">Cursive</Option>
            <Option value="fantasy">Fantasy</Option> */}
          </Select>
        </div>
        <div className="w-50px">
          <div className="my-4 text-16px text-[rgba(0,0,0,0.8)]">字号</div>
          <Select
            defaultValue="中号"
            style={{ width: 60 }}
            onChange={handleChangeFontSize}
          >
            <Option value="32">超大</Option>
            <Option value="28">大</Option>
            <Option value="22">中</Option>
            <Option value="16">小</Option>
          </Select>
        </div>
      </div>
      <div className="flex mt-4 items-center justify-center">
        <div
          className={`font-bold flex-1 text-center ${
            textStatus.fontWeight ? 'text-[#e42e2ed9]' : ''
          }`}
          onClick={changeFontWeight}
        >
          B
        </div>
        <div
          className={`font-bold flex-1 text-center italic ${
            textStatus.fontItalic ? 'text-[#e42e2ed9]' : ''
          }`}
          onClick={changeFontItalic}
        >
          I
        </div>
        <div
          className={`font-bold flex-1 text-center underline ${
            textStatus.underline ? 'text-[#e42e2ed9]' : ''
          }`}
          onClick={changeFontUnderline}
        >
          U
        </div>
        <div
          className="font-bold flex-1 text-center relative"
          onClick={changeFontColor}
        >
          <div>A</div>
          <MyIcon
            type="icon-icon-color-water"
            style={{ fontSize: '20px' }}
            className="top-[8px] right-[8px] absolute"
          />
          {selectColor ? (
            <div className="absolute">
              <ColorSelect onChangeColor={onChangeColor} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default TextSetting
