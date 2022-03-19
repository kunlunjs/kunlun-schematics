import type { ColumnsType } from 'antd/lib/table'
import type { FC } from 'react'
import Icon from '@/components/Icon'
import type { KLTableOperationProps } from '@/components/KLComponents'
import { KLTableOperation } from '@/components/KLComponents'
import { KLDropdown } from '@/components/KLComponents/KLDropdown'

interface KLTableOperationCellProps {
  columns: ColumnsType<Record<string, any>>
  record: Record<string, any>
  hasDetailInterface?: boolean
  hasUpdateInterface?: boolean
  hasDeleteInterface?: boolean
  onView?: (...args: any[]) => void
  onUpdate?: (...args: any[]) => void
  onDelete?: (...args: any[]) => void
  onConfirm?: (...args: any[]) => void
  onApprove?: (...args: any[]) => void
  onAbandoned?: (...args: any[]) => void
}

const iconStyle = { color: '#357B70' }

export const KLTableOperationCell: FC<KLTableOperationCellProps> = ({
  columns,
  record,
  onView,
  onUpdate,
  onDelete,
  onConfirm,
  onApprove,
  onAbandoned,
  hasDetailInterface,
  hasUpdateInterface,
  hasDeleteInterface
}) => {
  const isApprover = localStorage.getItem('role.name') === 'approver'
  const { pathname } = window.location
  const isRolesPage = pathname.startsWith('/roles')
  const isAdminsPage = pathname.startsWith('/admins')
  const { isSystemPreset, approvalStatus } = record
  const viewable = !!hasDetailInterface
  let editable =
    ((isSystemPreset && isApprover) || !isSystemPreset) && !!hasUpdateInterface
  if (isRolesPage && isSystemPreset) {
    editable = false
  }
  if (isAdminsPage && !isApprover) {
    editable = false
  }
  let deleteable = editable && !!hasDeleteInterface
  if (isAdminsPage && record.username === localStorage.getItem('username')) {
    deleteable = false
  }
  const canAbandoned = columns.some(
    i => i.key === 'approvalStatus' && approvalStatus === 'Published'
  )
  const canApprove =
    columns.some(
      i =>
        i.key === 'approvalStatus' &&
        ['Pending', 'Rejected'].includes(approvalStatus)
    ) && localStorage.getItem('role.name') === 'approver'
  const items = [
    // viewable && ['查看', handleView],
    viewable &&
      onView &&
      (() => (
        <Icon
          tooltip="查看详情"
          name="EyeOutlined"
          style={iconStyle}
          onClick={() => onView(record.id)}
        />
      )),
    // editable && ['编辑', handleEdit],
    editable &&
      onUpdate &&
      (() => (
        <Icon
          tooltip="编辑更新"
          name="EditOutlined"
          style={iconStyle}
          onClick={() => onUpdate(record.id)}
        />
      )),
    canApprove &&
      onApprove &&
      (() => (
        <KLDropdown
          name="审核"
          onClick={onApprove}
          items={[
            {
              label: '同意',
              value: `Published@@${record.id}`
            },
            {
              label: '拒绝',
              value: `Rejected@@${record.id}`
            }
          ]}
        />
      )),
    // canAbandoned && ['废弃', handleAbandoned],
    canAbandoned &&
      onAbandoned &&
      (() => (
        <Icon
          tooltip="废弃"
          name="RestOutlined"
          style={iconStyle}
          onClick={() => onAbandoned(record.id)}
        />
      )),
    deleteable &&
      onConfirm && {
        title: '删除',
        onClick: onDelete,
        onConfirm: onConfirm
      }
  ].filter(Boolean) as KLTableOperationProps['items']

  return <KLTableOperation record={record} items={items} />
}
