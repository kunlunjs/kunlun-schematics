import type * as Icons from '@ant-design/icons'
import type * as AntD from 'antd'
import type { ComponentClass } from 'react'

/**
 * 1. 如果能推断出函数式组件的类型就取 props 类型
 * 2. 如果能推断出 class 式组件的类型就取 props 类型
 */
export type PickProps<T> = T extends (props: infer P1) => any
  ? P1
  : T extends ComponentClass<infer P2>
  ? P2
  : unknown

/**
 * @ant-design/icons 中的所有导出
 */
export type AllIconKeys = keyof typeof Icons
/**
 * antd 中的所有导出
 */
export type AllAntDKeys = keyof typeof AntD

/**
 * 取 @ant-design/icons 或 antd 中所有导出的大写字母开头的
 */
export type PickCapitalize<K extends AllIconKeys | AllAntDKeys> =
  K extends Capitalize<K> ? K : never

/**
 * 取 @ant-design/icons 中导出的大写字母开头的作为组件
 */
export type IconNames = PickCapitalize<AllIconKeys>
/**
 * @ant-design/icons 组件的 props 类型
 */
export type PickIconProps<K extends IconNames> = PickProps<typeof Icons[K]>

/*----------------------------------------------------------------*/

export type IKLComponents = Exclude<
  PickCapitalize<AllAntDKeys>,
  'Grid' | 'Col' | 'ConfigProvider' | 'Row' | 'TreeSelect'
>
/**
 * antd 组件的 props 类型
 */
export type TKLComponentProps<K extends IKLComponents = IKLComponents> =
  PickProps<typeof AntD[K]>

// export const klComponents = Object.keys(AntD).filter(
//   i =>
//     /^[A-Z]/.test(i) &&
//     !['Grid', 'Col', 'ConfigProvider', 'Row', 'TreeSelect'].includes(i)
// ) as IKLComponents[]
