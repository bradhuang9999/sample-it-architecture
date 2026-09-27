import { useQuery } from '@tanstack/react-query'

import { productTradingApi } from './product-trading.api'
import { productTradingKeys } from './product-trading.query-keys'

export function useProducts() {
  return useQuery({
    queryKey: productTradingKeys.products(),
    queryFn: productTradingApi.getProducts
  })
}

export function useProduct(prodId: number | null) {
  return useQuery({
    queryKey: prodId === null
      ? [...productTradingKeys.products(), 'none']
      : productTradingKeys.product(prodId),
    queryFn: () => productTradingApi.getProduct(prodId as number),
    enabled: prodId !== null
  })
}

export function useTrades(prodId: number | null) {
  return useQuery({
    queryKey: prodId === null
      ? [...productTradingKeys.products(), 'none', 'trades']
      : productTradingKeys.trades(prodId),
    queryFn: () => productTradingApi.getTrades(prodId as number),
    enabled: prodId !== null
  })
}

export function useDashboardSummary() {
  return useQuery({
    queryKey: productTradingKeys.dashboardSummary(),
    queryFn: productTradingApi.getDashboardSummary
  })
}

export function useProductAggregates() {
  return useQuery({
    queryKey: productTradingKeys.dashboardProducts(),
    queryFn: productTradingApi.getProductAggregates
  })
}

export function useMonthlyTrading(prodId: number | null) {
  return useQuery({
    queryKey: prodId === null
      ? [...productTradingKeys.dashboardProducts(), 'none', 'monthly']
      : productTradingKeys.monthly(prodId),
    queryFn: () => productTradingApi.getMonthly(prodId as number),
    enabled: prodId !== null
  })
}

export function useDashboardTrades(prodId: number | null) {
  return useQuery({
    queryKey: prodId === null
      ? [...productTradingKeys.dashboardProducts(), 'none', 'trades']
      : productTradingKeys.dashboardTrades(prodId),
    queryFn: () => productTradingApi.getDashboardTrades(prodId as number),
    enabled: prodId !== null
  })
}
