import type { ColumnsType } from 'antd/lib/table'
import { useMemo } from 'react'

export const useTableScrollX = ({
  columns,
  tableWidth
}: {
  columns: ColumnsType<Record<string, any>>
  tableWidth: number
}) => {
  const tableScrollX = useMemo(() => {
    const sider = document.getElementsByClassName('ant-layout-sider')[0]
    if (sider) {
      const width =
        window.innerWidth -
        sider.getBoundingClientRect()?.width -
        24 * 2 -
        32 * 2
      return tableWidth < width ? width : tableWidth
    }
    return 1280
  }, [window.innerWidth, columns, tableWidth])

  return tableScrollX
}
