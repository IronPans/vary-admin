import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './router'

// https://router.vuejs.org/zh/
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

// 路由跳转前，可以在这里判断权限
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    window.document.title = to.meta.title + ' - Vary Admin'
  }
  const locking = localStorage.getItem('locking')
  const isLogin = localStorage.getItem('user')

  if (to.name !== 'navigation') {
    if (locking === '1' && to.name !== 'lockscreen') {
      next({
        name: 'lockscreen'
      })
    } else if (!isLogin && to.name !== 'login' && to.name !== 'register') {
      next({
        name: 'login'
      })
    } else if (isLogin && (to.name === 'login' || to.name === 'register')) {
      next({
        name: 'home_index'
      })
    } else {
      next()
    }
  } else {
    next()
  }
  // next()
})

// 跳转后
router.afterEach((to) => {
  window.scrollTo(0, 0)
})

export default router
