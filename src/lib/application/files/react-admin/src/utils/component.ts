import type { ComponentsOverViewProps } from '@/components/Components'

export function getGroups(
  comps: ComponentsOverViewProps[]
): ComponentsOverViewProps['group'][] {
  return comps.reduce((acc, cur) => {
    if (cur.group && !acc.includes(cur.group)) {
      acc.push(cur.group)
    }
    return acc
  }, [] as ComponentsOverViewProps['group'][])
}

export const approvalStatus = [
  'Pending',
  'Rejected',
  'Published',
  'Abandoned',
  '待审核',
  '已发布',
  '已拒绝',
  '已废弃'
] as const

export type ApprovalStatus = typeof approvalStatus[number]

export const isApprovalStatus = (val: string) => {
  return (
    typeof val === 'string' && approvalStatus.includes(val as ApprovalStatus)
  )
}

export const BadgeColor: Record<ApprovalStatus, string> = {
  待审核: 'grey',
  Pending: 'cyan',
  Rejected: 'red',
  已拒绝: 'red',
  已发布: 'green',
  Published: 'green',
  已废弃: 'yellow',
  Abandoned: 'yellow'
}

export const formatSearchItems = (searchFormItems: any) => {
  const arr = [...searchFormItems]
  const list =
    arr.length &&
    arr.filter((val: any, index: number) => {
      if (val.type === 'Radio') {
        arr.splice(index, 1)
      }
      return val.type === 'Radio'
    })
  return arr.concat(list)
}
