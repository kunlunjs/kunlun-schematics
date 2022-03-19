export function mockMenus(): Promise<
  {
    id: number
    name?: string
    path?: string
    icon?: string
    sort?: number
    exact?: boolean
    hidden?: boolean
    config?: Record<string, any>
    createdAt: string
    children?: any
  }[]
> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: '菜单1',
          path: '/path1',
          icon: 'PlayCircleOutlined',
          sort: 0,
          exact: true,
          hidden: false,
          config: {},
          createdAt: '2021-11-08',
          children: []
        }
      ])
    }, 300)
  })
}
