import { Table } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import type { SortOrder } from 'antd/lib/table/interface'
import { merge, omit } from 'lodash'
import type { ForwardRefRenderFunction, Key } from 'react'
import { useRef } from 'react'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { useTableScrollX } from '@/hooks/useTableScrollX'
import { useTableWidth } from '@/hooks/useTableWidth'
import type {
  TableRef,
  TableProps,
  PaginationProps,
  SchemaModels
} from '@/types'
import Icon from '../Icon'

type Sort = { columnKey: string; order: SortOrder }

const mergeSorted = (
  // 已存在排序数组
  arr: Sort[] | null,
  obj: Sort | Sort[]
): Sort[] => {
  const result: Sort[] = Array.isArray(obj) ? [...obj] : [{ ...obj }]
  const keys: string[] = []
  if (Array.isArray(obj)) {
    obj.forEach(i => {
      if (keys.includes(i.columnKey)) {
        keys.push(i.columnKey)
        result.push(i)
      }
    })
  }
  if (arr) {
    arr.forEach(i => {
      if (
        !Array.isArray(obj) &&
        keys.includes(i.columnKey) &&
        i.columnKey !== obj.columnKey
      ) {
        keys.push(i.columnKey)
        result.push(i)
      }
    })
  }
  return result
}

interface KLTableProps
  extends Omit<TableProps, 'dataSource' | 'onChange' | 'rowSelection'> {
  model: SchemaModels
  total: number
  data: TableProps['dataSource']
  onChange?: (
    page: Record<string, any>,
    filters: Record<string, any[]>,
    sorter: Record<string, any>[]
  ) => void
  columns: ColumnsType<Record<string, any>>
  rowSelection?: false | TableProps['rowSelection']
}

const WithRefKLTable: ForwardRefRenderFunction<TableRef, KLTableProps> = (
  {
    model,
    data,
    columns,
    total = 0,
    pagination,
    rowKey = 'id',
    size = 'small',
    bordered = true,
    ...props
  },
  ref
) => {
  const currentSorterRef = useRef<{
    max: number
    keys: string[]
    sorters: Record<string, number>
  }>({
    max: 0,
    keys: [],
    sorters: {}
  })
  const tableWidth = useTableWidth(columns)
  const tableScrollX = useTableScrollX({ columns, tableWidth })
  const [filterAndSortInfo, setFilterAndSortInfo] = useState<{
    filteredInfo: Record<string, any> | null
    sortedInfo: Sort[] | null
  }>({
    filteredInfo: null,
    sortedInfo: null
  })
  const [selectedRows, setSelectedRows] = useState<Record<string, any>[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<(number | string)[]>(
    []
  )
  const [paged, setPaged] = useState<PaginationProps>({
    ...pagination,
    total,
    current: 1,
    pageSize: 10,
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal: (tal: number) => `总数：${tal}`
  })

  useImperativeHandle(
    ref,
    () => {
      return {
        getState() {
          return {
            pagination: paged,
            selectedRows,
            selectedRowKeys,
            ...filterAndSortInfo
          }
        },
        clearFilterAndSorter() {
          setFilterAndSortInfo({
            sortedInfo: null,
            filteredInfo: null
          })
        }
      }
    },
    [paged, selectedRowKeys, filterAndSortInfo]
  )

  const handleChange: TableProps['onChange'] = (
    paging,
    filters,
    sorter,
    extra
  ) => {
    // @ts-ignore
    const { columnKey } = sorter || {}
    const cs = currentSorterRef.current
    if (columnKey && !cs.keys.includes(columnKey)) {
      currentSorterRef.current = {
        max: cs.max + 1,
        keys: cs.keys.concat(columnKey),
        sorters: {
          ...cs.sorters,
          [columnKey]: cs.max + 1
        }
      }
    }
    setPaged({ ...paged, ...pagination, ...paging })
    const filteredInfo = merge(filterAndSortInfo.filteredInfo, filters)
    const sortedInfo = mergeSorted(filterAndSortInfo.sortedInfo, sorter as Sort)
    setFilterAndSortInfo({
      filteredInfo,
      sortedInfo
    })
    if (props.onChange) {
      props.onChange(paging, filteredInfo, sortedInfo)
    }
  }

  const handleSelectChange = (
    selectedKeys: Key[],
    selectedRows: Record<string, any>[]
  ) => {
    setSelectedRows(selectedRows)
    setSelectedRowKeys(selectedKeys)
    if (typeof props.rowSelection === 'object' && props.rowSelection.onChange) {
      props.rowSelection.onChange(selectedKeys, selectedRows)
    }
  }

  const rowSelection: TableProps['rowSelection'] =
    props.rowSelection !== false
      ? {
          type: 'radio',
          selectedRowKeys,
          onChange: handleSelectChange,
          ...omit(props.rowSelection, ['selectedRowKeys', 'onChange'])
        }
      : undefined

  const { sortedInfo, filteredInfo } = filterAndSortInfo

  const sortedByKey =
    sortedInfo?.reduce((a, c) => {
      a[c.columnKey] = c
      return a
    }, {} as Record<string, Sort>) || {}

  const cs = currentSorterRef.current
  columns.map(i => {
    if (!filteredInfo) {
      i.filteredValue = null
    } else if (filteredInfo?.[i.key as string]) {
      i.filteredValue = filteredInfo?.[i.key as string]
    }
    if (!sortedInfo?.length) {
      i.sortOrder = null
    } else if (sortedInfo) {
      if (cs.sorters[i.key as string]) {
        i.sorter = {
          multiple: cs.sorters[i.key as string]
        }
      }
      i.sortOrder = sortedByKey[i.key as string]?.order
    }
    return i
  })

  return (
    <div>
      {!!selectedRowKeys.length && (
        <div className="bg-[#357B70] bg-opacity-10 mb-4 p-2">
          <span className="mr-2">已选择：{selectedRowKeys.length} 条记录</span>
          <Icon
            name="ClearOutlined"
            tooltip="清空选择"
            style={{ color: '#357B70' }}
            onClick={() => handleSelectChange([], [])}
          />
        </div>
      )}
      <Table
        size={size}
        rowKey={rowKey}
        dataSource={data}
        bordered={bordered}
        rowSelection={rowSelection}
        scroll={{ x: tableScrollX }}
        {...omit(props, ['rowSelection'])}
        pagination={{
          ...paged,
          total
          // current: total < 10 && (paged.current as number) > 1 ? 1 : paged.current
        }}
        columns={columns}
        onChange={handleChange}
        locale={{
          emptyText:
            (paged.current as number) > 1 && total <= 10
              ? `第${paged.current}页无符合条件的数据，请重新点击查询`
              : '暂无数据'
        }}
        expandable={{
          expandIcon: ({ expanded, record, onExpand }) => {
            if (!record?.children?.length) {
              return null
            } else {
              return expanded ? (
                <Icon
                  name="MinusCircleOutlined"
                  className="m-1 -ml-4"
                  // @ts-ignore
                  onClick={e => onExpand(record, e)}
                />
              ) : (
                <Icon
                  name="PlusCircleOutlined"
                  className="m-1 -ml-4"
                  // @ts-ignore
                  onClick={e => onExpand(record, e)}
                />
              )
            }
          },
          rowExpandable: (record: any) => !!record?.children?.length
        }}
      />
    </div>
  )
}

export const KLTable = forwardRef(WithRefKLTable)

KLTable.displayName = 'KLTable'
