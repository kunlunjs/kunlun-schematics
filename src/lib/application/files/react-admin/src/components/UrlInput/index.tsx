import type { InputProps } from 'antd'
import { Select } from 'antd'
import { Input } from 'antd'

const { Option } = Select

interface UrlInputProps extends Omit<InputProps, 'onChange'> {
  value: string
  onChange: (value?: string) => void
}

const schemas: { label: string; value: string }[] = [
  { label: 'http', value: 'http://' },
  { label: 'https', value: 'https://' },
  { label: '电话', value: 'tel:' },
  { label: '邮箱', value: 'mailto:' },
  { label: '站内页', value: 'site:' }
]

const schemaPrefixRegex = new RegExp(
  `^(${schemas.map(item => item.value).join('|')})`
)

function parseFullUrl(url: string): [string, string] | undefined {
  if (url) {
    for (const schema of schemas) {
      if (url.startsWith(schema.value)) {
        return [schema.value, url.slice(schema.value.length)]
      }
    }
  }
}

const UrlInput = ({ value, onChange, ...restProps }: UrlInputProps) => {
  const splited: [string, string] = parseFullUrl(value) ?? ['', '']
  const schema = splited[0] || 'http://'
  const url = splited[1] ?? ''

  const onSchemaChange = (schema: string) => {
    onChange(`${schema}${url}`)
  }

  const onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    if (v.match(schemaPrefixRegex)) {
      onChange(v)
    } else {
      onChange(v ? `${schema}${v}` : undefined)
    }
  }

  return (
    <Input
      addonBefore={
        <Select value={schema} onChange={onSchemaChange} options={schemas} />
      }
      value={url}
      onChange={onUrlChange}
      {...restProps}
    />
  )
}

export default UrlInput
