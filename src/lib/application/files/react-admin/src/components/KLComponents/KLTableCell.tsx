import { Avatar, Badge, Switch, Image, Tooltip } from 'antd'
import dayjs from 'dayjs'
import { isNil, isPlainObject } from 'lodash'
import type { CSSProperties, FC } from 'react'
import { Fragment } from 'react'
import JsonView from 'react-json-view'
import { Link } from 'react-router-dom'
import Icon from '@/components/Icon'
import { KLImage } from '@/components/KLComponents/KLImage'
import { getEnumLabel, useEndPoints } from '@/hooks/useEndpoints'
import type { DMMFField, EnumNames, IconNames, SchemaModels } from '@/types'
import type { ApprovalStatus } from '@/utils'
import { isColor, isDateTime, isImageUrl, isUrl } from '@/utils'
import { BadgeColor, isApprovalStatus } from '@/utils'

const jsonViewStyle: CSSProperties = {
  maxHeight: 100,
  textAlign: 'left',
  overflow: 'auto',
  fontSize: 12
}
interface KLTableCellProps {
  field: DMMFField
  ix: number
  value: any
  record: any
  model: SchemaModels
  onClick: (...args: any[]) => void
}

export const KLTableCell: FC<KLTableCellProps> = ({
  model,
  field,
  ix,
  value,
  record,
  onClick
}) => {
  const { pathname } = window.location
  const isRolesPage = pathname.startsWith('/roles')
  const isAdminsPage = pathname.startsWith('/admins')
  const isApprover = localStorage.getItem('role.name') === 'approver'
  const { enumsByName } = useEndPoints()
  const val = field.isEnum ? getEnumLabel(field.type, value) : value
  const { isSystemPreset } = record
  if (typeof val === 'number') {
    return val
  }
  if (Array.isArray(val) && !val.length) {
    return null
  }
  if (
    (Array.isArray(val) && !val.length) ||
    isNil(val) ||
    val === '' ||
    (typeof val === 'object' && !Array.isArray(val) && !Object.keys(val).length)
  ) {
    return null
  }
  // 1:1 or n:1 foreign key
  if (
    val &&
    !field.isList &&
    field.showFieldName &&
    field.isRelationField &&
    !field.asPrimaryKeyOfForeignKey
  ) {
    // TODO
    return val[field.showFieldName]
  }
  if (isImageUrl(val)) {
    return <Image width={32} src={val} />
  }
  if (isColor(val)) {
    return (
      <span className="h-4 p-1 w-8" style={{ background: val }}>
        {val.toUpperCase()}
      </span>
    )
  }
  let editable = !field.isReadOnly
  if ((isAdminsPage || isRolesPage) && !isApprover) {
    editable = false
  }
  if (!isSystemPreset && editable && typeof val === 'boolean') {
    if (isApprover) {
      return (
        <Switch
          size="small"
          checked={val}
          onChange={checked => {
            onClick(record.id, field.name, checked)
          }}
        />
      )
    } else {
      return val ? <Icon name="CheckOutlined" /> : null
    }
  }
  const isEnumField = field.isEnum && enumsByName[field.type as EnumNames]
  if (
    !isSystemPreset &&
    editable &&
    isEnumField &&
    isEnumField?.options?.length === 2
  ) {
    const isStringArray = typeof isEnumField.options[0] === 'string'
    const labels = isStringArray
      ? isEnumField.options
      : // @ts-ignore
        isEnumField.options.map(i => i.label)
    const values = isStringArray
      ? isEnumField.options
      : // @ts-ignore
        isEnumField.options.map(i => i.value)
    return (
      <Switch
        size="small"
        checked={val === labels[0]}
        checkedChildren={labels[0]}
        unCheckedChildren={labels[1]}
        onChange={checked => {
          onClick(record.id, field.name, checked ? values[0] : values[1])
        }}
      />
    )
  }
  if (typeof val === 'boolean') {
    return val ? <Icon name="CheckOutlined" /> : null
  }
  if (field.isAvatar && isUrl(val)) {
    return <Avatar alt="头像" size="small" src={val} />
  }
  if (field.isJson && val && typeof val === 'object') {
    return (
      <JsonView
        src={value}
        collapsed
        // theme="rjv-default"
        enableClipboard={false}
        displayDataTypes={false}
        displayObjectSize={false}
        style={jsonViewStyle}
      />
    )
  }
  // if (field.isJson && typeof val === 'object') {
  //   return (
  //     <Input.TextArea
  //       bordered={false}
  //       autoSize={{ maxRows: 2 }}
  //       value={JSON.stringify(val, null, 4)}
  //     />
  //   )
  // }
  if (field.isDateTime && isDateTime(val)) {
    return dayjs(val).format('YYYY/MM/DD HH:mm')
  }
  if (field.isIcon && typeof val === 'string' && !val.startsWith('http')) {
    // icons[val as AllIconKeys] ? <Icon name={val} /> : val
    return <Icon name={val as IconNames} />
  }
  if (field.isFile) {
    return Array.isArray(val) ? (
      val.map((i, ix) => {
        const name = (
          decodeURIComponent(i).match(/\/([^/]+)$/) as unknown as string
        )[1] // i.match(/\/([\w-.\u4e00-\u9fa5]+)$/) as string
        return name ? (
          <Fragment key={name + ix}>
            <a
              href={i.replace('http:', '').replace('https:', '')}
              download={name}
            >
              {`...${name.slice(-18)}`}
            </a>
            <br />
          </Fragment>
        ) : null
      })
    ) : val ? (
      <a
        href={val.replace('http:', '').replace('https:', '')}
        download={(val.match(/\/([\w-.]+)$/) as string)[1]}
      >
        {`...${(val.match(/\/([\w-.]+)$/) as string)[1].slice(-18)}`}
      </a>
    ) : null
  }
  if (field.isImage) {
    return <KLImage items={val} />
  }
  if (isApprovalStatus(val)) {
    return <Badge color={BadgeColor[val as ApprovalStatus]} text={val} />
  }
  if (field.isRichText) {
    return (
      <Link to={`${pathname}/details?id=${record.id}&model=${model}`}>
        <Icon name="FileWordOutlined" className="cursor-pointer" />
      </Link>
    )
  }
  if (field.isRichText && typeof val === 'string' && !val.startsWith('<')) {
    return val.length > 18 ? (
      <Tooltip title={val}>{`${val.slice(0, 18)}...`}</Tooltip>
    ) : (
      val
    )
  }
  if (Array.isArray(val) && val.length) {
    return val.map((j, jx) => (
      <Fragment key={jx}>
        <span>{j}</span>
        {jx < val.length - 1 && <br />}
      </Fragment>
    ))
  }
  if (typeof val === 'string') {
    return val.length > 18 ? (
      <Tooltip title={val}>{`${val.slice(0, 18)}...`}</Tooltip>
    ) : (
      val
    )
  }
  return (isPlainObject(val) && !val['$$typeof']) || Array.isArray(val) ? (
    JSON.stringify(val, null, 2)
  ) : typeof val === 'string' ? (
    <div key={ix} className={field.isJson ? '' : 'text-center'}>
      {val}
    </div>
  ) : null
}
