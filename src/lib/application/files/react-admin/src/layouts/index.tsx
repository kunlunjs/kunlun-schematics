import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Layout, Menu, Space, Tabs } from 'antd'
import classnames from 'classnames'
import type { FC } from 'react'
import { createElement, useCallback, useState, useEffect, useRef } from 'react'
import { useLocation, Link, useHistory } from 'react-router-dom'
import Icon from '@/components/Icon'
import { getRoutesMap } from '@/routes/route.config'
import type { IconNames, RouteConfigs, TabsProps } from '@/types'
import KLSider from './KLSider'
import './index.less'

const { Header, Content, Footer } = Layout

interface KLayoutProps {
  routes: RouteConfigs
}

const KLayout: FC<KLayoutProps> = ({ routes, children }) => {
  const history = useHistory()
  const { pathname } = useLocation()
  const routesMap = useRef<Record<string, string>>()

  if (pathname !== '/login' && !localStorage.getItem('token')) {
    // 跳转登录页
    window.location.href = '/login'
  }
  const [collapsed, setCollapsed] = useState(false)
  const [tabs, setTabs] = useState<{ path: string; name: string }[]>([])
  const [activeTab, setActiveTab] = useState(tabs[0]?.path)

  useEffect(() => {
    const map = getRoutesMap(routes)
    routesMap.current = map
  }, [routes])

  useEffect(() => {
    if (pathname !== activeTab) {
      setActiveTab(pathname)
    }
  }, [pathname])

  if (tabs.every(i => i.path !== pathname) && routesMap.current) {
    setTabs(
      tabs.concat([
        {
          path: pathname,
          name: routesMap.current[pathname]
        }
      ])
    )
    setActiveTab(pathname)
  }

  const headerIcons: {
    icon: IconNames | string
    title: string
    onClick(): void
  }[] = [
    // {
    //   title: '网站设置',
    //   icon: 'SettingFilled',
    //   onClick() {}
    // },
    // {
    //   title: '应用系统信息',
    //   icon: 'InfoCircleFilled',
    //   onClick() {}
    // },
    // {
    //   title: '插件',
    //   icon: 'AppstoreFilled',
    //   onClick() {}
    // },
    // {
    //   title: '固定侧边栏',
    //   icon: 'LockFilled',
    //   onClick() {}
    // },
    // {
    //   title: '全屏',
    //   icon: 'FullscreenOutlined',
    //   onClick() {}
    // },
    // {
    //   title: '刷新',
    //   icon: 'ReloadOutlined',
    //   onClick() {}
    // },
    // {
    //   title: 'GitHub',
    //   icon: 'GithubOutlined',
    //   onClick() {}
    // },
    // {
    //   title: 'Issue',
    //   icon: 'QuestionCircleOutlined',
    //   onClick() {}
    // },
    {
      title: 'admin',
      icon: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      onClick() {}
    }
  ]

  const handleTabEdit: TabsProps['onEdit'] = (targetKey, action) => {
    if (typeof targetKey === 'string' && action === 'remove') {
      // 如果删除的是当前活动 Tab，则将活动的替换为前一个或后一个 Tab
      if (activeTab === targetKey) {
        const index = tabs.findIndex(i => i.path === targetKey)
        // 历史 Tab 多于 1 个
        if (index > 0 || tabs.length > 1) {
          history.push(tabs[index > 0 ? index - 1 : index + 1].path)
        }
        // 删除最后一个历史 Tab
        if (index === 0 && tabs.length === 1) {
          history.push('/')
        }
      }
      setTabs(tabs.filter(i => i.path !== targetKey))
    }
  }

  const handleTabChange = (key: string) => {
    setActiveTab(key)
    history.push(key)
  }

  const renderContent = () => {
    return (
      <Content className="kllayout-content__content" style={current?.style}>
        <div
          className={classnames(layout && 'kllayout-content__content__body')}
        >
          {children}
        </div>
      </Content>
    )
  }

  const renderTabs = () => {
    return (
      <Tabs
        hideAdd
        size="small"
        type="editable-card"
        activeKey={activeTab}
        onEdit={handleTabEdit}
        onChange={handleTabChange}
      >
        {tabs.map(tab => (
          <Tabs.TabPane
            tab={
              <Link to={tab.path} className="pcl">
                {tab.name}
              </Link>
            }
            key={tab.path}
          >
            {renderContent()}
          </Tabs.TabPane>
        ))}
      </Tabs>
    )
  }

  const menu = (
    <Menu>
      {/* <Menu.Item key="reset">
        <a onClick={() => {
          history.push('/reset-pw')
        }}>
          修改密码
        </a>
      </Menu.Item> */}
      <Menu.Item>
        <a
          onClick={() => {
            // 退出
            localStorage.removeItem('token')
            localStorage.removeItem('profile')
            localStorage.removeItem('permissions')
            window.location.href = '/login'
          }}
        >
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  )
  const handleTriggle = useCallback(() => {
    setCollapsed(!collapsed)
  }, [collapsed])

  // '/users/1?id=1' => '/users'
  const first = (
    (pathname.split('?')[0] as string).match(/\/[a-zA-Z\d-_]{0,}/) as any[]
  )[0]
  // name 不为空的
  const validRoutes = routes.filter(i => i.name || i.path)
  const current = validRoutes.find(i => i.path === first)
  const layout = current?.layout !== 'none'

  return (
    <Layout className="kllayout">
      {layout && (
        <KLSider
          current={first}
          routes={validRoutes}
          collapsed={collapsed}
          className="kllayout-sider"
        />
      )}
      <Layout className="kllayout-content">
        {layout && (
          <Header className="kllayout-content__header">
            {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: handleTriggle
            })}
            <div className="mr-8">
              <Space size="large">
                {headerIcons.map(i => {
                  return i.icon.startsWith('http') ? (
                    <Dropdown
                      overlay={menu}
                      key={`${i.title}_dropdown`}
                      overlayClassName="userinfo-dropdown"
                      getPopupContainer={(triggerNode: any) => {
                        return triggerNode?.parentNode
                      }}
                    >
                      <div>
                        <Avatar
                          src={localStorage.getItem('avatar') || i.icon}
                        />
                        <span className="pl-[5px]">
                          {localStorage.getItem('username') || i.title}
                        </span>
                        <Icon name="CaretDownOutlined" className="text-xs" />
                      </div>
                    </Dropdown>
                  ) : (
                    <Icon
                      key={i.title}
                      tooltip={i.title}
                      name={i.icon as IconNames}
                      className="cursor-pointer"
                    />
                  )
                })}
              </Space>
            </div>
          </Header>
        )}
        {/* {layout && tabs.length ? renderTabs() : renderContent()} */}
        {renderContent()}
        {layout && (
          <Footer className="kllayout-content__footer">
            Copyright © 2021 图灵人工智能研究院（南京）有限公司
          </Footer>
        )}
      </Layout>
    </Layout>
  )
}

export default KLayout
