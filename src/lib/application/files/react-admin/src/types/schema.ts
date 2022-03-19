import type { JSONSchema7 } from 'json-schema'
import type { FormProps } from './antd'

/**
 * 扩展 json-schema 表单表单能力
 */
export type JSONSchema7Extend = JSONSchema7 & {
  'form-props'?: FormProps
  'properties': Record<
    string,
    JSONSchema7 & {
      'component-type'?: string
    }
  >
}

export const formJsonScehma: JSONSchema7Extend = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: 'http://example.com/root.json',
  type: 'object',
  title: 'Kunlun Form JSON Schema',
  description: '昆仑表单级 json schema',
  default: {},
  required: [],
  properties: {}
}
