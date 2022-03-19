import { Divider, message, Popconfirm } from 'antd'
import type { FC, FunctionComponent } from 'react'
import { Fragment } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Icon from '../Icon'

export interface KLTableOperationProps {
  record: Record<string, any>
  items: (
    | {
        title: string
        onClick?: (...args: any[]) => void
        onConfirm?: (...args: any[]) => void
        onConfirmText?: string
      }
    | [string, (...args: any[]) => void]
    | FunctionComponent
  )[]
}

export const KLTableOperation: FC<KLTableOperationProps> = ({
  record,
  items
}) => {
  // const { pathname } = useLocation()

  const len = items.length - 1
  return (
    <Fragment>
      {items.map((i, ix) => {
        if (
          typeof i == 'function'
          // isValidElement(i()) &&
          // typeof i().type === 'string'
        ) {
          const Comp = i
          return (
            <Fragment key={ix}>
              <Comp />
              {ix < len && <Divider type="vertical" />}
            </Fragment>
          )
        }
        if (
          typeof i !== 'function' &&
          !Array.isArray(i) &&
          i.onClick &&
          i.onConfirm
        ) {
          return (
            <Fragment key={i.title}>
              <Popconfirm
                title={i.onConfirmText || '是否确认删除'}
                onConfirm={i.onConfirm}
                okText="确定"
                cancelText="取消"
              >
                {/* <a
                  className="color-red"
                  data-id={record.id}
                  onClick={i.onClick}
                >
                  {i.title}
                </a> */}
                <Icon
                  tooltip={i.title || '删除'}
                  name="DeleteOutlined"
                  className="color-red"
                  onClick={() => i.onClick?.(record.id)}
                />
              </Popconfirm>
              {ix < len && <Divider type="vertical" />}
            </Fragment>
          )
        }
        if (typeof i !== 'function' && !Array.isArray(i) && i.title) {
          return (
            <Fragment key={i.title}>
              <a data-id={record.id} onClick={i.onClick}>
                {i.title}
              </a>
              {ix < len && <Divider type="vertical" />}
            </Fragment>
          )
        }
        if (Array.isArray(i)) {
          if (i[0].match(/复制/)) {
            return (
              <Fragment key={i[0]}>
                <CopyToClipboard
                  text={`${window.location.href}/${record.id}`}
                  onCopy={() => {
                    message.success('复制成功')
                  }}
                >
                  <a data-id={record.id} /* onClick={i[1]} */>{i[0]}</a>
                </CopyToClipboard>
                {ix < len && <Divider type="vertical" />}
              </Fragment>
            )
          }
          return (
            <Fragment key={i[0]}>
              <a data-id={record.id} onClick={i[1]}>
                {i[0]}
              </a>
              {ix < len && <Divider type="vertical" />}
            </Fragment>
          )
        }
        return null
      })}
    </Fragment>
  )
}
