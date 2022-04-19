import clsx from 'clsx'
import type { ButtonHTMLAttributes, ReactElement } from 'react'
import { forwardRef } from 'react'
import { Spinner } from '../../Elements/Spinner'

const variants = {
  primary: 'bg-blue-600 text-white hover:bg-gray-50:text-blue-600',
  inverse: 'bg-white text-blue-600 hover:bg-blue-600:text-white',
  danger: 'bg-red-600 text-white hover:bg-red-50:text-red-600'
}

const sizes = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-2 px-6 text-md',
  lg: 'py-3 px-8 text-lg'
}

type IconProps =
  | { startIcon: ReactElement; endIcon?: never }
  | { endIcon: ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined }

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  isLoading?: boolean
} & IconProps

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          'flex items-center justify-center rounded-md border border-gray-300 font-medium shadow-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-70',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && <Spinner size="sm" className="text-current" />}
        {!isLoading && startIcon}
        <span className="mx-2">{props.children}</span> {!isLoading && endIcon}
      </button>
    )
  }
)

Button.displayName = 'Button'
