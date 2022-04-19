import { lazyImport } from 'src/utils/lazyImport'

const { AuthRoutes } = lazyImport(
  () => import('src/features/auth'),
  'AuthRoutes'
)

export const publicRoutes = [
  {
    path: '/auth/*',
    element: <AuthRoutes />
  }
]
