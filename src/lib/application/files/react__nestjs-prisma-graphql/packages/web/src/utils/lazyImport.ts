import type { ComponentType } from 'react'
import { lazy } from 'react'

/**
 * named imports for React.lazy
 * @see https://github.com/facebook/react/issues/14603#issuecomment-726551598
 * @example
 *   const { Home } = lazyImport(() => import('./Home'), 'Home')
 */
export function lazyImport<
  T extends ComponentType<any>,
  I extends { [K2 in K]: T },
  K extends keyof I
>(factory: () => Promise<I>, name: K): I {
  return Object.create({
    [name]: lazy(() => factory().then(module => ({ default: module[name] })))
  })
}
