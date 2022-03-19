import { useRequest } from 'ahooks'
import { Avatar, Descriptions } from 'antd'
import classnames from 'classnames'
import dayjs from 'dayjs'
import { isPlainObject } from 'lodash'
import qs from 'query-string'
import type { FC, ReactNode } from 'react'
import { Fragment, useMemo, useEffect } from 'react'
import { useFullScreenHandle } from 'react-full-screen'
import JsonView from 'react-json-view'
import { useLocation } from 'react-router-dom'
import { useStructure } from '@/hooks/useEndpoints'
import { useEndPoints } from '@/hooks/useEndpoints'
import { services } from '@/services'
// import type { TableProps } from '@/types'
import type { DMMFField, EnumNames, SchemaModels } from '@/types'
import { isColor, isDateTime, isRichText } from '@/utils'
import Icon from '../Icon'
import { KLFullScreen } from '../KLComponents/KLFullScreen'
import { KLImage } from '../KLComponents/KLImage'

interface KLDescriptionFactoryProps {}

const KLDescriptionFactory: FC<KLDescriptionFactoryProps> = () => {
  const handle = useFullScreenHandle()
  const { search } = useLocation()
  const { id, model } = qs.parse(search)
  const { modelNames, modelsByName } = useEndPoints()
  const { structure } = useStructure(model as SchemaModels)

  const { loading, data, run } = useRequest(
    (name: keyof typeof services) => {
      return services[name]({ id })
    },
    {
      manual: true
    }
  )

  const { enumsByName = {} } = structure

  const res = data?.data ?? {}

  useEffect(() => {
    if (structure?.interfaces.detail) {
      run(structure.interfaces.detail)
    }
  }, [structure?.interfaces.detail])

  const getDescriptionItemValue = (item: DMMFField, value: any) => {
    if (item.isBoolean) {
      return value ? <Icon name="CheckOutlined" /> : null
    } else if (item.isAvatar) {
      return <Avatar src={value} />
    } else if (item.isDateTime) {
      return isDateTime(value)
        ? dayjs(value).format('YYYY/MM/DD hh:mm:ss')
        : '-'
    } else if (item.isFile) {
      return Array.isArray(value) ? (
        value.map((i, ix) => {
          const name = (i.match(/\/([\w-.]+)$/) as string)[1]
          return name ? (
            <Fragment key={name + ix}>
              <a
                href={i.replace('http:', '').replace('https:', '')}
                download={name}
              >
                {name}
              </a>
              <br />
            </Fragment>
          ) : null
        })
      ) : value ? (
        <a
          href={value.replace('http:', '').replace('https:', '')}
          download={(value.match(/\/([\w-.]+)$/) as string)[1]}
        >
          {(value.match(/\/([\w-.]+)$/) as string)[1].slice(-10)}
        </a>
      ) : null
    } else if (item.isImage) {
      return <KLImage items={value} width={48} />
    } else if (
      isPlainObject(value) &&
      modelNames.includes(item.type as SchemaModels)
    ) {
      const relationModelUniqueName =
        modelsByName[item.type as SchemaModels]?.inputUniqueFields?.[0]
      return value[relationModelUniqueName as string] || value.id
    } else if (item.isJson && value && typeof value === 'object') {
      return (
        <JsonView
          src={value}
          // theme="rjv-default"
          // enableClipboard={false}
          // displayDataTypes={false}
          // displayObjectSize={false}
          style={{ maxHeight: 150, overflow: 'auto' }}
        />
      )
    } else if (item.isJson) {
      return Array.isArray(value) && typeof value[0] !== 'object'
        ? value.join(', ')
        : isPlainObject(value)
        ? Object.entries(value).map(([k, v], ix) => (
            <Fragment key={k}>
              {`${k} :${v}`}
              <br />
            </Fragment>
          ))
        : Array.isArray(value)
        ? JSON.stringify(value, null, 2)
        : value
    } else if (
      item.isList &&
      // 关系字段
      modelNames.includes(item.type as SchemaModels)
    ) {
      const relationModelUniqueName =
        modelsByName[item.type as SchemaModels]?.inputUniqueFields?.[0]
      return (
        value
          // @ts-ignore
          .map(i => {
            const row = relationModelUniqueName
              ? i[relationModelUniqueName]
              : i.id
            return (
              <Fragment key={row}>
                {row}
                <br />
              </Fragment>
            )
          })
      )
    } else if (item.isColor && isColor(value)) {
      return (
        <span className="h-4 p-1 w-8" style={{ background: value }}>
          {value.toUpperCase()}
        </span>
      )
    } else if (item.isEnum) {
      return enumsByName[item.type as EnumNames]!.labelsByValue[value]
    } else if (isRichText(value) || item.isRichText || item.isTextArea) {
      return <KLFullScreen content={value} />
    } else if (item.isPrimitiveList) {
      return Array.isArray(value) ? value.join(', ') : null
    } else {
      return value
    }
  }

  const descItems = useMemo(() => {
    const items: ReactNode[] = []
    structure.fieldsName.forEach(name => {
      const item = structure.fieldsByName[name]
      if (
        (item.name in res ?? {}) &&
        !item.isHidden &&
        !item.isNested &&
        !item.isDeletedAt &&
        !item.isCreateOrUpdateFormHidden
      ) {
        items.push(
          <Descriptions.Item
            key={item.name}
            span={item.isList ? 3 : 1}
            label={item.title || item.name}
            // className={classnames(isRichText(res[name]) && 'richtext !p-0')}
            className={classnames(
              (item.isRichText || item.isTextArea) && 'richtext !p-0'
            )}
          >
            {getDescriptionItemValue(item, res[name])}
          </Descriptions.Item>
        )
      }
    })
    return items
  }, [structure.fieldsName, data, res, handle.active])

  return (
    <div>
      <Descriptions
        bordered
        column={3}
        size="small"
        title={`${structure.tag}详情`}
      >
        {descItems}
      </Descriptions>
    </div>
  )
}

export default KLDescriptionFactory
