import { useDynamicList } from 'ahooks'
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Tabs,
  Table,
  Tooltip,
  Radio
} from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import classnames from 'classnames'
import { get } from 'lodash'
import type { FC } from 'react'
import { useRef } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { useMemo } from 'react'
// @ts-ignore
import DragListView from 'react-drag-listview'
import Icon from '@/components/Icon'
import type { InputProps, TabsProps } from '@/types'
import {
  fieldTypes,
  nativeDatabaseTypes,
  validators,
  fieldValueTypes,
  relationTables,
  mocks,
  generateInterfaces,
  transforms,
  primaryKeyStrategies
} from '../options'

const Title: FC<{ title: string; tooltip?: string }> = ({ title, tooltip }) => {
  return (
    <Space>
      {title}
      {tooltip ? (
        <Tooltip title={tooltip}>
          <Icon name="QuestionCircleOutlined" style={{ fontSize: 12 }} />
        </Tooltip>
      ) : null}
    </Space>
  )
}

interface Item {
  _index: number
  id?: number
  name?: string
  type?: string
  title?: string
  list?: boolean
  index?: boolean
  hidden?: boolean
  comment?: string
  primary?: boolean
  transform?: string
  valueType?: string
  nullable?: boolean
  required?: boolean
  readonly?: boolean
  nativeType?: string
  validators?: string[]
  defaultValue?: string
  systemPreset?: boolean
  relationTable?: string
  relationTableField?: string
  primaryKeyStrategy?: string
}

// TODO
export interface FieldRef {
  update: (...args: any) => void
}
export interface FieldsProps {
  className?: string
  selectedRow?: Record<string, any>
}

const w = { width: '100%' }

type TabKey = 'design' | 'code' | 'page' | 'validator'
const tabs: {
  plus?: boolean
  key: TabKey
  tab: '结构设计' | '代码生成' | '页面显示' | '值/校验'
}[] = [
  {
    tab: '结构设计',
    key: 'design',
    plus: true
  },
  {
    tab: '值/校验',
    key: 'validator'
  },
  {
    tab: '代码生成',
    key: 'code'
  },
  {
    tab: '页面显示',
    key: 'page'
  }
]

