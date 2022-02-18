import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

console.debug(routes)

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    document.body.scrollTop = 0
  }
})

export default router
