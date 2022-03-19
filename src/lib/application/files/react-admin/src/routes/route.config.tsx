import type { RouteConfigChildren, RouteConfigs } from '@/types'

const routes: RouteConfigs = [
  {
    path: '/',
    exact: true,
    name: '首页',
    icon: 'HomeOutlined',
    component: 'home/index'
  },
  {
    path: '/login',
    exact: true,
    layout: 'none',
    component: 'auth/login'
  },
  {
    path: '/admins',
    name: '用户管理',
    exact: true,
    icon: 'UsergroupAddOutlined',
    config: {
      template: 'Table',
      model: 'AdminModel'
    },
    children: [
      {
        path: '/admins',
        name: '用户管理',
        exact: true,
        icon: 'UsergroupAddOutlined',
        config: {
          template: 'Table',
          model: 'AdminModel'
        }
      },
      {
        path: '/roles',
        name: '角色管理',
        exact: true,
        icon: 'GroupOutlined',
        config: {
          template: 'Table',
          model: 'RoleModel'
        }
      },
      {
        path: '/permissions',
        name: '权限管理',
        exact: true,
        icon: 'SecurityScanOutlined',
        config: {
          template: 'Table',
          model: 'PermissionModel'
        }
      }
    ]
  },
  // {
  //   path: '/forms',
  //   name: '表单工厂',
  //   exact: true,
  //   icon: 'AppleOutlined',
  //   component: 'formily/index'
  // },
  {
    path: '/component-example',
    exact: true,
    name: '组件案例',
    icon: 'AppstoreAddOutlined',
    component: 'comExample/index',
    hidden: true
  },
  {
    path: '/:id/details',
    config: {
      template: 'Description'
    }
  },
  // {
  //   path: '/base-conf',
  //   name: '基础配置',
  //   exact: true,
  //   icon: 'AppstoreAddOutlined',
  //   component: 'base-conf/index'
  // },
  {
    path: '/logs',
    name: '操作日志',
    exact: true,
    icon: 'BugOutlined',
    config: {
      template: 'Table',
      model: 'RequestLogModel'
    }
  },
  // {
  //   path: '/monitor',
  //   name: '系统监控',
  //   exact: true,
  //   icon: 'MonitorOutlined',
  //   component: 'requestLog/index'
  // },
  {
    path: '/icons',
    name: '图标管理',
    exact: true,
    hidden: true,
    icon: 'FontSizeOutlined',
    component: 'icon-management/index'
  },
  // {
  //   path: '/online',
  //   name: '表单开发',
  //   exact: true,
  //   hidden: true,
  //   icon: 'BugOutlined',
  //   component: 'online/index'
  // {
  //   path: '/ahooks',
  //   exact: true,
  //   hidden: true,
  //   component: 'ahooks/useBoolean'
  // },
  // {
  //   path: '/react-use',
  //   exact: true,
  //   hidden: true,
  //   component: 'react-use/Side-effects/useError'
  // },
  {
    path: '*',
    component: 'notfound/index'
  }
]

export function getRoutesArray(array: RouteConfigChildren) {
  return array.reduce((acc, cur) => {
    if (cur.children) {
      acc.push(...getRoutesArray(cur.children).flat())
    }
    if (cur.name && cur.path) {
      acc.push({ path: cur.path, name: cur.name })
    }
    return acc
  }, [] as { path: string; name: string }[])
}

export function getRoutesMap(array: RouteConfigs) {
  return getRoutesArray(array).reduce((acc, cur) => {
    acc[cur.path] = cur.name
    return acc
  }, {} as Record<string, string>)
}

export default routes
