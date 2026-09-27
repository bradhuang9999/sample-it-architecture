import { createRouter, createWebHashHistory } from 'vue-router'

import ProductTradingPage from '../features/product-trading/master-detail/ProductTradingPage.vue'
import ProductTradingDashboardPage from '../features/product-trading/dashboard/ProductTradingDashboardPage.vue'

const router = createRouter({
  // 使用 Hash History，讓 executable JAR 不需要額外維護 SPA fallback route。
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/master-detail'
    },
    {
      path: '/master-detail',
      component: ProductTradingPage,
      meta: {
        title: 'Master / Detail'
      }
    },
    {
      path: '/dashboard',
      component: ProductTradingDashboardPage,
      meta: {
        title: 'Dashboard'
      }
    }
  ]
})

router.afterEach((to) => {
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'WUT1'
  document.title = `${title} | WUT1 Template`
})

export default router
