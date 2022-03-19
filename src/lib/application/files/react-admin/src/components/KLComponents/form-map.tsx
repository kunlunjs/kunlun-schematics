import {
  DatePicker,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TimePicker,
  Transfer,
  AutoComplete,
  Cascader,
  Checkbox,
  Input,
  InputNumber,
  TreeSelect,
  Row,
  Col
} from 'antd'
import { omit } from 'lodash'
import type { FunctionComponent } from 'react'
import type { JsonEditorProps } from '@/toolkit/JsonEditor'
import {
  Album,
  ColorSetting,
  KLUpload,
  UrlInput,
  ParkSelect,
  SingleImageUpload,
  JsonEditor
} from '@/toolkit/index'

import type {
  AutoCompleteProps,
  CascaderProps,
  CheckboxProps,
  DatePickerProps,
  FormItemProps,
  InputNumberProps,
  InputProps,
  InputTextAreaProps,
  RadioGroupProps,
  RadioProps,
  RateProps,
  SelectProps,
  SliderProps,
  SwitchProps,
  TimePickerProps,
  TransferProps,
  TreeSelectProps,
  UploadProps
} from '@/types'
import KingEditor from './../KingEditor'
import type { IOptions, KLFormItemProps } from './helpers'

export type ExtendFormItemProps = {
  options?: IOptions
  rules?: FormItemProps['rules']
  dependenciesExtend?: KLFormItemProps['dependenciesExtend']
}

export const klComponentKeys = [
  'AutoComplete',
  'Cascader',
  'Checkbox',
  'DatePicker',
  'Input',
  'Password',
  'InputNumber',
  'Radio',
  'Radio.Group',
  'Radio.Button',
  'Rate',
  'Select',
  'Slider',
  'Switch',
  'TimePicker',
  'Transfer',
  'TreeSelect',
  'Upload',
  'TextArea',
  'Album',
  'ColorPicker',
  'UrlInput',
  'ParkSelect',
  'SingleImageUpload',
  'KingEditor',
  'KLUpload',
  'JsonEditor'
] as const
export type KLFormKeys = typeof klComponentKeys[number]

const handleOptions = (
  options: IOptions
): { label: string; value: string }[] => {
  return options.map(i => {
    if (typeof i === 'string') {
      return { label: i, value: i }
    }
    if (typeof i === 'number') {
      return { label: String(i), value: String(i) }
    }
    return i
  })
}

