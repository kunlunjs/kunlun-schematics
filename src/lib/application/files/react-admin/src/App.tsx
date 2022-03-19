import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Layout from '@/layouts'
import Routes from '@/routes'
import initRoutes from '@/routes/route.config'
import Loading from './components/Loading'
// import { services } from './services'
import { useEndPoints } from './hooks/useEndpoints'
import type { RouteConfigs } from './types'
import './styles/index.less'

const App = () => {
  const [routes, setRoutes] = useState<RouteConfigs>(initRoutes)
  const data = useEndPoints()

  if (!data) {
    return null
  }

  return (
    <BrowserRouter>
      <ConfigProvider locale={zhCN}>
        <div>
          {routes.length ? (
            <Layout routes={routes}>
              <Routes data={routes} />
            </Layout>
          ) : (
            <div className="h-screen bg-bg-gray-200 w-full fcc">
              <Loading active />
            </div>
          )}
        </div>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App
