import loadable from '@loadable/component'
import type { ReactNode } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import type { RouteConfigChildren } from '@/types'

function getRoutes(config: RouteConfigChildren): ReactNode[] {
  return config
    .map(route => {
      const array = []
      const { children, ...rest } = route
      if (children && !rest.ignore) {
        array.push(...getRoutes(children).flat())
      }
      // TODO
      if (rest.path && (rest.component || route.config) && !rest.ignore) {
        array.push(
          <Route
            key={rest.path}
            path={rest.path}
            render={(props: Record<string, any>) => {
              const { template } = route?.config || {}
              if (template) {
                const factory = `KLRenderFactory/KL${template}Factory.tsx`
                const Comp = loadable(
                  () => import(/* @vite-ignore */ `../components/${factory}`)
                )
                return <Comp {...props} {...route.config} />
              }
              route.component = !route.component?.endsWith('.tsx')
                ? `${route.component}.tsx`
                : route.component
              /* webpackChunkName: "[request][index]" */
              const Comp = loadable(
                () => import(/* @vite-ignore */ `../pages/${rest.component}`)
              )
              return <Comp {...props} />
            }}
          />
        )
      }
      return array
    })
    .flat()
    .filter(Boolean)
}

interface RoutesProps {
  data: RouteConfigChildren
}

const _Routes = ({ data }: RoutesProps) => {
  return (
    <BrowserRouter>
      <Routes>{getRoutes(data)}</Routes>
    </BrowserRouter>
  )
}

export default _Routes
