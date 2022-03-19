import * as Icons from '@ant-design/icons'
import { Tooltip } from 'antd'
import type { ComponentProps, CSSProperties, FC, ReactNode } from 'react'
import { createElement } from 'react'
import type { IconNames, TooltipProps } from '@/types'
import './index.less'

export type IconAlign = 'left' | 'center' | 'right'

export type IconsProps = {
  icons: (ComponentProps<typeof Icon> & {
    /**
     * 是否 Radio 类型 icon 组
     */
    radio?: true
    /**
     * 提示
     */
    tooltip?: string
    /**
     * 对齐位置
     */
    align: IconAlign
  })[]
}

// const Icon = <T extends IconNames, P extends Object = PickIconProps<T>>({
//   name,
//   ...props
// }: {
//   name: T
// } & Exclude<P, 'name'>) => {
//   // 默认返回 LoadingOutlined 组件
//   const [Comp, setComp] = useState<ClassType<any, any, any>>(LoadingOutlined)

//   useEffect(() => {
//     import(`@ant-design/icons/${name}.js`).then(mod => {
//       setComp(mod.default)
//     })
//   }, [name])

//   return <Comp {...props} />
// }

interface IconProps
  extends Partial<
    Pick<
      TooltipProps,
      | 'arrowPointAtCenter'
      | 'autoAdjustOverflow'
      | 'color'
      | 'defaultVisible'
      | 'destroyTooltipOnHide'
      | 'getPopupContainer'
      | 'mouseEnterDelay'
      | 'mouseLeaveDelay'
      | 'overlayClassName'
      | 'overlayStyle'
      | 'overlayInnerStyle'
      | 'placement'
      | 'trigger'
      | 'visible'
      | 'zIndex'
      | 'onVisibleChange'
    >
  > {
  name: IconNames
  /**
   * Tooltip 相关
   */
  tooltip?: ReactNode
  /**
   * Icon 相关
   */
  spin?: boolean
  rotate?: number
  className?: string
  style?: CSSProperties
  twoToneColor?: string
  onClick?: any // (...args: any[]) => any
}

/**
 * 比上面的 dynamic import 方案减小很多体积
 */
const Icon: FC<IconProps> = ({
  name,
  tooltip,
  arrowPointAtCenter,
  autoAdjustOverflow,
  color,
  defaultVisible,
  destroyTooltipOnHide,
  getPopupContainer,
  mouseEnterDelay,
  mouseLeaveDelay,
  overlayClassName,
  overlayStyle,
  overlayInnerStyle,
  placement,
  trigger,
  visible,
  zIndex,
  onVisibleChange,
  ...rest
}) => {
  if (tooltip) {
    return (
      <Tooltip
        title={tooltip}
        arrowPointAtCenter={arrowPointAtCenter}
        autoAdjustOverflow={autoAdjustOverflow}
        color={color}
        defaultVisible={defaultVisible}
        destroyTooltipOnHide={destroyTooltipOnHide}
        mouseEnterDelay={mouseEnterDelay}
        mouseLeaveDelay={mouseLeaveDelay}
        overlayClassName={overlayClassName}
        overlayStyle={overlayStyle}
        overlayInnerStyle={overlayInnerStyle}
        placement={placement}
        trigger={trigger}
        visible={visible}
        zIndex={zIndex}
        onVisibleChange={onVisibleChange}
      >
        {createElement((Icons as any)[name], {
          ...rest
        })}
      </Tooltip>
    )
  }
  return createElement((Icons as any)[name], {
    ...rest
  })
}

export default Icon
