import { useMemo } from 'react'
import type {
  IOptions,
  KLFormItemProps
} from '@/components/KLComponents/helpers'
import type { SchemaModelByName, SchemaModels } from '@/types'
import { useEndPoints } from './useEndpoints'

export const useTabsTableFormItems = ({
  model,
  cModel,
  showColumns
}: {
  model: SchemaModels
  showColumns: string[]
  cModel: SchemaModelByName
}) => {
  const { modelsByName } = useEndPoints()

  const items = useMemo(() => {
    return cModel?.fieldsName.reduce(
      (result, cur) => {
        const field = cModel?.fieldsByName[cur]
        if (field?.isEnum) {
          result =
            result[0].label === '分组展示'
              ? result
              : [
                  {
                    label: '分组展示',
                    name: 'tabs',
                    type: 'Radio',
                    options: []
                  },
                  result[0]
                ]
          // @ts-ignore
          result[0].options.push({
            label: field.title || field.name,
            value: field.name
          })
        }
        return result
      },
      [
        // { label: '分组展示', name: 'tab', type: 'Radio', options: [] },
        {
          label: '表格显示列',
          name: 'columns',
          type: 'Select',
          props: {
            mode: 'multiple',
            allowClear: true
          },
          initialValue: showColumns,
          options: cModel?.fieldsName?.reduce(
            (result, cur) => {
              const field = cModel!.fieldsByName[cur]
              const {
                isDeletedAt,
                asPrimaryKeyOfParent,
                isParentField,
                isChildrenField,
                name
              } = field
              if (
                !isDeletedAt &&
                !asPrimaryKeyOfParent &&
                !isParentField &&
                !isChildrenField &&
                !['deletedAt'].includes(name)
              ) {
                result.push({
                  label: field.title || field.name,
                  value: field.name
                })
              }
              return result
            },
            [{ label: '序号', value: '_index' }] as IOptions
          )
        }
      ] as KLFormItemProps[]
    )
  }, [model, modelsByName, showColumns]) as KLFormItemProps[]

  return items
}
