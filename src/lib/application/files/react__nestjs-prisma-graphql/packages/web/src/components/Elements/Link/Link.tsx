import clsx from 'clsx'
import type { LinkProps } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom'

export const Link = ({ className, children, ...props }: LinkProps) => {
  return (
    <RouterLink
      className={clsx('text-indigo-600 hover:text-indigo-900', className)}
      {...props}
    >
      {children}
    </RouterLink>
  )
}
