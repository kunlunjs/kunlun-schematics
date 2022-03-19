import type { FormProps } from 'antd'
import { Tooltip, Modal, Space, Button, Form, Checkbox, Select } from 'antd'
import type { ForwardRefRenderFunction } from 'react'
import {
  Fragment,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback
} from 'react'
import Draggleable from 'react-draggable'
import type { FormRef } from '@/types'
import Icon from '../Icon'

interface KLTableAdvanceConfigProps {
  visible: boolean
  title?: string
  onCancel: () => void
  onOk: (arg?: any) => void
}

const strategies = [
  {
    label: '等于',
    value: 'Equal'
  },
  {
    label: '取反',
    value: 'Reverse'
  },
  {
    label: '不等于',
    value: 'Not'
  },
  {
    label: '小于',
    value: 'LessThan'
  },
  {
    label: '小于等于',
    value: 'LessThanOrEqual'
  },
  {
    label: '大于',
    value: 'MoreThan'
  },
  {
    label: '大于等于',
    value: 'MoreThanOrEqual'
  },
  {
    label: '不为空',
    value: 'NotNull'
  },
  {
    label: '任何值',
    value: 'Any'
  }
]
const behaviors = [
  {
    label: '隐藏',
    value: 'hidden'
  },
  {
    label: '禁用',
    value: 'disabled'
  }
]

const KLTableAdvancedConfigWithRef: ForwardRefRenderFunction<
  FormRef,
  KLTableAdvanceConfigProps
> = ({ visible, onOk, onCancel }, ref) => {
  const [form] = Form.useForm()
  const [draggleDisabled, setDraggleDisabled] = useState(true)
  // 生成的表单项
  const [items, setItems] = useState([])
  // 允许的取值
  const [effectiveValues] = useState<
    Record<string, (string | number | boolean)[]>
  >({})

  useImperativeHandle(ref, () => ({
    getValues() {
      return form.getFieldsValue()
    },
    getFormInstance() {
      return form
    },
    clearFormValues() {
      form.setFieldsValue({})
    }
  }))

  const handleValuesChange: FormProps['onValuesChange'] = (
    changeValues,
    values
  ) => {
    console.log(changeValues, values)
  }

  const handleMouseMove = useCallback(() => {
    if (draggleDisabled) {
      setDraggleDisabled(false)
    }
  }, [draggleDisabled])

  const handleMouseOut = useCallback(() => {
    setDraggleDisabled(true)
  }, [])

  const handleOk = () => {
    onOk()
  }

  const handleCancel = () => {
    onCancel()
  }

  return (
    <Modal
      title={
        <div
          className="cursor-move w-full"
          onMouseMove={handleMouseMove}
          onMouseOut={handleMouseOut}
          // fix eslintjsx-a11y/mouse-events-have-key-events
          // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
          onFocus={() => {}}
          onBlur={() => {}}
        >
          表格列高级配置
        </div>
      }
      visible={visible}
      width={680}
      onOk={handleOk}
      onCancel={handleCancel}
      className="modal-form-small"
      modalRender={modal => {
        return <Draggleable disabled={draggleDisabled}>{modal}</Draggleable>
      }}
    >
      <Form
        form={form}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 21 }}
        onValuesChange={handleValuesChange}
      >
        <Form.Item name="effectiveValue" label="有效值">
          <Select size="small" mode="tags" placeholder="有效值[可多选]">
            {(effectiveValues['name'] || []).map((i, ix) => {
              return (
                <Select.Option key={ix} value={String(i)}>
                  {i}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="valueExtend"
          label={
            <Space>
              <Tooltip title="允许增加自定义值">
                <Icon name="InfoCircleOutlined" className="cursor-pointer" />
              </Tooltip>
              值扩展
            </Space>
          }
        >
          <Checkbox />
        </Form.Item>
        <Form.List name="associated">
          {(fields, { add, remove, move }) => {
            return (
              <Fragment>
                {fields.map(field => {
                  return (
                    <Space
                      key={field.key}
                      size="small"
                      align="baseline"
                      className="ml-[12.5%]"
                    >
                      <Form.Item
                        {...field}
                        name={[field.name, 'name']}
                        fieldKey={[field.fieldKey, 'name']}
                        wrapperCol={{ span: 24 }}
                      >
                        <Select size="small" placeholder="关联已有的项">
                          {items.map(i => {
                            return (
                              <Select.Option key={i} value={i}>
                                {i}
                              </Select.Option>
                            )
                          })}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'strategy']}
                        fieldKey={[field.fieldKey, 'strategy']}
                        wrapperCol={{ span: 24 }}
                      >
                        <Select size="small" placeholder="与关联项的值关系">
                          {strategies.map(i => {
                            return (
                              <Select.Option key={i.label} value={i.value}>
                                {i.label}
                              </Select.Option>
                            )
                          })}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'behavior']}
                        fieldKey={[field.fieldKey, 'behavior']}
                        wrapperCol={{ span: 24 }}
                      >
                        <Select
                          size="small"
                          placeholder="满足关联值关系后触发行为"
                        >
                          {behaviors.map(i => {
                            return (
                              <Select.Option key={i.label} value={i.value}>
                                {i.label}
                              </Select.Option>
                            )
                          })}
                        </Select>
                      </Form.Item>
                      <Icon
                        name="MinusCircleOutlined"
                        onClick={() => remove(field.name)}
                      />
                    </Space>
                  )
                })}
                <Form.Item className="!ml-[12.5%]">
                  <Button
                    type="dashed"
                    block
                    onClick={() => add()}
                    icon={<Icon name="PlusCircleOutlined" />}
                  >
                    添加一列关联项
                  </Button>
                </Form.Item>
              </Fragment>
            )
          }}
        </Form.List>
      </Form>
    </Modal>
  )
}

export const KLTableAdvancedConfig = forwardRef(KLTableAdvancedConfigWithRef)

KLTableAdvancedConfig.displayName = 'KLTableAdvanceConfig'
