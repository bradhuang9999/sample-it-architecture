export type ProductStatus = 'ACTIVE' | 'INACTIVE'
export type TradeType = 'BUY' | 'SELL'

export interface ProductSummary {
  prodId: number
  prodCode: string
  prodName: string
  prodStatus: ProductStatus
}

export interface Product {
  prodId: number
  prodCode: string
  prodName: string
  prodCategory: string
  prodStatus: ProductStatus
  currencyCode: string
  listPrice: number
  effectiveDate: string
  ownerDeptCode: string
  remark: string | null
  rowVersion: string
}

export interface ProductUpdateRequest {
  prodCode: string
  prodName: string
  prodCategory: string
  prodStatus: ProductStatus
  currencyCode: string
  listPrice: number
  effectiveDate: string
  ownerDeptCode: string
  remark: string | null
  rowVersion: string
}

export interface Trading {
  tradingId: number
  prodId: number
  tradeDate: string
  tradeType: TradeType
  counterparty: string
  quantity: number
  unitPrice: number
  tradeAmount: number
  marketCode: string | null
  remark: string | null
  rowVersion: string
}

export interface TradingUpsertRequest {
  tradeDate: string
  tradeType: TradeType
  counterparty: string
  quantity: number
  unitPrice: number
  marketCode: string | null
  remark: string | null
  rowVersion?: string | null
}

export interface DashboardSummary {
  productCount: number
  tradingCount: number
  totalTradingAmount: number
  currencyCode: string
}

export interface ProductTradingAggregate {
  prodId: number
  prodCode: string
  prodName: string
  tradingCount: number
  tradingAmount: number
}

export interface MonthlyTrading {
  month: string
  tradingCount: number
  tradingAmount: number
}
