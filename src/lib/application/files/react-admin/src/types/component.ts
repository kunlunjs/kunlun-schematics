import type { TableColumnProps } from 'antd'
import type { ComponentProps, CSSProperties } from 'react'
import type Icon from '@/components/Icon'
import type {
  AvatarProps,
  BadgeProps,
  DatePickerProps,
  ImageProps,
  ProgressProps,
  TagProps
} from './antd'
import type { ButtonProps, TableProps } from './antd'
import type { IconNames } from './common'
import type { SchemaModels } from './endpoints'

/*----------------------------------------------------------------*/
const tableCellContentType = [
  'Avatar', // 头像
  'Badge', // 徽标，默认使用 antd Badge 组件
  'Code', // 代码
  'Chart', // 图表
  'DateTime', // 日期时间，使用 dayjs 处理
  'File', // 文件
  'Icon', // 图标
  'Image', // 图片
  'Join', // 文本拼接，默认使用 ，拼接
  'JSON', // JSON
  'Progress', // 进度条，默认使用 antd Progress 组件
  'Status', // 状态
  'Tag', // 标签
  'Text', // 文本，default
  'TextArea' // 富文本
]
// 表格cell 显示类型
export type TableCellContentType = typeof tableCellContentType[number]
// 单元格渲染
export type IKLTableColumn = TableColumnProps<'columns'> & {
  /**
   * 显示类型
   */
  type?: TableCellContentType
  fieldType?: string // 枚举类型
  props?:
    | AvatarProps
    | BadgeProps
    | DatePickerProps
    | ImageProps
    | ProgressProps
    | TagProps
  /**
   * TODO 值转换函数
   */
  transfomer?: string
  /**
   * 跳转链接
   */
  // url?: string
  /**
   * 是否显示额外信息
   */
  tooltip?: string
  /**
   * 附加样式
   */
  style?: CSSProperties
  /**
   * 点击行为
   */
  onClick?: (arg?: any) => any
  /**
   * 外链跳转方式
   */
  target?: ComponentProps<'a'>['target']
}

export type IKLTableColumns = IKLTableColumn[]

/*----------------------------------------------------------------*/

/**
 * 表格上方按钮组
 */
export type IKLTableButton = {
  /**
   * common - 通用 icon：刷新、尺寸、全屏等
   * system - 来自系统按钮，如配置等
   */
  range?: 'common' | 'system'
  /**
   * 按钮中文字
   */
  name?: string
  /**
   * 只有 icon 和 tooltip 时显示一个提示
   */
  tooltip?: string
  className?: string
  style?: CSSProperties
  onClick?: (...args: any[]) => void
  /**
   * 下拉菜单
   */
  menus?: { label: string; value: string }[]
  /**
   * 当 menus 存在时，activeKey 表示活跃的菜单
   */
  activeKey?: string
  type?: ButtonProps['type']
  icon?: ComponentProps<typeof Icon>['name']
}

export type IKLTableButtons = IKLTableButton[]

// 定义表格上方按钮组点击事件类型
export type KLButtonOnClick<T extends IKLTableButtons> = Record<
  NonNullable<T[number]['name']>,
  IKLTableButton['onClick']
>

/* ---------------- 自定义组件 ---------------- */
export type TableTitleProps = TableProps['title']

/**
 * 菜单/路由配置
 */
export type KLTableColumnProps = Required<TableProps['columns']>

export type RouteConfigChildren = Exclude<RouteConfig, /* 'id' */ []>[]

export type RouteConfigs = RouteConfig[]

export type RouteConfig = {
  id?: number
  key?: string
  /**
   * 访问路径，支持单页路由和 http 路由
   */
  path?: string
  /**
   * 当 path 是 http 路由时此 target 生效
   */
  target?: ComponentProps<'a'>['target']
  /**
   * 在菜单中的显示名
   */
  name?: string
  /**
   * 在菜单中的显示名前的 icon
   */
  icon?: IconNames
  /**
   * 排序
   */
  sort?: number
  /**
   * 路径是否严格匹配，传给 react-router-dom
   */
  exact?: boolean
  /**
   * 【路由】是否忽略
   */
  ignore?: boolean
  /**
   * 【菜单】是否不在菜单中显示
   */
  hidden?: boolean
  /**
   * 对应的页面或组件
   */
  component?: string
  /**
   * 关联的后端 model
   */
  model?: string
  /**
   * 子路由
   */
  children?: RouteConfigChildren
  /**
   * 导航栏位置：左侧边 | 顶部 | 无
   */
  layout?: 'sider' | 'top' | 'none'
  /**
   * 页面基础样式
   */
  style?: {
    /**
     * 页面对应的背景色
     */
    background?: CSSProperties['background']
  }
  /**
   * 页面相关配置信息
   */
  config?: {
    model?: SchemaModels
    // TODO: 渲染引擎，待实现和补充
    template: 'Card' | 'Table' | 'Form' | 'Description' | 'Chart' | 'Graphical'
  }
}

export type IKLTableModalConfig = {
  /**
   * 弹框标题
   */
  title: string
}[]
