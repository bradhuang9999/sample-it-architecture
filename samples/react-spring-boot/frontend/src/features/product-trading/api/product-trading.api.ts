import { apiRequest } from '../../../shared/api/api-client'
import type {
  DashboardSummary,
  MonthlyTrading,
  Product,
  ProductSummary,
  ProductTradingAggregate,
  ProductUpdateRequest,
  Trading,
  TradingUpsertRequest
} from '../model/product-trading.types'

export const productTradingApi = {
  getProducts(): Promise<ProductSummary[]> {
    return apiRequest('/api/products')
  },

  getProduct(prodId: number): Promise<Product> {
    return apiRequest(`/api/products/${prodId}`)
  },

  updateProduct(prodId: number, request: ProductUpdateRequest): Promise<Product> {
    return apiRequest(`/api/products/${prodId}`, {
      method: 'PUT',
      body: JSON.stringify(request)
    })
  },

  getTrades(prodId: number): Promise<Trading[]> {
    return apiRequest(`/api/products/${prodId}/trades`)
  },

  createTrade(prodId: number, request: TradingUpsertRequest): Promise<Trading> {
    return apiRequest(`/api/products/${prodId}/trades`, {
      method: 'POST',
      body: JSON.stringify(request)
    })
  },

  updateTrade(
    prodId: number,
    tradingId: number,
    request: TradingUpsertRequest
  ): Promise<Trading> {
    return apiRequest(`/api/products/${prodId}/trades/${tradingId}`, {
      method: 'PUT',
      body: JSON.stringify(request)
    })
  },

  deleteTrade(
    prodId: number,
    tradingId: number,
    rowVersion: string
  ): Promise<void> {
    const params = new URLSearchParams({ rowVersion })
    return apiRequest(`/api/products/${prodId}/trades/${tradingId}?${params}`, {
      method: 'DELETE'
    })
  },

  getDashboardSummary(): Promise<DashboardSummary> {
    return apiRequest('/api/dashboard/summary')
  },

  getProductAggregates(): Promise<ProductTradingAggregate[]> {
    return apiRequest('/api/dashboard/products')
  },

  getMonthly(prodId: number): Promise<MonthlyTrading[]> {
    return apiRequest(`/api/dashboard/products/${prodId}/monthly`)
  },

  getDashboardTrades(prodId: number): Promise<Trading[]> {
    return apiRequest(`/api/dashboard/products/${prodId}/trades`)
  }
}