export const Fields: FC<FieldsProps> = ({ className, selectedRow }) => {
  const [form] = Form.useForm()
  const valuesRef = useRef<{ fields: Record<string, any>[] }>({ fields: [] })
  const [activeTab, setActiveTab] = useState<TabKey>('design')
  const [size, setSize] = useState<InputProps['size']>('small')
  const [tabsType, setTabsType] = useState<TabsProps['type']>('card')
  const { list, remove, getKey, move, push, sortList } = useDynamicList<Item>(
    []
  )

  const columnsOfDesign: ColumnsType<Item> = [
    {
      key: 'name',
      dataIndex: 'name',
      title: (
        <Title
          title="name"
          tooltip="有效命名：英文、数字、下划线，字母开头，驼峰命名法，如: userId"
        />
      ),
      width: 100,
      align: 'center',
      render: (val: string, row: Item, index: number) => (
        <Space>
          <Icon name="DragOutlined" className="cursor-move" />
          <Form.Item
            noStyle
            initialValue={val}
            name={['fields', getKey(index), 'name']}
          >
            <Input size={size} style={w} placeholder="请输入" />
          </Form.Item>
        </Space>
      )
    },
    {
      key: 'type',
      dataIndex: 'type',
      // TODO: 补充各 type 的具体含义
      title: <Title title="类型" tooltip="" />,
      width: 100,
      align: 'center',
      render: (val: string, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val || 'String'}
          name={['fields', getKey(index), 'type']}
        >
          <Select size={size} style={w} placeholder="请选择">
            {fieldTypes.map(i => (
              <Select.Option key={i.label} value={i.value}>
                {i.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )
    },
    {
      key: 'nativeType',
      dataIndex: 'nativeType',
      title: <Title title="原始数据库类型" tooltip="暂未开放" />,
      width: 150,
      align: 'center',
      render: (val: string, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val || '@db.Text'}
          name={['fields', getKey(index), 'nativeType']}
          shouldUpdate={(preValues, curValues) =>
            get(curValues, `${index}.type`) !== get(preValues, `${index}.type`)
          }
        >
          <Select size={size} style={w} placeholder="请选择" disabled>
            {nativeDatabaseTypes.map(i => (
              <Select.Option key={i.label} value={i.value}>
                {i.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )
    },
    {
      key: 'list',
      dataIndex: 'list',
      title: '是否数组',
      width: 100,
      align: 'center',
      render: (val: boolean, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          valuePropName="checked"
          name={['fields', getKey(index), 'list']}
        >
          <Checkbox style={w} disabled={form.getFieldValue('primary')} />
        </Form.Item>
      )
    },
    {
      key: 'primary',
      dataIndex: 'primary',
      title: '主键',
      width: 100,
      align: 'center',
      render: (val: boolean, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          valuePropName="checked"
          name={['fields', getKey(index), 'primary']}
        >
          <Checkbox style={w} />
        </Form.Item>
      )
    },
    {
      key: 'primaryKeyStrategy',
      dataIndex: 'primaryKeyStrategy',
      title: <Title title="主键策略" />,
      width: 100,
      align: 'center',
      render: (val: string, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          name={['fields', getKey(index), 'primaryKeyStrategy']}
        >
          <Select size={size} style={w} placeholder="请选择">
            {primaryKeyStrategies.map(i => (
              <Select.Option key={i.label} value={i.value}>
                {i.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )
    },
    {
      key: 'nullable',
      dataIndex: 'nullable',
      title: '可为空',
      width: 75,
      align: 'center',
      render: (val: boolean, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          valuePropName="checked"
          name={['fields', getKey(index), 'nullable']}
        >
          <Checkbox style={w} />
        </Form.Item>
      )
    },
    {
      key: 'readonly',
      dataIndex: 'readonly',
      title: '只读',
      width: 50,
      align: 'center',
      render: (val: boolean, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          valuePropName="checked"
          name={['fields', getKey(index), 'readonly']}
        >
          <Checkbox style={w} disabled={form.getFieldValue('systemPreset')} />
        </Form.Item>
      )
    },
    {
      key: 'index',
      dataIndex: 'index',
      title: '索引',
      width: 50,
      align: 'center',
      render: (val: boolean, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          valuePropName="checked"
          name={['fields', getKey(index), 'index']}
        >
          <Checkbox style={w} />
        </Form.Item>
      )
    },
    {
      key: 'relationTable',
      dataIndex: 'relationTable',
      title: '关联表',
      width: 150,
      align: 'center',
      render: (val: string, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          name={['fields', getKey(index), 'relationTable']}
        >
          <Select size={size} style={w} placeholder="请选择">
            {validators.map(i => (
              <Select.Option key={i.label} value={i.value}>
                {i.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )
    },
    {
      key: 'relationTableField',
      dataIndex: 'relationTableField',
      title: '关联表字段',
      width: 150,
      align: 'center',
      render: (val: string, row: Item, index: number) => (
        <Space>
          <Form.Item
            noStyle
            initialValue={val}
            name={['fields', getKey(index), 'relationTableField']}
          >
            <Select
              size="small"
              style={{ width: 120 }}
              placeholder="请选择"
              disabled={!form.getFieldValue('relationTable')}
            >
              {relationTables.map(i => (
                <Select.Option key={i.label} value={i.value}>
                  {i.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Icon
            name="MinusCircleOutlined"
            style={{ color: 'red' }}
            onClick={() => remove(index)}
          />
          <Icon
            name="PlusCircleOutlined"
            onClick={() => push({ _index: list.length + 1 })}
          />
        </Space>
      )
    }
  ]

  const columnsOfValidator: ColumnsType<Item> = [
    {
      key: 'systemPreset',
      dataIndex: 'systemPreset',
      title: <Title title="系统内置" tooltip="意味着不可更改" />,
      width: 100,
      align: 'center',
      render: (val: boolean, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          valuePropName="checked"
          name={['fields', getKey(index), 'systemPreset']}
        >
          <Checkbox style={w} />
        </Form.Item>
      )
    },
    {
      key: 'required',
      dataIndex: 'required',
      title: '必填',
      width: 50,
      align: 'center',
      render: (val: boolean, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          valuePropName="checked"
          name={['fields', getKey(index), 'required']}
          shouldUpdate={(preValues, curValues) =>
            get(curValues, `${index}.nullable`) !==
            get(preValues, `${index}.nullable`)
          }
        >
          <Checkbox
            style={w}
            disabled={!form.getFieldValue(['fields', index, 'nullable'])}
          />
        </Form.Item>
      )
    },
    {
      key: 'valueType',
      dataIndex: 'valueType',
      title: '值类型',
      width: 100,
      align: 'center',
      render: (val: string, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          name={['fields', getKey(index), 'valueType']}
        >
          <Select size={size} style={w} placeholder="请选择">
            {fieldValueTypes.map(i => (
              <Select.Option key={i.label} value={i.value}>
                {i.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )
    },
    {
      key: 'length',
      dataIndex: 'length',
      title: '字符长度',
      width: 100,
      align: 'center',
      render: (val: boolean, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          name={['fields', getKey(index), 'length']}
          shouldUpdate={(preValues, curValues) =>
            get(curValues, `${index}.type`) !== get(preValues, `${index}.type`)
          }
        >
          <InputNumber
            size="small"
            disabled={
              !['String', 'Json'].includes(
                form.getFieldValue(['fields', index, 'type'])
              )
            }
          />
        </Form.Item>
      )
    },
    {
      key: 'range',
      dataIndex: 'range',
      title: '数字范围',
      width: 150,
      align: 'center',
      render: (val: boolean, row: Item, index: number) => (
        <Space>
          <Form.Item
            noStyle
            initialValue={val}
            name={['fields', getKey(index), 'range_start']}
            shouldUpdate={(preValues, curValues) =>
              get(curValues, `${index}.type`) !==
              get(preValues, `${index}.type`)
            }
          >
            <InputNumber
              size="small"
              disabled={
                !['Int', 'Float', 'BigInt'].includes(
                  form.getFieldValue(['fields', index, 'type'])
                )
              }
            />
          </Form.Item>
          -
          <Form.Item
            noStyle
            initialValue={val}
            name={['fields', getKey(index), 'range_end']}
            shouldUpdate={(preValues, curValues) =>
              get(curValues, `${index}.type`) !==
              get(preValues, `${index}.type`)
            }
          >
            <InputNumber
              size="small"
              disabled={
                !['Int', 'Float', 'BigInt'].includes(
                  form.getFieldValue(['fields', index, 'type'])
                )
              }
            />
          </Form.Item>
        </Space>
      )
    },
    {
      key: 'defaultValue',
      dataIndex: 'defaultValue',
      title: '默认值',
      width: 150,
      align: 'center',
      render: (val: string, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          name={['fields', getKey(index), 'defaultValue']}
        >
          <Input size={size} style={w} placeholder="请输入" />
        </Form.Item>
      )
    },
    {
      key: 'mock',
      dataIndex: 'mock',
      title: 'Mock',
      width: 150,
      align: 'center',
      render: (val: string, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          name={['fields', getKey(index), 'mock']}
        >
          <Select size={size} style={w} placeholder="请选择">
            {mocks.map(i => (
              <Select.Option key={i.label} value={i.value}>
                {i.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )
    },
    {
      key: 'validators',
      dataIndex: 'validators',
      title: '校验',
      width: 200,
      align: 'center',
      render: (val: string, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          name={['fields', getKey(index), 'validators']}
        >
          <Select size={size} mode="multiple" style={w} placeholder="请选择">
            {validators.map(i => (
              <Select.Option key={i.label} value={i.value}>
                {i.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )
    },
    {
      key: 'transform',
      dataIndex: 'transform',
      title: '转换',
      // width: 250,
      align: 'center',
      render: (val: string, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          name={['fields', getKey(index), 'transform']}
        >
          <Select
            size="small"
            mode="tags"
            style={{ width: '100%' }}
            placeholder="请选择或输入"
          >
            {transforms.map(i => (
              <Select.Option key={i.label} value={i.value}>
                {i.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )
    }
  ]

  const columnsOfCode: ColumnsType<Item> = [
    {
      key: 'hidden',
      dataIndex: 'hidden',
      title: <Title title="隐藏" tooltip="默认查询不返回" />,
      width: 100,
      align: 'center',
      render: (val: boolean, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          valuePropName="checked"
          name={['fields', getKey(index), 'hidden']}
        >
          <Checkbox style={w} />
        </Form.Item>
      )
    },
    {
      key: 'generateInterfaces',
      dataIndex: 'generateInterfaces',
      title: '生成接口',
      align: 'center',
      render: (val: string, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          name={['fields', getKey(index), 'generateInterfaces']}
        >
          <Select
            size="small"
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="请选择"
          >
            {generateInterfaces.map(i => (
              <Select.Option key={i.label} value={i.value}>
                {i.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )
    },
    {
      key: 'unitTest',
      dataIndex: 'unitTest',
      title: (
        <Title
          title="生成单元测试"
          tooltip="自动生成各业务模块 controller、service 单元测试，详见 packages/server/modules 目录"
        />
      ),
      width: 150,
      align: 'center',
      render: (val: boolean, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          valuePropName="checked"
          name={['fields', getKey(index), 'unitTest']}
        >
          <Checkbox style={w} disabled />
        </Form.Item>
      )
    },
    {
      key: 'E2ETest',
      dataIndex: 'E2ETest',
      title: (
        <Title
          title="生成E2E测试"
          tooltip="自动生成接口测试，详见 packages/server/test 目录"
        />
      ),
      width: 150,
      align: 'center',
      render: (val: boolean, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          valuePropName="checked"
          name={['fields', getKey(index), 'E2ETest']}
        >
          <Checkbox style={w} disabled />
        </Form.Item>
      )
    }
  ]

  const columnsOfPage: ColumnsType<Item> = [
    {
      key: 'title',
      dataIndex: 'title',
      title: (
        <Title title="标题" tooltip="用于页面展示、表单录入等，长度：1 ~ 10" />
      ),
      width: 150,
      align: 'center',
      render: (val: string, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          name={['fields', getKey(index), 'title']}
          rules={[
            { pattern: /^[a-zA-Z\u4e00-\u9fa5][\w-\u4e00-\u9fa5]{0,9}$/ }
          ]}
        >
          <Input size={size} style={w} placeholder="请输入" />
        </Form.Item>
      )
    },
    {
      key: 'width',
      dataIndex: 'width',
      title: (
        <Title
          title="宽度"
          tooltip="用于预设内容在页面表格、详情等地方显示的宽度"
        />
      ),
      width: 100,
      align: 'center',
      render: (val: string, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          name={['fields', getKey(index), 'width']}
        >
          <InputNumber size={size} style={w} />
        </Form.Item>
      )
    },
    {
      key: 'comment',
      dataIndex: 'comment',
      title: <Title title="备注" tooltip="用于显示额外提示等信息" />,
      align: 'center',
      render: (val: string, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          name={['fields', getKey(index), 'comment']}
        >
          <Input size={size} style={w} placeholder="请输入" />
        </Form.Item>
      )
    }
  ]

  const handleChangeTab = (key: string) => {
    setActiveTab(key as TabKey)
    const values = form.getFieldsValue()
    valuesRef.current = {
      fields: valuesRef.current.fields.map((i, ix) => {
        return {
          ...i,
          ...values.fields[ix]
        }
      })
    }
  }

  const columns: Record<TabKey, ColumnsType<Item>> = {
    code: columnsOfCode,
    page: columnsOfPage,
    design: columnsOfDesign,
    validator: columnsOfValidator
  }

  const x = useMemo(() => {
    return columns[activeTab].reduce((sum, cur) => {
      sum += (cur.width as number) || 100
      return sum
    }, 0)
  }, [columns[activeTab]])

  const table = (
    <DragListView
      onDragEnd={(oldIndex: number, newIndex: number) =>
        move(oldIndex, newIndex)
      }
      handleSelector={'span[aria-label="drag"]'}
    >
      <Table
        rowKey="_index"
        size="small"
        scroll={{ x }}
        dataSource={list}
        pagination={false}
        columns={columns[activeTab]}
        className={classnames('kl-tableform', !list.length && 'notablebody')}
        // rowKey={(row: Item) => getKey(index).toString() as string}
      />
    </DragListView>
  )

  const tabBarExtraContent = (
    <Space>
      <Radio.Group
        size="small"
        value={tabsType}
        onChange={e => setTabsType(e.target.value)}
      >
        <Radio.Button value="card">Card</Radio.Button>
        <Radio.Button value="line">Line</Radio.Button>
      </Radio.Group>
      <Select size="small" value={size} onChange={val => setSize(val)}>
        <Select.Option value="small">小</Select.Option>
        <Select.Option value="middle">中</Select.Option>
        <Select.Option value="large">大</Select.Option>
      </Select>
    </Space>
  )

  const plus = (
    <Button
      block
      type="dashed"
      className="mt-4"
      icon={<Icon name="PlusOutlined" />}
      onClick={() => push({ _index: list.length + 1 })}
    >
      添加字段
    </Button>
  )

  const handleValuesChange = useCallback(
    (changeValue: any, values: Record<string, any>) => {
      console.log('handleValuesChange: ', changeValue, values)
    },
    []
  )

  return (
    <div className={classnames('bg-white', className)}>
      <Form form={form} onValuesChange={handleValuesChange}>
        <Tabs
          animated
          type={tabsType}
          activeKey={activeTab}
          onChange={handleChangeTab}
          tabBarExtraContent={tabBarExtraContent}
        >
          {tabs.map(i => (
            <Tabs.TabPane tab={i.tab} key={i.key}>
              {table}
              {i.plus ? plus : null}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Form>
    </div>
  )
}
