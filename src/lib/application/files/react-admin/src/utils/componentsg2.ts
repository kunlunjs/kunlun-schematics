import type { Componentsg2OverViewProps } from '@/components/Componentsg2'

export function getKinds(
  comps: Componentsg2OverViewProps[]
): Componentsg2OverViewProps['group'][] {
  return comps.reduce((acc, cur) => {
    if (cur.group && !acc.includes(cur.group)) {
      acc.push(cur.group)
    }
    return acc
  }, [] as Componentsg2OverViewProps['group'][])
}
