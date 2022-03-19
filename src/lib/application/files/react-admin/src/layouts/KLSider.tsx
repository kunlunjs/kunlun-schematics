import { Layout, Menu } from 'antd'
import classnames from 'classnames'
import type { FC } from 'react'
import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '@/assets/logo.png'
import Icon from '@/components/Icon'
import type { IconNames, RouteConfigChildren, RouteConfigs } from '@/types'

const { Sider } = Layout
const { SubMenu } = Menu

interface KLSiderProps {
  current?: string
  className?: string
  collapsed: boolean
  routes: RouteConfigs
}

function RenderLink({ route }: { route: RouteConfigChildren[number] }) {
  return (route?.path ?? '').startsWith('http') || route?.target ? (
    <a target={route.target || '_blank'} href={route.path}>
      {route.name}
    </a>
  ) : (
    <Link to={route.path}>{route.name}</Link>
  )
}

function renderMenuItems(data: RouteConfigChildren) {
  return (
    <Fragment>
      {data.map((i, ix) => {
        if (
          i.children &&
          i.hidden !== true &&
          i.children.some(j => j.name && j.hidden !== true)
        ) {
          return (
            <SubMenu
              key={((i.key || i.path || i.name) as string) + ix}
              title={i.name}
              icon={i.icon ? <Icon name={i.icon as IconNames} /> : null}
            >
              {renderMenuItems(i.children)}
            </SubMenu>
          )
        } else if (i.name && i.path && i.hidden !== true) {
          return (
            <Menu.Item
              key={i.path}
              icon={i.icon ? <Icon name={i.icon as IconNames} /> : null}
            >
              <RenderLink route={i} />
            </Menu.Item>
          )
        }
        return null
      })}
    </Fragment>
  )
}

const KLSider: FC<KLSiderProps> = ({
  current,
  routes,
  collapsed,
  className
}) => {
  // const [collapsed, setCollapsed] = useState(false)
  const [menu, setMenu] = useState(current || '/')

  useEffect(() => {
    if (current !== menu) {
      setMenu(current || '')
    }
  }, [current])

  const handleChangeMenu = (e: { key: string }) => {
    setMenu(e.key)
  }

  // const handleCollapse = useCallback(() => {
  //   setCollapsed(!collapsed)
  // }, [collapsed])

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      className={classnames(className)}
      trigger={null} /*onCollapse={handleCollapse}*/
    >
      {/* https://c.runoob.com/more/svgeditor/ */}
      <div className={`mb-8 logo ${collapsed ? '!py-[12px] !px-[2px]' : ''}`}>
        <img src={logo} alt="logo" />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[menu]}
        className="kunlun-sider"
        onClick={handleChangeMenu}
      >
        {renderMenuItems(routes)}
      </Menu>
    </Sider>
  )
}

export default KLSider
