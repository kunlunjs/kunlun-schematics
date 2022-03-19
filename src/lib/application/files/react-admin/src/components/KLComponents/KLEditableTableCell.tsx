import { Checkbox, Form, Input, Select } from 'antd'
import type { FC, HTMLAttributes, ReactNode } from 'react'
import type { FormItemProps, SelectProps } from '@/types'

interface KLEditableTableCellProps extends HTMLAttributes<HTMLElement> {
  editing: boolean
  title: string
  name: string
  index: number
  required?: boolean
  children: ReactNode
  record: Record<string, any>
  rules: FormItemProps['rules']
  options?: SelectProps['options']
  formType: 'Checkbox' | 'Input' | 'Select'
}

const formMap = {
  Checkbox: () => <Checkbox />,
  Input: () => (
    <Input
      size="small"
      bordered={false}
      placeholder="请输入"
      style={{ borderBottom: '1px solid #EEE' }}
    />
  ),
  Select: ({
    options = []
  }: {
    options?: KLEditableTableCellProps['options']
  }) => (
    <Select
      size="small"
      bordered={false}
      options={options}
      placeholder="请选择"
      style={{ borderBottom: '1px solid #EEE' }}
    />
  )
}

export const KLEditableTableCell: FC<KLEditableTableCellProps> = ({
  editing,
  title,
  name,
  index,
  rules,
  record,
  formType,
  children,
  options = [],
  required = false,
  ...resetProps
}) => {
  const Comp = formMap[formType]
  console.log('KLEditableTableCell', name, index)
  return (
    <td {...resetProps}>
      {Comp ? (
        <Form.Item name={name} className="mr-0" rules={rules || [{ required }]}>
          <Comp options={options} />
        </Form.Item>
      ) : null}
    </td>
  )
}
