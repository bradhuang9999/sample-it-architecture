export const productTradingKeys = {
  all: ['product-trading'] as const,
  products: () => [...productTradingKeys.all, 'products'] as const,
  product: (prodId: number) =>
    [...productTradingKeys.products(), prodId] as const,
  trades: (prodId: number) =>
    [...productTradingKeys.product(prodId), 'trades'] as const,
  dashboard: () => [...productTradingKeys.all, 'dashboard'] as const,
  dashboardSummary: () =>
    [...productTradingKeys.dashboard(), 'summary'] as const,
  dashboardProducts: () =>
    [...productTradingKeys.dashboard(), 'products'] as const,
  monthly: (prodId: number) =>
    [...productTradingKeys.dashboardProducts(), prodId, 'monthly'] as const,
  dashboardTrades: (prodId: number) =>
    [...productTradingKeys.dashboardProducts(), prodId, 'trades'] as const
}
