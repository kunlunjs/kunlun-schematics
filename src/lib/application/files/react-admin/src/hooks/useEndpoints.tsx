import { useRequest } from 'ahooks'
import { useEffect, useMemo, useState } from 'react'
import type { KLFormItemProps } from '@/components/KLComponents/helpers'
import { getForms } from '@/components/KLRenderFactory/helpers'
import { services } from '@/services'
import type {
  DMMFField,
  EnumNames,
  EnumsByName,
  IKLTableButtons,
  IKLTableModalConfig,
  InterfaceType,
  KLTableColumnProps,
  ModelsByName,
  SchemaModels
} from '@/types'

export type Services = keyof typeof services

export type Structure = {
  tag: string
  enumsByName: EnumsByName
  fieldsName: string[]
  fieldsByName: Record<string, DMMFField>
  buttons: IKLTableButtons
  columns: KLTableColumnProps
  modalConfig: IKLTableModalConfig
  searchFormItems: KLFormItemProps[]
  effectFormItems: KLFormItemProps[]
  interfaces: { [K in InterfaceType]?: Services }
}

type KLEndpoints = {
  modelNames: SchemaModels[]
  enumsByName: EnumsByName
  modelsByName: ModelsByName
}
let klEndpoints: KLEndpoints = {
  modelNames: [],
  enumsByName: {},
  modelsByName: {}
}

export const useEndPoints = () => {
  // const [data, setData] = useState<{
  //   modelsByName: ModelsByName
  //   enumsByName: EnumsByName
  // }>(null!)

  const { run } = useRequest(
    async () => {
      const res = await services['全局接口@获取所有接口']()
      if (res.success) {
        klEndpoints = res.data
        // setData(res?.data)
      }
    },
    {
      manual: true
    }
  )

  useEffect(() => {
    if (!klEndpoints.modelNames.length) {
      run()
    }
  }, [])

  return klEndpoints as KLEndpoints
}

export const useStructure = (model: SchemaModels) => {
  const [refresh, setRefresh] = useState<number>(Date.now())
  const [enumsByName] = useState<EnumsByName>(klEndpoints.enumsByName)
  const [modelsByName, setModels] = useState<ModelsByName>(
    klEndpoints.modelsByName
  )
  const {
    tag,
    comment,
    interfaces = {},
    fieldsName = [],
    fieldsByName = {},
    documentation = ''
  } = modelsByName?.[model] || {}

  const fields = useMemo(() => {
    return fieldsName.map(name => fieldsByName[name])
  }, [fieldsByName])

  const structure = useMemo(() => {
    if (comment) {
      const addModalTitle = interfaces.add && `添加${tag}`
      const buttons = []
      const modalConfig = []
      if (addModalTitle && !/@adminAddIgnore/.test(documentation)) {
        buttons.push({
          name: addModalTitle,
          type: 'primary'
        })
        modalConfig.push({
          title: addModalTitle
        })
      } else if (interfaces.update && `更新${tag}`) {
        modalConfig.push({
          title: `更新${tag}`
        })
      }
      return {
        tag,
        buttons,
        interfaces,
        fieldsName,
        enumsByName,
        modalConfig,
        fieldsByName,
        searchFormItems: getForms(fields),
        effectFormItems: getForms(
          fields,
          true,
          tag === '管理员' ? ['password'] : []
        )
      }
    }
    return {
      tag: '',
      enumsByName: {},
      fieldsByName: {},
      fieldsName: [],
      interfaces: {},
      columns: [],
      searchFormItems: [],
      effectFormItems: [],
      buttons: [],
      modalConfig: []
    }
  }, [model, modelsByName])

  useEffect(() => {
    const getRelatedList = async () => {
      const promises: Promise<any>[] = []
      const items: DMMFField[] = []
      fieldsName.forEach(async name => {
        const item = fieldsByName[name]
        if (
          item.serviceName &&
          typeof services[item.serviceName as Services] === 'function'
        ) {
          promises.push(
            services[item.serviceName as Services]({
              _pageSize: 999
            })
          )
          items.push(item)
        }
      })
      const data = await Promise.all(promises)
      data.forEach((i, index) => {
        // TODO
        // items[index].options = items[index]?.labelNames
        //   ? i?.data?.items || []
        //   : i?.data?.items.map((i: any) => {
        //       return {
        //         label: i[items[index]?.showFieldName || i.id],
        //         value: i.id,
        //         children: i.children || []
        //       }
        //     })
        items[index].options = i?.data?.items.map((i: any) => {
          const showFieldName = items[index]?.showFieldName || i.id
          let label = i[showFieldName]
          if (items[index].isParentField && i?.parent?.[showFieldName]) {
            label = `${i?.parent[showFieldName]}/${label}`
          }
          return {
            label,
            value: i.id,
            children: i.children || []
          }
        })
      })
      setModels({ ...modelsByName })
    }
    getRelatedList()
  }, [model, refresh])

  const forceRefresh = () => {
    setRefresh(Date.now())
  }

  return { structure: structure as Structure, forceUpdate: forceRefresh }
}

export const getEnumLabel = (enumName: string, value: string) => {
  return klEndpoints.enumsByName[enumName as EnumNames]!.labelsByValue[value]
}
