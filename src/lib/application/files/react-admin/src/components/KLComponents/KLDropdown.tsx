import { Dropdown, Menu } from 'antd'
import type { FC } from 'react'
import type { MenuProps } from '@/types'
import Icon from '../Icon'

type KLDropdownProps = {
  name: string
  onClick: MenuProps['onClick'] // (key: string) => void
  items: { value: string; label: string }[]
}

export const KLDropdown: FC<KLDropdownProps> = ({ name, onClick, items }) => {
  const menus = (
    <Menu onClick={onClick}>
      {items.map(i => {
        return (
          <Menu.Item key={i.value}>
            <span className="cursor-pointer text-[#357B70]">{i.label}</span>
          </Menu.Item>
        )
      })}
    </Menu>
  )
  return (
    <Dropdown overlay={menus}>
      {/* <Space size={4}>
        <span className="cursor-pointer text-[#357B70]">{name}</span>
        <Icon
          name="DownOutlined"
          className="cursor-pointer w-1"
          style={{ color: '#357B70' }}
        />
      </Space> */}
      {/* <span className="cursor-pointer text-[#357B70]">{name}</span> */}
      <Icon
        name="KeyOutlined"
        className="cursor-pointer text-[#357B70]"
        style={{ color: '#357B70' }}
      />
    </Dropdown>
  )
}
