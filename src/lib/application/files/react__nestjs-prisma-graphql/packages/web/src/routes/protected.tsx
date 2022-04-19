import { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Spinner } from 'src/components/Elements'
import { MainLayout } from 'src/components/Layout'
import { lazyImport } from 'src/utils/lazyImport'
const { DiscussionsRoutes } = lazyImport(
  () => import('src/features/discussions'),
  'DiscussionsRoutes'
)
const { Dashboard } = lazyImport(() => import('src/features/misc'), 'Dashboard')
const { Profile } = lazyImport(() => import('src/features/users'), 'Profile')
const { Users } = lazyImport(() => import('src/features/users'), 'Users')

const App = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <Spinner size="xl" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  )
}

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [
      { path: '/discussions/*', element: <DiscussionsRoutes /> },
      { path: '/users', element: <Users /> },
      { path: '/profile', element: <Profile /> },
      { path: '/', element: <Dashboard /> },
      { path: '*', element: <Navigate to="." /> }
    ]
  }
]
