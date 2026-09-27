import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'

import type {
  ProductUpdateRequest,
  TradingUpsertRequest
} from '../model/product-trading.types'
import { productTradingApi } from './product-trading.api'
import { productTradingKeys } from './product-trading.query-keys'

function useInvalidateProductTrading() {
  const queryClient = useQueryClient()

  return async () => {
    // 教學模板優先採用簡單、可預測的 Feature-level invalidation。
    // 若未來資料量很大，再依實際效能證據縮小 invalidation 範圍。
    await queryClient.invalidateQueries({
      queryKey: productTradingKeys.all
    })
  }
}

export function useUpdateProduct() {
  const invalidate = useInvalidateProductTrading()

  return useMutation({
    mutationFn: ({
      prodId,
      request
    }: {
      prodId: number
      request: ProductUpdateRequest
    }) => productTradingApi.updateProduct(prodId, request),
    onSuccess: invalidate
  })
}

export function useCreateTrade() {
  const invalidate = useInvalidateProductTrading()

  return useMutation({
    mutationFn: ({
      prodId,
      request
    }: {
      prodId: number
      request: TradingUpsertRequest
    }) => productTradingApi.createTrade(prodId, request),
    onSuccess: invalidate
  })
}

export function useUpdateTrade() {
  const invalidate = useInvalidateProductTrading()

  return useMutation({
    mutationFn: ({
      prodId,
      tradingId,
      request
    }: {
      prodId: number
      tradingId: number
      request: TradingUpsertRequest
    }) => productTradingApi.updateTrade(prodId, tradingId, request),
    onSuccess: invalidate
  })
}

export function useDeleteTrade() {
  const invalidate = useInvalidateProductTrading()

  return useMutation({
    mutationFn: ({
      prodId,
      tradingId,
      rowVersion
    }: {
      prodId: number
      tradingId: number
      rowVersion: string
    }) => productTradingApi.deleteTrade(prodId, tradingId, rowVersion),
    onSuccess: invalidate
  })
}
