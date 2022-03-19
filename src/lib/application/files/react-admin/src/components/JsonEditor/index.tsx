import { Input } from 'antd'
import { throttle } from 'lodash'
import type { SyntheticEvent } from 'react'
import { useState } from 'react'
import type { InputTextAreaProps } from '@/types'

type JsonType = number | string | boolean | null | object

export interface JsonEditorProps
  extends Omit<InputTextAreaProps, 'value' | 'onChange'> {
  value?: JsonType
  onChange?: (value: JsonType) => void
}

const JsonEditor = (props: JsonEditorProps) => {
  const [jsonStr, setJsonStr] = useState<string>(
    props.value ? String(props.value) : ''
  )

  const [error, setError] = useState<boolean>(false)

  const updateJson = throttle((v?: string) => {
    try {
      props.onChange?.(v ? JSON.parse(v) : null)
      setError(false)
    } catch (error) {
      // message.warn('JSON格式有误')
      setError(true)
    }
  }, 1000)

  const _onChange = (e: SyntheticEvent<HTMLTextAreaElement>) => {
    const v = e.currentTarget.value
    setJsonStr(v)
    if (!v) {
      updateJson(undefined)
      return
    }
    updateJson(v)
  }
  return (
    <>
      <Input.TextArea
        autoSize={{ minRows: 6 }}
        {...props}
        value={jsonStr}
        onChange={_onChange}
      />
      {error && (
        <div className="mt-1 text-right text-red-500">JSON格式有误</div>
      )}
    </>
  )
}

export default JsonEditor
