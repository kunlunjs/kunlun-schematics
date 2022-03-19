import type { FormProps } from 'antd'
import {
  Modal,
  Form,
  Checkbox,
  Input,
  Select,
  Space,
  Button,
  Tooltip
} from 'antd'
import type { ForwardRefRenderFunction } from 'react'
import {
  useRef,
  Fragment,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle
} from 'react'
import Draggleable from 'react-draggable'
import type { FormRef, IKLTableColumn } from '@/types'
import Icon from '../Icon'
import { KLTableAdvancedConfig } from './_KLTableAdvancedConfig'

interface KLTableConfigProps {
  visible: boolean
  title?: string
  onCancel: () => void
  onOk: (arg?: any) => void
}

const tableCellShowTypes: {
  label: string
  value: Required<Pick<IKLTableColumn, 'type'>>['type']
  /**
   * 字符串拼接分隔符
   */
  join?: string
  /**
   * 日期时间格式
   */
  format?: string
}[] = [
  {
    value: 'Text',
    label: '文本'
  },
  {
    value: 'Tag',
    label: '标签'
  },
  {
    value: 'Icon',
    label: '图标'
  },
  {
    value: 'File',
    label: '文件'
  },
  {
    value: 'Code',
    label: '代码'
  },

  {
    value: 'Chart',
    label: '图表'
  },
  {
    value: 'Image',
    label: '图片'
  },
  {
    value: 'Badge',
    label: '徽标'
  },
  {
    value: 'Status',
    label: '状态'
  },
  {
    value: 'JSON',
    label: 'JSON'
  },
  {
    value: 'Progress',
    label: '进度条'
  },
  {
    value: 'TextArea',
    label: '富文本'
  },
  {
    value: 'DatePicker',
    label: '日期时间',
    format: 'YYYY/MM/DD HH:mm'
  },
  {
    value: 'Join',
    label: '文本拼接',
    join: ','
  }
]

const KLTableConfigWithRef: ForwardRefRenderFunction<
  FormRef,
  KLTableConfigProps
> = ({ visible, onOk, onCancel }, ref) => {
  const [form] = Form.useForm()
  const advancedModalRef = useRef<FormRef>(null)
  const [advancedModal, setAdvancedModal] = useState(false)
  const [draggleDisabled, setDraggleDisabled] = useState(true)
  // 生成的表单项
  const [items, setItems] = useState([])
  // 高级配置
  const [advanced, setAdvanced] = useState<Record<string, boolean>>({})
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

  const handleAvancedModalOk = () => {
    setAdvancedModal(false)
  }

  const handleAvancedModalCancel = () => {
    setAdvancedModal(false)
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
          表格列配置
        </div>
      }
      visible={visible}
      width={700}
      onOk={handleOk}
      onCancel={handleCancel}
      className="modal-form-small"
      modalRender={modal => {
        return <Draggleable disabled={draggleDisabled}>{modal}</Draggleable>
      }}
    >
      <Form form={form} onValuesChange={handleValuesChange}>
        <Form.List name="additem">
          {(fields, { add, remove, move }) => {
            return (
              <Fragment>
                {fields.map((field, ix) => {
                  return (
                    <Space key={field.key} size="small" align="baseline">
                      <span>{ix + 1}:</span>
                      <Form.Item
                        {...field}
                        name={[field.name, 'show']}
                        fieldKey={[field.fieldKey, 'show']}
                      >
                        <Checkbox>显示</Checkbox>
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'label']}
                        fieldKey={[field.fieldKey, 'label']}
                        rules={[{ required: true, message: '列名不能为空' }]}
                      >
                        <Input size="small" placeholder="列名[中文]" />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'name']}
                        fieldKey={[field.fieldKey, 'name']}
                      >
                        <Input size="small" placeholder="列名[English]" />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'type']}
                        fieldKey={[field.fieldKey, 'type']}
                      >
                        <Select size="small" placeholder="显示类型">
                          {tableCellShowTypes.map(i => {
                            return (
                              <Select.Option key={i.value} value={i.value}>
                                {i.label}
                              </Select.Option>
                            )
                          })}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'isSearch']}
                        fieldKey={[field.fieldKey, 'isSearch']}
                      >
                        <Checkbox>搜索项</Checkbox>
                      </Form.Item>
                      <Tooltip title="高级选项">
                        <Icon
                          name="MoreOutlined"
                          className="cursor-pointer"
                          onClick={() => setAdvancedModal(true)}
                        />
                      </Tooltip>
                      <Icon
                        name="MinusCircleOutlined"
                        onClick={() => remove(field.name)}
                      />
                    </Space>
                  )
                })}
                <Form.Item>
                  <Button
                    block
                    type="dashed"
                    onClick={() => add()}
                    icon={<Icon name="PlusCircleOutlined" />}
                  >
                    添加一列
                  </Button>
                </Form.Item>
              </Fragment>
            )
          }}
        </Form.List>
      </Form>
      <KLTableAdvancedConfig
        ref={advancedModalRef}
        visible={advancedModal}
        onOk={handleAvancedModalOk}
        onCancel={handleAvancedModalCancel}
      />
    </Modal>
  )
}

export const KLTableConfig = forwardRef(KLTableConfigWithRef)

KLTableConfig.displayName = 'KLTableConfig'
