// import type * as AllExports from 'antd'
import { cloneDeep, omit } from 'lodash'
import type {
  AutoCompleteProps,
  CascaderProps,
  CheckboxProps,
  DatePickerProps,
  FormItemProps,
  InputNumberProps,
  InputProps,
  InputTextAreaProps,
  PasswordProps,
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
import { isChinese } from '@/utils'
import { klComponentKeys } from './form-map'

export type IOptions = ({ label: string; value: string } | string)[]

export type IKLFormItem =
  | {
      type: 'AutoComplete'
      options?: IOptions
      props?: AutoCompleteProps
    }
  | {
      type: 'Cascader'
      props?: CascaderProps
      options?: (IOptions[number] & { children?: IOptions })[]
    }
  | {
      type: 'Checkbox'
      options?: IOptions
      props?: CheckboxProps
    }
  // | {
  //     type: 'Checkbox.Group'
  //     props?: CheckboxGroupProps
  //     options?: ({ label: string; value: string } | string)[]
  //   }
  | {
      type: 'DatePicker'
      props?: DatePickerProps
    }
  | {
      type: 'Input'
      props?: InputProps
    }
  | {
      type: 'Password'
      props?: PasswordProps
    }
  | {
      type: 'InputNumber'
      props?: InputNumberProps
    }
  | {
      type: 'Radio'
      button?: boolean // 'Radio.Button'
      options?: IOptions
      props?: RadioProps
    }
  // | {
  //     type: 'Radio.Group'
  //     props?: RadioGroupProps
  //   }
  // | {
  //     type: 'Radio.Button'
  //     props?: RadioButtonProps
  //   }
  | {
      type: 'Rate'
      options?: IOptions
      props?: RateProps
    }
  | {
      type: 'Select'
      options?: IOptions
      props?: SelectProps
    }
  | {
      type: 'Slider'
      props?: SliderProps
    }
  | {
      type: 'Switch'
      props?: SwitchProps
    }
  | {
      type: 'TimePicker'
      props?: TimePickerProps
    }
  | {
      type: 'Transfer'
      props?: TransferProps
    }
  | {
      type: 'TreeSelect'
      props?: TreeSelectProps
    }
  | {
      type: 'Upload'
      props?: UploadProps
    }
  | {
      type: 'TextArea'
      props?: InputTextAreaProps
    }
  | {
      type: 'JsonEditor'
      props?: InputTextAreaProps
    }
  | {
      type: 'KingEditor'
      props?: any
    }
  | {
      type: 'KLUpload'
      props?: any
    }

const strategies = [
  'Reverse', // [boolean]取反
  'Not', // 不等于依赖项的值
  'Equal', // 等于依赖项的值
  'EqualTo', // 等于某个值
  'LessThan', // [number]小于
  'LessThanOrEqual', // [number]小于或等于
  'MoreThan', // [number]大于
  'MoreThanOrEqual', // [number]大于或等于
  'Like', // [string]相似
  'ILike', // [string]忽略大小写相似
  'Any', // 存在
  'IsNull', // 不为空
  'Raw', // 原始值
  'In', // 在 xx 中可选
  'Between' // 在 xx 范围
] as const

export type KLFormItemProps = IKLFormItem & {
  package?: 'antd' | 'kunlun' // default: 'antd' 组件库
  componentKey?: string
  // 组件名
  componentName?: string
  // 表单项分组
  group?: string
  groupKey?: string
  // 分组标题
  groupTitle?: string
  // 分组类型
  groupType?: 'Tab' | 'Collapse'
  // 一行多个表单项，占行 1/4 1/2 3/4
  span?: 6 | 12 | 18 | '1/4' | '1/2' | '3/4'
  // 注释等额外附着信息，\n 表示换行
  documentation?: string
  valueConfig?: {
    type?: 'string' | 'boolean' | 'integer' | 'float' // 值类型，如不是则尝试隐式转换 'true' -> true 'false' -> false 0 -> false >1 -> true '123' -> 123 123 -> '123'
    // isId?: boolean
    isPrimitive?: boolean // default: true 是否基本类型值
    isRandom?: boolean // default: false 是否可以是随机值，可以配合 mockType 使用
    mockType?: string // mock 函数，参考 mockjs 和 fakerjs
    isList?: boolean // 是否多值，如对于 Select 的 'multi' 模式
    isUnique?: boolean // 是否唯一，同组同类型表单项值不能重复
    isRequired: boolean // default: false 是否必须
    isNullable?: boolean // default: false 是否可为空
    isReadonly?: boolean // default: false 是否只读，即禁用
    isGenerated?: boolean // default: false 是否自动生成
    hasDefaultValue?: // 是否有默认值
    string | string[] | number | number[] | boolean | boolean[]
  }
  /**
   * 表单项依赖扩展
   * 不满足某某条件就：'抛出校验异常' | '禁用' | '隐藏'
   */
  dependenciesExtend?: {
    // 策略
    strategy: typeof strategies[number]
    // 配合 strategy: 'EqualTo'
    equalTo?: string | number | boolean
    // 配合 strategy: 'In'
    ins?: (number | string | boolean)[]
    // 配合 strategy: 'Between'
    between?: [number, number]
    // 依赖该表单项（可能多个）的行为：显示校验异常、 disabled - 禁用，hidden - 隐藏
    // 自身表单项值不符合条件则只显示校验错误
    behavior?: 'disabled' | 'hidden'
  }[]
} & Partial<FormItemProps>

/**
 * 获取表单项 Label 宽度
 * @param items {KLFormItemProps[]} 表单数组
 * @returns {number} 最大宽度
 */
export function calcMaxLabelSpan(items: KLFormItemProps[], chineseWidth = 0.6) {
  return Math.ceil(
    Math.max(
      ...items
        .map(i => {
          const t = i.label || i.name || ''
          if (typeof t === 'string') {
            const len = t.split('').reduce((sum, cur) => {
              if (isChinese(cur)) {
                // 中文占1个宽度
                sum += chineseWidth
              } else {
                // 英文数字占1个半宽度
                sum += 0.5
              }
              return sum
            }, 0)
            return len
          }
          return 0
        })
        .filter(Boolean)
    )
  )
}

export const parseComponentConfigItem = (items: any) => {
  const forms: KLFormItemProps[] = []
  Object.entries(items).forEach(([k, v]) => {
    // @ts-ignore
    const {
      componentKey,
      componentName,
      group,
      groupKey,
      groupTitle,
      type,
      label,
      uiType,
      uiProps = {},
      properties,
      required = false,
      dependencies = [],
      default: defaultValue,
      dependenciesExtend = []
    }: any = v
    if (
      type === 'string' ||
      type === 'boolean' ||
      type === 'integer' ||
      type === 'float'
    ) {
      const item = {
        componentKey,
        componentName,
        // @ts-ignore
        type: klComponentKeys.includes(uiType) ? uiType : 'Input',
        label,
        name: k,
        required,
        dependencies,
        props: uiProps,
        dependenciesExtend,
        initialValue: defaultValue
      } as KLFormItemProps
      if (group) {
        item.group = group
        item.groupKey = groupKey
        item.groupTitle = groupTitle || group
      }
      if (uiProps.options) {
        // @ts-ignore
        item.options = uiProps.options
      }
      forms.push(item)
    }
  })
  return forms
}

export const componentConfigToKLFormItems = (
  componentConfig: any = {}
): KLFormItemProps[] => {
  const { key, label, config: propsConfig = {} } = cloneDeep(componentConfig)
  const componentKey = key // componentConfig.componentKey || key
  const componentName = label // componentConfig.componentName || label
  const forms: KLFormItemProps[] = []
  // console.log('componentKey: ', componentKey, 'componentName: ', componentName)
  Object.entries(propsConfig).forEach(([k, v]) => {
    // @ts-ignore
    const { type, label: label1 } = v
    /**
     * {
          label: '内容页头部',
          key: 'ContentHeader',
          config: {
            name: {
              type: 'string',
              label: '标题',
              required: true
            },
            //...
          }
        }
        // values 结构
        {
          components: [
            {
              compName: 'HomeHeader',
              props: {
                name: '值'
              }
            }
          ]
        }
     */
    if (type && type !== 'array' && type !== 'object') {
      forms.push(
        ...parseComponentConfigItem({
          // @ts-ignore
          [`${componentKey}.${k}`]: { ...v, componentKey, componentName }
        })
      )
    }
    /**
     * {
          key: 'HomeContent',
          label: '园区地图',
          version: '0.0.1',
          visible: false,
          config: {
            items: {
              type: 'array',
              label: '园区列表',
              required: true,
              items: {
                type: 'object',
                label: '园区信息',
                properties: {
                  name: {
                    type: 'string',
                    label: '园区名称',
                    uiType: 'Select',
                    uiProps: { options: ['string'] },
                    required: true
                  },
                  //...
                }
              }
            },
            defaultSelected: {
              type: 'string',
              label: '默认选中园区',
              uiType: 'Select',
              uiProps: { options: ['string'] }
            }
          }
        }
        // values 结构
        {
          components: [
            {
              compName: 'HomeHeader',
              props: {
                {
                  items: [
                    {
                      name: '玄武区', xxx
                    }
                  ],
                  defaultSelected: '玄武区'
                }
              }
            }
          ]
        }

     */

    // @ts-ignore
    if (type === 'array' && v?.items?.properties) {
      // @ts-ignore
      const { label: labele2 } = v.items
      // @ts-ignore
      v.items.properties = Object.entries(v!.items!.properties).reduce(
        (acc, [kk, vv], kkx) => {
          // @ts-ignore
          acc[`${componentKey}.items.0.${kk}`] = {
            componentKey,
            componentName,
            // acc[kk] = {
            // @ts-ignore
            ...vv,
            group: label1,
            groupTitle: `${componentName}/${label1}/${labele2}`
          }
          return acc
        },
        {}
      )
      // @ts-ignore
      forms.push(...parseComponentConfigItem(v!.items!.properties))
    }
    /**
     * {
          key: 'HomeContent',
          label: '主内容',
          version: '0.0.1',
          config: {
            banner: {
              group: '轮播',
              groupItems: {
                items: {
                  type: 'array',
                  label: '轮播列表',
                  items: {
                    type: 'object',
                    label: '轮播项',
                    properties: {
                      title: {
                        type: 'string',
                        label: '标题',
                        required: true
                      },
                      //...
                    }
                  }
                },
                groupItemsOtherKey: {
                  label: 'SEO 描述',
                  type: 'string',
                  uiType: 'TextArea'
                }
              }
            },
            //...
          }
        }
        // values 结构
        {
          components: [
            {
              compName: 'HomeHeader',
              props: {
                banner: {
                  items: [
                    { title: 'xxx',url: 'xxx',img: 'xxx'  },
                    //...
                  ]
                },
                map: {
                  items: [
                    {
                      name: '栖霞区',
                      //...
                    }
                  ]
                },
                articlesLeft: {
                  categories: [
                    { lable: '政策解读', color: 'red' },
                    { lable: '政策v', color: 'blue' },
                  ],
                  direction: 'left',
                  //...
                },
                articlesRight: {
                  categories: [
                    { lable: '新闻资讯', color: 'blue' },
                    //...
                  ],
                  direction: 'right',
                  //...
                }
              }
            }
          ]
        }
     */
    if (
      // @ts-ignore
      v.group &&
      // @ts-ignore
      v?.groupItems?.items &&
      // @ts-ignore
      v?.groupItems?.items?.type === 'array' &&
      // @ts-ignore
      v?.groupItems?.items?.items?.properties
    ) {
      // @ts-ignore
      const { group } = v
      // @ts-ignore
      const { label: label1 } = v!.groupItems!.items
      // @ts-ignore
      const { label: labele2 } = v!.groupItems!.items!.items
      // @ts-ignore
      v.groupItems.items.items.properties = Object.entries(
        // @ts-ignore
        v.groupItems.items.items.properties
      ).reduce((acc, [kk, vv], kkx) => {
        // @ts-ignore
        acc[`${componentKey}.${k}.items.0.${kk}`] = {
          componentKey,
          componentName,
          // acc[kk] = {
          // @ts-ignore
          ...vv,
          group,
          groupTitle: `${componentName}/${group}/${label1}/${labele2}`
        }
        return acc
      }, {})
      forms.push(
        // @ts-ignore
        ...parseComponentConfigItem(v.groupItems.items.items.properties)
      )
    }
    // if (
    //   // @ts-ignore
    //   v.group &&
    //   // @ts-ignore
    //   v?.groupItems &&
    //   // @ts-ignore
    //   v?.groupItems?.items &&
    //   // @ts-ignore
    //   Object.keys(omit(v.groupItems, ['items'])).length
    // ) {
    //   // @ts-ignore
    //   const otherItems = Object.entries(omit(v.groupItems, ['items'])).reduce(
    //     (acc, [kk, vv]) => {
    //       // @ts-ignore
    //       acc[`${componentKey}.${k}.${kk}`] = {
    //         // @ts-ignore
    //         ...vv,
    //         // @ts-ignore
    //         group: v.group,
    //         // @ts-ignore
    //         groupTitle: `${componentName}/${v.group}`,
    //         componentKey,
    //         componentName
    //       }
    //       return acc
    //     },
    //     {}
    //   )
    //   forms.push(...parseComponentConfigItem(otherItems).flat())
    // }
    /**
     * {
          key: 'HomeHeader',
          label: '首页头部',
          version: '0.0.1',
          config: {
            logo: {
              group: 'Logo',
              groupItems: {
                name: {
                  type: 'string',
                  label: '标题',
                  required: true
                },
                //...
              }
            }
          }
        }
        // values 结构
        {
          components: [
            {
              compName: 'HomeHeader',
              props: {
                logo: {
                  name: '测试',
                  //...
                }
              }
            }
          ]
        }
     */
    if (
      // @ts-ignore
      v.group &&
      // @ts-ignore
      v.groupItems &&
      // @ts-ignore
      Object.keys(omit(v.groupItems, ['items']))
        .length /* && !v.groupItems.items */
    ) {
      // @ts-ignore
      const otherItems = Object.entries(v.groupItems).reduce(
        (acc, [kk, vv]) => {
          // @ts-ignore
          if (kk !== 'items' && vv.type !== 'array' && vv.type !== 'object') {
            // @ts-ignore
            acc[`${componentKey}.${k}.${kk}`] = {
              // acc[kk] = {
              componentKey,
              componentName,
              // @ts-ignore
              ...vv,
              // @ts-ignore
              group: v.group,
              // @ts-ignore
              groupTitle: `${componentName}/${v.group}`
            }
          }
          // @ts-ignore
          if (kk !== 'items' && vv.type === 'array' && vv?.items?.properties) {
            // @ts-ignore
            Object.entries(vv?.items?.properties).forEach(
              ([kkk, vvv], kkkx) => {
                // @ts-ignore
                acc[`${componentKey}.${k}.${kk}.0.${kkk}`] = {
                  // acc[kk] = {
                  componentKey,
                  componentName,
                  // @ts-ignore
                  ...vvv,
                  // @ts-ignore
                  group: v.group,
                  // @ts-ignore
                  groupTitle: `${componentName}/${v.group}/${vv.label}`
                }
              }
            )
          }
          return acc
        },
        {}
      )
      // @ts-ignore
      forms.push(...parseComponentConfigItem(otherItems))
    }
  })
  return forms
}

// const forms = componentConfigToKLFormItems(example1)
// console.log('forms: ', forms)
