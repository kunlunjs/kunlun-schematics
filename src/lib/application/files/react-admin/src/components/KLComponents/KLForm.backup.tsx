import { Form, Collapse, Tabs, Row, Col } from 'antd'
import { cloneDeep, omit, set } from 'lodash'
import type { ForwardRefRenderFunction } from 'react'
import { useEffect } from 'react'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import type { FormItemProps, FormProps, FormRef } from '@/types'
import PanelHeader from './PanelHeaderExtra'
import { klComponentMap } from './form-map'
import { calcMaxLabelSpan } from './helpers'
import type { KLFormItemProps, IOptions } from './helpers'
import { klComponentKeys } from '.'

export type KLFormProps = Partial<FormProps> &
  Partial<FormItemProps> & {
    /**
     * 使用场景
     */
    scene?: 'search' | 'modal' | 'config'
    /**
     * 表单项间隔
     */
    formItemGutter?: number
    /**
     * 表单项
     */
    itemValues: KLFormItemProps[]
    /**
     * 表单初始值
     */
    initialValues?: any
    /**
     * 表单值变化回调
     * changeValues 当前变化值
     * values 所有值
     */
    onValuesChange?: (changeValues: any, values: any) => void
    onItemsChange?: (itemValues: KLFormItemProps[]) => void
  }

export const defaultLabelCol = { span: 3 }
export const defaultWrapperCol = { span: 20 }
function getColSpan(span?: KLFormItemProps['span']): number {
  const spanMap = {
    '1/4': 4,
    '1/2': 12,
    '3/4': 18
  }
  if (typeof span === 'number') {
    return span
  }
  if (typeof span === 'string') {
    return spanMap[span]
  }
  return 24
}

type FormItemStatus = Record<string, '' | 'none' | 'disabled'>

const getInitialDisplay = (items: KLFormItemProps[]) => {
  return {
    items: cloneDeep(items),
    display:
      items &&
      items.reduce((i, j) => {
        if (typeof j.name === 'string') {
          i[j.name] = ''
        }
        return i
      }, {} as FormItemStatus)
  }
}

const groupTypeMap = { Collapse, Tabs }

