import type { FormInstance } from 'antd'
import type { PaginationProps } from './antd'

export interface FormRef {
  getValues: () => Record<string, any>
  getFormInstance: () => FormInstance
  clearFormValues: () => void
}

export interface TableRef {
  getState(): {
    pagination: PaginationProps
    selectedRows: Record<string, any>[]
    selectedRowKeys: (number | string)[]
    filteredInfo: Record<string, any> | null
    sortedInfo: Record<string, any>[] | null
  }
  clearFilterAndSorter: () => void
}
