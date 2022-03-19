import { Form, Row, Col } from 'antd'
import { cloneDeep, omit } from 'lodash'
import type { ForwardRefRenderFunction } from 'react'
import { useMemo } from 'react'
import { useEffect } from 'react'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import type { FormItemProps, FormProps, FormRef } from '@/types'
import { klComponentMap } from './form-map'
import { calcMaxLabelSpan } from './helpers'
import type { KLFormItemProps, IOptions } from './helpers'
import { klComponentKeys } from '.'

export type KLFormProps = Partial<FormProps> &
  Partial<FormItemProps> & {
    /**
     * 每行显示的列数
     */
    cols?: 2 | 3 | 4
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

const KLFormWithRef: ForwardRefRenderFunction<FormRef, KLFormProps> = (
  {
    cols,
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

  const maxLabelSpan = useMemo(() => {
    return calcMaxLabelSpan(items, cols && 0.85)
  }, [items, cols])

  useEffect(() => {
    setItemData(itemValues)
  }, [itemValues, initialValues])

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
    return values
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
    if (onValuesChange) {
      onValuesChange(changeValues, values)
    }
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
      }

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
      if (cols) {
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
          rules={
            isRequired
              ? [{ required: true, message: `请填入${item.label}` }]
              : [{ required: false }]
          }
          colon={item.colon || colon}
          labelCol={{ span: maxLabelSpan }}
          wrapperCol={cols ? { span: 12 } : { span: 24 - maxLabelSpan }}
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

  // if (!layout || layout === 'horizontal') {
  //   const maxLabelLength = calcMaxLabelSpan(items)
  //   labelCol!.span = Math.ceil(maxLabelLength)
  //   wrapperCol!.span = 24 - labelCol!.span
  // }
  // if (cols) {
  //   wrapperCol.span = 12
  // }

  return (
    <div>
      <Form
        {...formProps}
        layout={layout}
        form={form}
        autoComplete="off"
        // labelCol={labelCol}
        // wrapperCol={wrapperCol}
        onValuesChange={handleValuesChange}
      >
        {(() => {
          const rows = []
          if (cols) {
            for (let ix = 0; ix < items.length; ) {
              const item = items[ix]
              rows.push(
                <Row gutter={0} key={item.name as string}>
                  <Col span={8}>{getFormItem(ix)}</Col>
                  <Col span={8}>{getFormItem(ix + 1)}</Col>
                  <Col span={8}>{getFormItem(ix + 2)}</Col>
                </Row>
              )
              ix += 3
            }
          } else {
            for (let ix = 0; ix < items.length; ix++) {
              rows.push(getFormItem(ix))
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
