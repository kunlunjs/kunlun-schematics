import { useDynamicList } from 'ahooks'
import { Button, Checkbox, Form, Input, Select, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import type { FC } from 'react'
// @ts-ignore
import DragListView from 'react-drag-listview'
import Icon from '../Icon'
import './KLTableFieldsForm.less'

interface Item {
  name?: string
  type?: string
  title?: string
  list?: boolean
  index?: boolean
  hidden?: boolean
  comment?: string
  transform?: string
  valueType?: string
  nullable?: boolean
  required?: boolean
  readonly?: boolean
  nativeType?: string
  primaryKey?: boolean
  validators?: string[]
  defaultValue?: string
  systemPreset?: boolean
  relationTable?: string
  relationTableField?: string
  defaultValueStrategy?: string
}
// const tableStyle = {
//   width: columns.reduce((a, b) => {
//     a += b.width || 100
//     return a
//   }, 0)
// }

interface KLTableFieldsFormProps {}

export const KLTableFieldsForm: FC<KLTableFieldsFormProps> = () => {
  const [form] = Form.useForm()
  const { list, remove, getKey, move, push, sortList } = useDynamicList<Item>(
    []
  )

  const columns: ColumnsType<Item> = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'name',
      width: 100,
      render: (val: string, row: Item, index: number) => (
        <Space>
          <Icon name="DragOutlined" className="cursor-move" />
          <Form.Item
            noStyle
            initialValue={val}
            name={['fields', getKey(index), 'name']}
          >
            <Input size="small" width={100} placeholder="请输入" />
          </Form.Item>
        </Space>
      )
    },
    {
      key: 'type',
      dataIndex: 'type',
      title: '类型',
      width: 75,
      render: (val: string, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          name={['fields', getKey(index), 'type']}
        >
          <Select size="small" style={{ width: 75 }} placeholder="请选择">
            {[].map(i => (
              <Select.Option key={i} value={i}>
                {i}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )
    },
    {
      key: 'nativeType',
      dataIndex: 'nativeType',
      title: '原始数据库类型',
      width: 175,
      render: (val: string, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          name={['fields', getKey(index), 'nativeType']}
        >
          <Select size="small" style={{ width: 75 }} placeholder="请选择">
            {[].map(i => (
              <Select.Option key={i} value={i}>
                {i}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )
    },
    {
      key: 'title',
      dataIndex: 'title',
      title: '标题',
      width: 100,
      render: (val: string, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          name={['fields', getKey(index), 'title']}
        >
          <Input size="small" width={100} placeholder="请输入" />
        </Form.Item>
      )
    },
    {
      key: 'comment',
      dataIndex: 'comment',
      title: '备注',
      width: 100,
      render: (val: string, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          name={['fields', getKey(index), 'comment']}
        >
          <Input size="small" width={100} placeholder="请输入" />
        </Form.Item>
      )
    },
    {
      key: 'list',
      dataIndex: 'list',
      title: '数组',
      width: 50,
      render: (val: boolean, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          name={['fields', getKey(index), 'list']}
        >
          <Checkbox />
        </Form.Item>
      )
    },
    {
      key: 'valueType',
      dataIndex: 'valueType',
      title: '值类型',
      width: 75,
      render: (val: string, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          name={['fields', getKey(index), 'valueType']}
        >
          <Select size="small" style={{ width: 75 }} placeholder="请选择">
            {[].map(i => (
              <Select.Option key={i} value={i}>
                {i}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )
    },
    {
      key: 'primaryKey',
      dataIndex: 'primaryKey',
      title: '主键',
      width: 50,
      render: (val: boolean, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          name={['fields', getKey(index), 'primaryKey']}
        >
          <Checkbox />
        </Form.Item>
      )
    },
    {
      key: 'defaultValue',
      dataIndex: 'defaultValue',
      title: '默认值',
      width: 100,
      render: (val: string, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          name={['fields', getKey(index), 'defaultValue']}
        >
          <Input size="small" width={100} placeholder="请输入" />
        </Form.Item>
      )
    },
    {
      key: 'defaultValueStrategy',
      dataIndex: 'defaultValueStrategy',
      title: '默认值策略',
      width: 100,
      render: (val: string, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          name={['fields', getKey(index), 'defaultValueStrategy']}
        >
          <Select size="small" style={{ width: 75 }} placeholder="请选择">
            {[].map(i => (
              <Select.Option key={i} value={i}>
                {i}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )
    },
    {
      key: 'validValues',
      dataIndex: 'validValues',
      title: '有效值',
      width: 200,
      render: (val: string, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          name={['fields', getKey(index), 'validValues']}
        >
          <Select
            size="small"
            mode="tags"
            style={{ width: 200 }}
            placeholder="请选择"
          >
            {[].map(i => (
              <Select.Option key={i} value={i}>
                {i}
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
      render: (val: boolean, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          name={['fields', getKey(index), 'nullable']}
        >
          <Checkbox />
        </Form.Item>
      )
    },
    {
      key: 'required',
      dataIndex: 'required',
      title: '必填',
      width: 50,
      render: (val: boolean, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          name={['fields', getKey(index), 'required']}
        >
          <Checkbox />
        </Form.Item>
      )
    },
    {
      key: 'readonly',
      dataIndex: 'readonly',
      title: '只读',
      width: 50,
      render: (val: boolean, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          name={['fields', getKey(index), 'readonly']}
        >
          <Checkbox />
        </Form.Item>
      )
    },
    {
      key: 'systemPreset',
      dataIndex: 'systemPreset',
      title: '系统内置',
      width: 100,
      render: (val: boolean, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          name={['fields', getKey(index), 'systemPreset']}
        >
          <Checkbox />
        </Form.Item>
      )
    },
    {
      key: 'index',
      dataIndex: 'index',
      title: '索引',
      width: 50,
      render: (val: boolean, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          name={['fields', getKey(index), 'index']}
        >
          <Checkbox />
        </Form.Item>
      )
    },
    {
      key: 'hidden',
      dataIndex: 'hidden',
      title: '隐藏',
      width: 50,
      render: (val: boolean, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          name={['fields', getKey(index), 'hidden']}
        >
          <Checkbox />
        </Form.Item>
      )
    },
    {
      key: 'validators',
      dataIndex: 'validators',
      title: '校验',
      width: 100,
      render: (val: string, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          name={['fields', getKey(index), 'validators']}
        >
          <Select
            size="small"
            mode="multiple"
            style={{ width: 75 }}
            placeholder="请选择"
          >
            {[].map(i => (
              <Select.Option key={i} value={i}>
                {i}
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
      width: 100,
      render: (val: string, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          name={['fields', getKey(index), 'transform']}
        >
          <Input size="small" width={100} placeholder="请输入" />
        </Form.Item>
      )
    },
    {
      key: 'relationTable',
      dataIndex: 'relationTable',
      title: '关联表',
      width: 100,
      render: (val: string, row: Item, index: number) => (
        <Form.Item
          noStyle
          initialValue={val}
          name={['fields', getKey(index), 'relationTable']}
        >
          <Select size="small" style={{ width: 75 }} placeholder="请选择">
            {[].map(i => (
              <Select.Option key={i} value={i}>
                {i}
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
      render: (val: string, row: Item, index: number) => (
        <Space>
          <Form.Item
            noStyle
            initialValue={val}
            name={['fields', getKey(index), 'relationTableField']}
          >
            <Select
              size="small"
              style={{ width: 75 }}
              placeholder="请选择"
              disabled={!form.getFieldValue('relationTable')}
            >
              {[].map(i => (
                <Select.Option key={i} value={i}>
                  {i}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Icon name="MinusOutlined" onClick={() => remove(index)} />
          <Icon name="PlusOutlined" onClick={() => push({})} />
        </Space>
      )
    }
  ]

  return (
    <div>
      <Form form={form}>
        <DragListView
          onDragEnd={(oldIndex: number, newIndex: number) =>
            move(oldIndex, newIndex)
          }
          handleSelector={'span[aria-label="drag"]'}
        >
          <Table
            size="small"
            columns={columns}
            dataSource={list}
            pagination={false}
            // rowKey={(r: Item, index: number) => getKey(index).toString()}
          />
        </DragListView>
      </Form>
      <Button
        block
        type="dashed"
        className="mt-4"
        onClick={() => push({})}
        icon={<Icon name="PlusOutlined" />}
      >
        添加字段
      </Button>
    </div>
  )
}
