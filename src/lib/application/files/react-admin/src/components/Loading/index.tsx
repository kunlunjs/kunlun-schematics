import classnames from 'classnames'
import { range } from 'lodash'
import type { CSSProperties, FC } from 'react'
import { memo } from 'react'
import { Types } from './helpers'
import 'loaders.css'

export interface LoadingProps {
  size?: string
  active?: boolean
  style?: CSSProperties
  innerClassName?: string
  color?: CSSProperties['color']
  type?:
    | 'ball-pulse'
    | 'ball-grid-pulse'
    | 'ball-clip-rotate'
    | 'ball-clip-rotate-pulse'
    | 'square-spin'
    | 'ball-clip-rotate-multiple'
    | 'ball-pulse-rise'
    | 'ball-rotate'
    | 'cube-transition'
    | 'ball-zig-zag'
    | 'ball-zig-zag-deflect'
    | 'ball-triangle-path'
    | 'ball-scale'
    | 'line-scale'
    | 'line-scale-party'
    | 'ball-scale-multiple'
    | 'ball-pulse-sync'
    | 'ball-beat'
    | 'line-scale-pulse-out'
    | 'line-scale-pulse-out-rapid'
    | 'ball-scale-ripple'
    | 'ball-scale-ripple-multiple'
    | 'ball-spin-fade-loader'
    | 'line-spin-fade-loader'
    | 'triangle-skew-spin'
    | 'pacman'
    | 'semi-circle-spin'
    | 'ball-grid-beat'
    | 'ball-scale-random'
}

const Loading: FC<LoadingProps> = memo(
  ({
    size,
    style,
    active = true,
    innerClassName,
    color = '#357B70',
    type = 'ball-scale-multiple'
  }) => {
    const divs = range(Types[type])
    const classes = classnames({
      'loader': true,
      'loader-active': active,
      'loader-hidden': !active,
      [`loader-${size}`]: size !== 'md'
    })
    const innerClasses = classnames(['loader-inner', type, innerClassName])

    const renderDIV = (n: number) => {
      const styles = style || {}
      if (color) {
        styles.backgroundColor = color
      }
      return <div key={n} style={styles} />
    }

    return (
      <div className={classes} style={style}>
        <div className={innerClasses}>{divs.map(n => renderDIV(n))}</div>
      </div>
    )
  }
)

export default Loading