const KLFormWithRef: ForwardRefRenderFunction<FormRef, KLFormProps> = (
  {
    scene,
    itemValues,
    colon,
    trigger,
    layout,
    required,
    labelAlign,
    hasFeedback,
    onValuesChange,
    onItemsChange,
    formItemGutter = 8,
    labelCol = defaultLabelCol,
    wrapperCol = defaultWrapperCol,
    initialValues = {},
    ...formProps
  },
  ref
) => {
  const [form] = Form.useForm()
  const [items, setItemData] = useState<KLFormItemProps[]>(itemValues)

  const initial = useRef<{ items: KLFormItemProps[]; display: FormItemStatus }>(
    getInitialDisplay(items)
  )
  const [display, setDisplay] = useState<FormItemStatus>(
    initial.current.display
  )

  const formatData = (): KLFormItemProps[][] => {
    const scene = 'config'
    const rows: any = []
    for (let ix = 0; ix < items.length; ) {
      const item = items[ix]
      let rowType
      if (typeof item.name === 'string') {
        rowType = item.name.split('.')?.[1]
      }

      if (!scene) {
        rows.push(items[ix])
        ix++
        continue
      }
      if (
        item.group &&
        items[ix + 1] &&
        items[ix + 1].group === item.group &&
        rowType
      ) {
        const cols = [
          items[ix], // <Col key={`col-${ix}`}>{getFormItem(ix)}</Col>,
          items[ix + 1] // <Col key={`col-${ix + 1}`}>{getFormItem(ix + 1)}</Col>
        ]
        ix += 2
        const cx = ix
        for (let inx = cx; inx < items.length; ) {
          if (items[inx] && items[inx].group === item.group) {
            // cols.push(<Col key={`col-${inx}`}>{getFormItem(inx)}</Col>)
            cols.push(items[inx])
            inx += 1
            ix += 1
          } else {
            break
          }
        }
        // const row = <Row gutter={formItemGutter}>{cols}</Row>
        const row = cols
        rows.push(row)
      } else {
        rows.push([items[ix]])
        ix += 1
      }
    }
    return rows
  }

  useEffect(() => {
    if (scene === 'search' || scene === 'modal') {
      setItemData(itemValues)
    } else if (scene === 'config') {
      const rowTemp = formatData()
      let newItems: KLFormItemProps[] = []
      const getNameReg = (name: string) => {
        return (name as string).split('.')
      }
      // const datas: any = {}
      rowTemp.forEach(row => {
        const rowType =
          typeof row[0].name === 'string' ? row[0].name.split('.')?.[1] : ''
        if (rowType && initialValues instanceof Object) {
          if (
            initialValues[rowType] &&
            !Array.isArray(initialValues[rowType])
          ) {
            Object.entries(initialValues[rowType]).map(item => {
              if (item[1] instanceof Array) {
                // 数组结构  [{a:1,b:2}, {a:2,b:3}]
                return item[1].map((formData, index) => {
                  const nameArr = Object.entries(formData).map(item => item[0])
                  const newRow = row
                    .filter(r => {
                      const nameReg = getNameReg(r.name as string)
                      return nameArr.includes(nameReg[nameReg.length - 1])
                    })
                    .map(r => {
                      const nameReg = getNameReg(r.name as string)
                      const _index = nameReg.findIndex(
                        item => !isNaN(Number(item))
                      )
                      if (_index !== -1) {
                        if (nameArr.includes(nameReg[nameReg.length - 1])) {
                          const names = [...nameReg]
                          names.splice(_index, 1, `${index}`)
                          //  const name = names.filter(name => name !== '.').join('.')
                          const name = names.reduce((pre, cur) => {
                            if (!isNaN(Number(cur))) {
                              return `${pre}.${cur}`
                            } else {
                              return `${pre}.${cur}`
                            }
                          })
                          const initialValue =
                            formData[nameReg[nameReg.length - 1]]
                          return { ...r, name, initialValue }
                        }
                      }
                      return r
                    })
                  newItems = [...newItems, ...newRow]
                })
              } else {
                // 非数组结构  ["groupItemsOtherKey": "231"]
                const newRow = row.filter(ele => {
                  if (
                    typeof ele.name === 'string' &&
                    ele.name?.split('.')?.[2] === item[0]
                  ) {
                    ele.initialValue = item[1]
                  }
                  return (
                    typeof ele.name === 'string' &&
                    ele.name?.split('.')?.[2] === item[0]
                  )
                })
                newItems = [...newItems, ...newRow]
              }
            })
          } else {
            initialValues &&
              row &&
              initialValues[rowType] &&
              row.forEach((val: any) => {
                const idx = val.name.split('.')[2]
                const ele = val.name.split('.')[3]
                val.initialValue = initialValues[rowType][idx][ele]
              })
          }
        }
      })
      if (newItems.length) {
        setItemData(newItems)
      } else {
        setItemData(items)
      }
    }
  }, [itemValues, initialValues])

  // useEffect(() => {
  //   if (items.length !== initial.current.items.length) {
  //     initial.current = getInitialDisplay(items)
  //   }
  // }, [items])

  useImperativeHandle(ref, () => {
    return {
      getValues() {
        return getValues()
      },
      getFormInstance() {
        return form
      },
      clearFormValues() {
        const names = getFieldNames()
        form.setFieldsValue(
          names.reduce((a, b) => {
            a[b] = undefined
            return a
          }, {} as Record<string, undefined>)
        )
      }
    }
  })

  const getValues = () => {
    const values = form.getFieldsValue()
    const allValues = {} // { compName: '', props: {} }
    items.forEach(i => {
      if (typeof i.name === 'string') {
        const arr = i.name
          .replaceAll('][', '.')
          .replaceAll('[', '.')
          .replaceAll(']', '')
          .split('.')
        // allValues.compName = arr[0]
        if (
          arr[1] &&
          arr[2] &&
          isNaN(Number(arr[2])) &&
          arr[3] &&
          typeof Number(arr[3]) === 'number' &&
          arr[4]
        ) {
          set(
            // allValues.props,
            allValues,
            `${arr[1]}.${arr[2]}.${arr[3]}.${arr[4]}`,
            values[i.name]
          )
        }
        if (arr[1] && arr[2] && isNaN(Number(arr[2])) && !arr[3]) {
          set(allValues, `${arr[1]}.${arr[2]}`, values[i.name])
        }
      }
    })
    return allValues
  }

  const getFieldNames = () => {
    const names: string[] = []
    items.forEach(i => {
      // TODO ['name', 'child']
      if (typeof i.name == 'string') {
        names.push(i.name)
      }
    })
    return names
  }

  const handleValidator = (
    value: any,
    dependencies: KLFormItemProps['dependencies'] = [],
    dependenciesExtend: KLFormItemProps['dependenciesExtend'] = []
  ) => {
    let errorMsg
    let depValueAlia
    let strategyAlia
    let equalToAlia
    let behaviorAlia
    for (const dep of dependencies) {
      const index = dependencies.indexOf(dep)
      if (dependenciesExtend[index]) {
        const { strategy, equalTo, ins, between, behavior } =
          dependenciesExtend[index]
        strategyAlia = strategy
        equalToAlia = equalTo
        behaviorAlia = behavior
        // TODO dep 是 NamePath，需要考虑 number 情况取值
        const depValue = form.getFieldValue(dep)
        depValueAlia = depValue
        const depLabel = initial.current.items.find(i => i.name === dep)?.label
        if (
          strategy === 'Reverse' &&
          typeof value === 'boolean' &&
          typeof depValue === 'boolean' &&
          value !== depValue
        ) {
          errorMsg = `须为“${depLabel}”的反值：${depValue}`
        } else if (strategy === 'Not' && value === depValue) {
          errorMsg = `不能等于“${depLabel}”的值：${depValue}`
        } else if (strategy === 'Equal' && value !== depValue) {
          errorMsg = `须等于“${depLabel}”的值：${depValue}`
        } else if (
          strategy === 'LessThan' &&
          typeof value === 'number' &&
          typeof depValue === 'number' &&
          value >= depValue
        ) {
          errorMsg = `须小于“${depLabel}”的值：${depValue}`
        } else if (
          strategy === 'LessThanOrEqual' &&
          typeof value === 'number' &&
          typeof depValue === 'number' &&
          value > depValue
        ) {
          errorMsg = `须小于等于“${depLabel}”的值：${depValue}`
        } else if (
          strategy === 'MoreThan' &&
          typeof value === 'number' &&
          typeof depValue === 'number' &&
          value <= depValue
        ) {
          errorMsg = `须大于“${depLabel}”的值：${depValue}`
        } else if (
          strategy === 'MoreThanOrEqual' &&
          typeof value === 'number' &&
          typeof depValue === 'number' &&
          value < depValue
        ) {
          errorMsg = `须大于等于“${depLabel}”的值：${depValue}`
        } else if (strategy === 'Like') {
          errorMsg = `须类似“${depLabel}”的值：${depValue}[不忽略大小写]`
        } else if (strategy === 'ILike') {
          errorMsg = `须类似“${depLabel}”的值：${depValue}[忽略大小写]`
        } else if (strategy === 'Any') {
          errorMsg = `须存在`
        } else if (strategy === 'IsNull' && !value) {
          errorMsg = `不能为空`
        } else if (
          strategy === 'In' &&
          Array.isArray(ins) &&
          !ins.includes(value)
        ) {
          errorMsg = `须在此范围内${ins}选择`
        } else if (
          strategy === 'Between' &&
          Array.isArray(between) &&
          between.length === 2 &&
          (value < between[0] || value > between[1])
        ) {
          errorMsg = `须 >= ${between[0]}，<= ${between[1]}`
        }
        // 一旦校验异常终止循环
        if (errorMsg && !behavior) {
          break
        }
      }
    }
    return {
      errorMsg,
      depValue: depValueAlia,
      strategy: strategyAlia,
      equalTo: equalToAlia,
      behavior: behaviorAlia
    }
  }

  const handleValuesChange = (changeValues: any, values: any) => {
    if (scene == 'config') {
      const changeValue = {} // { compName: '', props: {} }
      const allValues = {} // { compName: '', props: {} }
      items.forEach(i => {
        if (typeof i.name === 'string') {
          const arr = i.name
            .replaceAll('][', '.')
            .replaceAll('[', '.')
            .replaceAll(']', '')
            .split('.')
          // allValues.compName = arr[0]
          if (
            arr[1] &&
            arr[2] &&
            isNaN(Number(arr[2])) &&
            arr[3] &&
            typeof Number(arr[3]) === 'number' &&
            arr[4]
          ) {
            set(
              // allValues.props,
              allValues,
              `${arr[1]}.${arr[2]}.${arr[3]}.${arr[4]}`,
              values[i.name]
            )
          }
          if (arr[1] && arr[2] && isNaN(Number(arr[2])) && !arr[3]) {
            set(allValues, `${arr[1]}.${arr[2]}`, values[i.name])
          }
        }
      })
      Object.entries(changeValues).forEach(([k, v]) => {
        const arr = k
          .replaceAll('][', '.')
          .replaceAll('[', '.')
          .replaceAll(']', '')
          .split('.')
        // changeValue.compName = arr[0]
        if (
          arr[1] &&
          arr[2] &&
          isNaN(Number(arr[2])) &&
          arr[3] &&
          typeof Number(arr[3]) === 'number' &&
          arr[4]
        ) {
          set(
            changeValue,
            `${arr[1]}.${arr[2]}.${arr[3]}.${arr[4]}`,
            changeValues[k]
          )
        }
        if (arr[1] && arr[2] && isNaN(Number(arr[2])) && !arr[3]) {
          set(changeValue, `${arr[1]}.${arr[2]}`, changeValues[k])
        }
      })
      if (onValuesChange) {
        onValuesChange(changeValue, allValues)
      }
    } else if (scene === 'modal') {
      if (onValuesChange) {
        onValuesChange(changeValues, values)
      }
    }

    // console.log(changeValue, allValues)
  }

  const getRules = (ix: number) => {
    const item = items[ix]
    const origin = initial.current.items[ix]
    const { dependencies = [], dependenciesExtend = [] } = item
    const rules: FormItemProps['rules'] = [
      ...((origin && origin.rules) || []),
      () => ({
        validator(_, value) {
          // 其它表单项涉及到自己的依赖项
          const others = items
            .filter(i => i !== item)
            .map(i => {
              if (
                i.dependencies?.length &&
                typeof item.name === 'string' &&
                i.dependencies.includes(item.name)
              ) {
                return i
              }
              return null
            })
            .filter(Boolean)
          const hiddenFormItems: string[] = []
          const disabledFormItems: string[] = []
          // 被依赖的
          for (const dep of others) {
            const { errorMsg, depValue, strategy, equalTo, behavior } =
              handleValidator(
                value,
                dep?.dependencies || [],
                dep?.dependenciesExtend || []
              )
            // 隐藏满足此条件的依赖的表单
            if (
              strategy === 'EqualTo' &&
              depValue === equalTo &&
              behavior === 'hidden' &&
              typeof dep?.name === 'string'
            ) {
              hiddenFormItems.push(dep?.name)
            }
            // 禁用满足此条件的依赖的表单
            if (
              errorMsg &&
              behavior === 'disabled' &&
              typeof dep?.name === 'string'
            ) {
              disabledFormItems.push(dep?.name)
            }
          }
          if (hiddenFormItems.length || disabledFormItems.length) {
            setDisplay({
              ...display,
              ...hiddenFormItems.reduce((a, b) => {
                a[b] = 'none'
                return a
              }, {} as FormItemStatus),
              ...disabledFormItems.reduce((a, b) => {
                a[b] = 'disabled'
                return a
              }, {} as FormItemStatus)
            })
          } else {
            setDisplay(initial.current.display)
          }
          const { errorMsg } = handleValidator(
            value,
            dependencies,
            dependenciesExtend
          )
          // 自身表单只显示校验错误
          return errorMsg
            ? Promise.reject(new Error(errorMsg))
            : Promise.resolve()
        }
      })
    ]
    return rules
  }

  const getFormItem = (ix: number) => {
    const item = items[ix]
    if (item && klComponentKeys.includes(item.type)) {
      if (item.type === 'Radio' && item.options && item.options?.length > 3) {
        // @ts-ignore
        // item.type = 'Select'
      }
      const Comp = klComponentMap[item.type]
      const origin = initial.current.items[ix]
      item.rules = getRules(ix)
      if (typeof item.name === 'string') {
        item.style =
          display[item.name] === 'none'
            ? { ...item.style, display: 'none' }
            : origin
            ? origin.style
            : {}
        // item.props =
        //   display[item.name] === 'disabled'
        //     ? { ...item.props, disabled: true }
        //     : origin
        //     ? origin.props
        //     : {}
      }
      const itemLabelCol = item.group
        ? item.labelCol // || { span: 24 }
        : item.labelCol || labelCol
      const itemWrapperCol = item.group
        ? item.wrapperCol // || { span: 24 }
        : item.wrapperCol || wrapperCol

      let options: IOptions = []
      const itype = item.type
      if (
        itype === 'AutoComplete' ||
        itype === 'Cascader' ||
        itype === 'Checkbox' ||
        itype === 'Radio' ||
        itype === 'Rate' ||
        itype === 'Select'
      ) {
        options = item.options || []
      }
      let isRequired = item.required || required
      if (scene === 'search') {
        isRequired = false
      }
      const formItem = (
        <Form.Item
          key={ix}
          {...omit(item, [
            'package',
            'span',
            'group',
            'groupType',
            'groupKey',
            'groupTitle',
            'componentKey',
            'componentName',
            'valueConfig',
            'documentation',
            'dependenciesExtend'
          ])}
          required={isRequired}
          colon={item.colon || colon}
          labelCol={itemLabelCol}
          wrapperCol={itemWrapperCol}
          trigger={trigger || item.trigger}
          labelAlign={item.labelAlign || labelAlign}
          hasFeedback={item.hasFeedback || hasFeedback}
        >
          <Comp
            {...item.props}
            data-index={ix}
            options={options}
            rules={item.rules}
          />
        </Form.Item>
      )
      return formItem
    }
    return null
  }
  useEffect(() => {
    onValuesChange?.(null, initialValues)
  }, [])

  const getFormItemData = (ix: number) => {
    return { item: items[ix], index: ix }
  }

  const onPanelCreate = (key: string) => {
    const keyPrefix = key.replace(/\.\d+\S*$/, '')
    let lastItemIndex = -1
    let lastIndex = -1
    for (let index = 0; index < items.length; index++) {
      const name = items[index].name as string
      if (name.startsWith(keyPrefix)) {
        const _index = Number(name.match(/\.(\d+)./)![1])
        if (_index > lastItemIndex) {
          lastItemIndex = _index
        }
        if (_index === lastItemIndex) {
          lastIndex = index
        }
      }
    }
    onItemsChange?.([
      ...items.slice(0, lastIndex + 1),
      ...items.reduce<KLFormItemProps[]>((arr, item) => {
        const _name = item.name as string
        if (_name.startsWith(`${keyPrefix}.${lastItemIndex}`)) {
          arr.push({
            ...item,
            initialValue: undefined,
            name: _name.replace(/\.(\d+)/, `.${lastItemIndex + 1}`)
          })
        }
        return arr
      }, []),
      ...items.slice(lastIndex + 1)
    ])
  }

  const onPanelRemove = (key: string, index: number) => {
    const keyPrefix = key.replace(/\.\d+\S*$/, '')
    const targetItems = items.filter(item => {
      return !(item.name as string).startsWith(`${keyPrefix}.${index}`)
    })
    onItemsChange?.(targetItems)
  }

  if (!layout || layout === 'horizontal') {
    const maxLabelLength = calcMaxLabelSpan(items)
    labelCol!.span = Math.ceil(maxLabelLength)
    wrapperCol!.span = 24 - labelCol!.span
  }
  if (scene === 'search') {
    wrapperCol.span = 12
  }
  return (
    <div>
      <Form
        {...formProps}
        layout={layout}
        form={form}
        // labelCol={labelCol}
        // wrapperCol={wrapperCol}
        onValuesChange={handleValuesChange}
        labelAlign={scene === 'config' ? 'left' : 'right'}
      >
        {(() => {
          const rows = []
          if (scene === 'config' || !scene || scene === 'modal') {
            for (let ix = 0; ix < items.length; ) {
              const item = items[ix]
              let rowType
              if (typeof item.name === 'string') {
                rowType = item.name.split('.')?.[1]
              }

              if (!scene) {
                rows.push(getFormItem(ix))
                ix++
                continue
              }
              if (
                item.group &&
                items[ix + 1] &&
                items[ix + 1].group === item.group &&
                rowType
              ) {
                const cols = [
                  getFormItem(ix), // <Col key={`col-${ix}`}>{getFormItem(ix)}</Col>,
                  getFormItem(ix + 1) // <Col key={`col-${ix + 1}`}>{getFormItem(ix + 1)}</Col>
                ]
                ix += 2
                const cx = ix
                for (let inx = cx; inx < items.length; ) {
                  if (items[inx] && items[inx].group === item.group) {
                    // cols.push(<Col key={`col-${inx}`}>{getFormItem(inx)}</Col>)
                    cols.push(getFormItem(inx))
                    inx += 1
                    ix += 1
                  } else {
                    break
                  }
                }
                // const row = <Row gutter={formItemGutter}>{cols}</Row>
                const row = cols
                rows.push(
                  <Collapse
                    key={`row-${ix}`}
                    // bordered={false}
                    className="!-mt-[1px]"
                    expandIconPosition="right"
                  >
                    <Collapse.Panel
                      key={item.group}
                      header={item.groupTitle || item.group}
                      forceRender
                      extra={
                        <PanelHeader
                          name={item.name as string}
                          onCreate={() => onPanelCreate(item.name as string)}
                          onRemove={i => onPanelRemove(item.name as string, i)}
                        />
                      }
                    >
                      {/* {displayRow(initialValues, rowType, row)} */}
                      {row}
                    </Collapse.Panel>
                  </Collapse>
                )
              } else {
                rows.push(getFormItem(ix))
                ix += 1
              }
            }
          } else if (scene === 'search') {
            for (let ix = 0; ix < items.length; ) {
              const item = items[ix]
              rows.push(
                <Row gutter={8} key={item.name as string}>
                  <Col span={8}>{getFormItem(ix)}</Col>
                  <Col span={8}>{getFormItem(ix + 1)}</Col>
                  <Col span={8}>{getFormItem(ix + 2)}</Col>
                </Row>
              )
              ix += 3
            }
          }
          return rows
        })()}
      </Form>
    </div>
  )
}

export const KLForm = forwardRef(KLFormWithRef)

KLForm.displayName = 'KLForm'
