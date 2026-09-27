import {
  createHashRouter,
  Navigate
} from 'react-router-dom'

import { ProductTradingDashboardPage } from '../features/product-trading/dashboard/ProductTradingDashboardPage'
import { ProductTradingPage } from '../features/product-trading/master-detail/ProductTradingPage'
import { AppLayout } from '../shared/layout/AppLayout'

export const router = createHashRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/master-detail" replace />
      },
      {
        path: 'master-detail',
        element: <ProductTradingPage />
      },
      {
        path: 'dashboard',
        element: <ProductTradingDashboardPage />
      }
    ]
  }
])
