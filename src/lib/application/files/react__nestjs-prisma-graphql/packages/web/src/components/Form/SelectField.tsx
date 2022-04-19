import clsx from 'clsx'
import type { ReactNode } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

import type { FieldWrapperPassThroughProps } from './FieldWrapper'
import { FieldWrapper } from './FieldWrapper'

type Option = {
  label: ReactNode
  value: string | number | string[]
}

type SelectFieldProps = FieldWrapperPassThroughProps & {
  options: Option[]
  className?: string
  defaultValue?: string
  placeholder?: string
  registration: Partial<UseFormRegisterReturn>
}

export const SelectField = (props: SelectFieldProps) => {
  const {
    label,
    options,
    error,
    className,
    defaultValue,
    registration,
    placeholder
  } = props
  return (
    <FieldWrapper label={label} error={error}>
      <select
        placeholder={placeholder}
        name="location"
        className={clsx(
          'mt-1 block w-full rounded-md border-gray-600 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm',
          className
        )}
        defaultValue={defaultValue}
        {...registration}
      >
        {options.map(({ label, value }) => (
          <option key={label?.toString()} value={value}>
            {label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  )
}