// TODO
export const klComponentMap: Record<KLFormKeys, FunctionComponent<any>> = {
  'AutoComplete': ({
    options,
    rules = [],
    ...props
  }: AutoCompleteProps & ExtendFormItemProps) => {
    return <AutoComplete {...props} />
  },
  'Cascader': ({
    options = [],
    rules = [],
    ...props
  }: CascaderProps & ExtendFormItemProps) => {
    console.log('Cascader: ', options, props)
    return <Cascader options={options} {...props} />
  },
  'Checkbox': ({
    options,
    rules = [],
    ...props
  }: CheckboxProps & ExtendFormItemProps) => {
    if (options) {
      // return <Checkbox.Group options={handleOptions(options)} />
      return (
        <Checkbox.Group>
          <Row>
            {handleOptions(options).map(i => {
              return (
                <Col key={i.label} span={8}>
                  <Checkbox value={i.value}>{i.label}</Checkbox>
                </Col>
              )
            })}
          </Row>
        </Checkbox.Group>
      )
    }
    return <Checkbox {...props} />
  },
  'DatePicker': ({
    rules = [],
    ...props
  }: DatePickerProps & ExtendFormItemProps) => {
    return <DatePicker {...props} />
  },
  'Input': ({ rules = [], ...props }: InputProps & ExtendFormItemProps) => {
    const placeholder = props.placeholder || '请输入'
    return <Input autoComplete="off" {...props} placeholder={placeholder} />
  },
  'Password': ({ rules = [], ...props }: InputProps & ExtendFormItemProps) => {
    const placeholder = props.placeholder || '请输入'
    return (
      <Input.Password autoComplete="off" {...props} placeholder={placeholder} />
    )
  },
  'InputNumber': ({
    rules = [],
    ...props
  }: InputNumberProps & ExtendFormItemProps) => {
    return <InputNumber {...props} />
  },
  'Radio': ({
    options,
    rules = [],
    ...props
  }: RadioProps & ExtendFormItemProps) => {
    if (options) {
      return (
        <Radio.Group {...(props as RadioGroupProps)}>
          {handleOptions(options).map(i => (
            <Radio.Button key={i.value} value={i.value}>
              {i.label}
            </Radio.Button>
          ))}
        </Radio.Group>
      )
    }
    return <Radio {...props} />
  },
  'Radio.Group': (options, props: RadioGroupProps & ExtendFormItemProps) => {
    return (
      <Radio.Group {...props}>
        {props.options?.map((i, ix) => {
          if (typeof i === 'object') {
            return (
              <Radio key={ix} value={i.value} {...omit(i, ['label', 'value'])}>
                {i.label}
              </Radio>
            )
          }
          return (
            <Radio key={ix} value={i}>
              {i}
            </Radio>
          )
        })}
      </Radio.Group>
    )
  },
  'Radio.Button': (options, props: RadioGroupProps & ExtendFormItemProps) => {
    return (
      <Radio.Group {...props}>
        {props.options?.map((i, ix) => {
          if (typeof i === 'object') {
            return (
              <Radio.Button
                key={ix}
                value={i.value}
                {...omit(i, ['label', 'value'])}
              >
                {i.label}
              </Radio.Button>
            )
          }
          return (
            <Radio.Button key={ix} value={i}>
              {i}
            </Radio.Button>
          )
        })}
      </Radio.Group>
    )
  },
  'Rate': ({
    options,
    rules = [],
    ...props
  }: RateProps & ExtendFormItemProps) => {
    return <Rate {...props} />
  },
  'Select': ({
    options = [],
    rules = [],
    ...props
  }: SelectProps & ExtendFormItemProps) => {
    const placeholder = props.placeholder || '请选择'
    return (
      <Select {...props} placeholder={placeholder}>
        {options.map((i, ix) => {
          if (typeof i === 'object') {
            return (
              <Select.Option
                key={ix}
                value={i.value}
                {...omit(i, ['label', 'value'])}
              >
                {i.label}
              </Select.Option>
            )
          }
          return (
            <Select.Option key={ix} value={i}>
              {i}
            </Select.Option>
          )
        })}
      </Select>
    )
  },
  'Slider': ({ rules = [], ...props }: SliderProps & ExtendFormItemProps) => {
    return <Slider {...props} />
  },
  'Switch': ({ rules = [], ...props }: SwitchProps & ExtendFormItemProps) => {
    return <Switch {...props} />
  },
  'TimePicker': ({
    rules = [],
    ...props
  }: TimePickerProps & ExtendFormItemProps) => {
    return <TimePicker {...props} />
  },
  'Transfer': ({
    rules = [],
    ...props
  }: TransferProps & ExtendFormItemProps) => {
    return <Transfer {...props} />
  },
  'TreeSelect': ({
    rules = [],
    ...props
  }: TreeSelectProps & ExtendFormItemProps) => {
    return <TreeSelect {...props} />
  },
  'KLUpload': ({ rules = [], ...props }: UploadProps & ExtendFormItemProps) => {
    // TODO
    // @ts-ignore
    return <KLUpload {...props} />
  },
  'Upload': ({ rules = [], ...props }: UploadProps & ExtendFormItemProps) => {
    // @ts-ignore
    return <SingleImageUpload {...props} />
  },
  'TextArea': ({
    rules = [],
    ...props
  }: InputTextAreaProps & ExtendFormItemProps) => {
    return <Input.TextArea minLength={3} {...props} />
  },
  'JsonEditor': ({
    rules = [],
    ...props
  }: JsonEditorProps & ExtendFormItemProps) => {
    return <JsonEditor {...props} />
  },
  // 'Icon': ({ rules = [], ...props }) => {
  //   return props.name ? <Icon name={props.name} /> : <div />
  // }
  'Album': ({ rules = [], ...props }) => {
    return <Album {...props} />
  },
  'ColorPicker': ({ rules = [], ...props }) => {
    return <ColorSetting {...props} />
  },
  'UrlInput': ({ rules = [], ...props }) => {
    return <UrlInput {...props} />
  },
  'ParkSelect': ({ rules = [], ...props }) => {
    return <ParkSelect {...props} />
  },
  'SingleImageUpload': ({ rules = [], ...props }) => {
    return <SingleImageUpload {...props} />
  },
  'KingEditor': ({ rules = [], ...props }) => {
    return <KingEditor {...props} />
  }
  // 'LinkSelect': ({ rules = [], ...props }) => {
  //   return <LinkSelect {...props} />
  // },
  // 'TextSetting': ({ rules = [], ...props }) => {
  //   return <TextSetting {...props} />
  // }
}
