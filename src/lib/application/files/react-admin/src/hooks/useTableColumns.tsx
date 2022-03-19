import type { ColumnsType } from 'antd/lib/table'
import { omit } from 'lodash'
import { useMemo } from 'react'
import { KLTableCell } from '@/components/KLComponents/KLTableCell'
import type {
  EnumNames,
  PaginationProps,
  SchemaModelByName,
  SchemaModels
} from '@/types'
import { calcTableColWidth } from '@/utils'
import { useEndPoints, useStructure } from './useEndpoints'

export const useTableColumns = ({
  model,
  pagination = {},
  sortedInfo = [],
  filteredInfo = {},
  onClick
}: {
  model: SchemaModels
  pagination?: PaginationProps
  sortedInfo?: Record<string, any>[] | null
  filteredInfo?: Record<string, any[]> | null
  onClick: (...args: any[]) => void
}) => {
  const { structure } = useStructure(model)
  const { modelsByName, enumsByName } = useEndPoints()

  const cModel = modelsByName[model] as SchemaModelByName

  const columns = useMemo(() => {
    const { interfaces: _interfaces } = structure
    const array = cModel?.fieldsName.map(i => cModel.fieldsByName[i]) || []
    const _pageNumber = pagination?.current || 1
    const _pageSize = pagination?.pageSize || 10
    const _columns: ColumnsType<Record<string, any>> = [
      {
        title: '序号',
        key: '_index',
        width: 60,
        fixed: 'left',
        align: 'center',
        render(val: any, row: any, index: number) {
          const _index = (_pageNumber - 1) * _pageSize + index + 1
          return <span>{_index}</span>
        }
      }
    ]
    array.forEach((i, ix) => {
      if (
        !i.isHidden &&
        !i.isNested &&
        !i.isDeletedAt &&
        !i.isSelectFalse &&
        (!i.isRelationField ||
          (i.isRelationField && !i.asPrimaryKeyOfForeignKey && !i.isList))
      ) {
        let width = 75
        const title = i.title || i.name
        if (i.width) {
          width = i.width
        }
        if (title.length > 3 && !i.width) {
          width = calcTableColWidth(title)
        }
        const _cln = {
          key: i.name,
          dataIndex: i.name,
          title,
          width,
          align: 'center',
          // ellipsis: true,
          render: (value: any, record: any) => {
            return (
              <KLTableCell
                model={model}
                field={i}
                ix={ix}
                value={value}
                record={record}
                onClick={onClick}
              />
            )
          },
          ...omit(i, ['type', 'props', 'style', 'tooltip', 'target', 'onClick'])
        } as ColumnsType<Record<string, any>>[number]
        // const sorted = sortedInfo?.find(i => i.columnKey === i.name)
        if (
          !i.isId &&
          !i.isRelationField &&
          !i.isNested &&
          !i.isBoolean &&
          !i.isRichText &&
          !i.isTextArea &&
          !i.isList &&
          !i.isJson &&
          !i.isFile &&
          !i.isColor
        ) {
          _cln.sorter = true
          // _cln.sortOrder = sorted?.order
        }
        if (i.isEnum) {
          // _cln.filteredValue = filteredInfo?.[i.name]
          _cln.filters = enumsByName[i.type as EnumNames]!.options.map(i => {
            if (typeof i !== 'object') {
              return { text: i, value: i }
            }
            return { text: i.label, value: i.value }
          })
        }
        if (i.isBoolean) {
          // _cln.filteredValue = filteredInfo?.[i.name]
          _cln.filters = [
            { text: '是', value: 'true' },
            { text: '否', value: 'false' }
          ]
        }
        _columns.push(_cln)
      }
    })

    return _columns
  }, [model, pagination, filteredInfo, sortedInfo])

  return columns
}
