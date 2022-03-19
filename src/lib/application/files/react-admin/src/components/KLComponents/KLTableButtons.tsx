import { Button, Dropdown, Space, Tooltip, Menu } from 'antd'
import classnames from 'classnames'
import { pick } from 'lodash'
import type { FC, ReactNode } from 'react'
import { Fragment } from 'react'
import type { IKLTableButtons } from '@/types'
import { noop } from '@/utils'
import Icon from '../Icon'

interface KLTableButtonsProps {
  buttons: IKLTableButtons
}

export const KLTableButtons: FC<KLTableButtonsProps> = ({ buttons }) => {
  const renderItems = () => {
    const normals: ReactNode[] = []
    const systems: ReactNode[] = []
    buttons.forEach((i, ix) => {
      let item = i
      if (i.name && !i.tooltip) {
        const _ICon = i.icon ? <Icon name={i.icon} /> : null
        i.onClick = i.onClick || noop
        item = (
          <Button
            danger={/删除|移除/.test(i.name)}
            key={i.name}
            icon={_ICon}
            onClick={i.onClick}
            {...pick(i, ['type', 'style', 'className'])}
          >
            {i.name}
          </Button>
        )
      } else if (i.tooltip && i.icon) {
        item = (
          <Tooltip key={i.icon} title={i.tooltip}>
            <Icon
              {...(i.menus
                ? {}
                : {
                    onClick: i.onClick
                  })}
              name={i.icon}
              style={i.style}
              className={classnames('cursor-pointer', i.className)}
            />
          </Tooltip>
        )
        if (i.menus) {
          item = (
            <Dropdown
              key={i.icon}
              placement="bottomCenter"
              overlay={
                <Menu
                  onClick={i.onClick}
                  selectedKeys={i.activeKey ? [i.activeKey] : []}
                >
                  {i.menus.map(i => (
                    <Menu.Item key={i.value}>{i.label}</Menu.Item>
                  ))}
                </Menu>
              }
            >
              {item}
            </Dropdown>
          )
        }
      }
      if (!i.range) {
        normals.push(item)
      } else if (i.range) {
        systems.push(item)
      }
    })
    return [
      <Space key="normals" size="large">
        {normals}
      </Space>,
      <Space key="systems" size="large">
        {systems}
      </Space>
    ]
  }
  return <Fragment>{renderItems()}</Fragment>
}
