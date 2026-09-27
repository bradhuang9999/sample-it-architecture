import {
  useEffect,
  useState
} from 'react'

import { toErrorMessage } from '../../../shared/api/to-error-message'
import { ErrorAlert } from '../../../shared/ui/ErrorAlert'
import { LoadingPanel } from '../../../shared/ui/LoadingPanel'
import {
  useCreateTrade,
  useDeleteTrade,
  useUpdateProduct,
  useUpdateTrade
} from '../api/product-trading.mutations'
import {
  useProduct,
  useProducts,
  useTrades
} from '../api/product-trading.queries'
import type {
  ProductUpdateRequest,
  Trading,
  TradingUpsertRequest
} from '../model/product-trading.types'
import { ProductMasterForm } from './ProductMasterForm'
import { TradingDetailGrid } from './TradingDetailGrid'
import { TradingEditPanel } from './TradingEditPanel'

export function ProductTradingPage() {
  const productsQuery = useProducts()
  const [requestedProdId, setSelectedProdId] = useState<number | null>(null)
  const [editingTrade, setEditingTrade] =
    useState<Trading | null | undefined>(undefined)
  const [actionError, setActionError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const products = productsQuery.data ?? []
  const selectedProdId =
    products.find(item => item.prodId === requestedProdId)?.prodId ??
    products[0]?.prodId ?? null

  const productQuery = useProduct(selectedProdId)
  const tradesQuery = useTrades(selectedProdId)

  const updateProductMutation = useUpdateProduct()
  const createTradeMutation = useCreateTrade()
  const updateTradeMutation = useUpdateTrade()
  const deleteTradeMutation = useDeleteTrade()

  useEffect(() => {
    document.title = 'Master / Detail | WUT1 Template'
  }, [])

  const queryError =
    productsQuery.error ??
    productQuery.error ??
    tradesQuery.error

  const errorMessage = actionError || (
    queryError ? toErrorMessage(queryError) : ''
  )

  const loading =
    productsQuery.isPending ||
    (
      selectedProdId !== null &&
      (productQuery.isPending || tradesQuery.isPending)
    )

  async function refreshSelected(): Promise<void> {
    setActionError('')
    setSuccessMessage('')
    setEditingTrade(undefined)

    if (selectedProdId === null) {
      await productsQuery.refetch()
      return
    }

    await Promise.all([
      productsQuery.refetch(),
      productQuery.refetch(),
      tradesQuery.refetch()
    ])
  }

  async function saveProduct(request: ProductUpdateRequest): Promise<void> {
    if (selectedProdId === null) {
      return
    }

    setActionError('')
    setSuccessMessage('')

    try {
      await updateProductMutation.mutateAsync({
        prodId: selectedProdId,
        request
      })
      setSuccessMessage('Master 已儲存。')
    }
    catch (error) {
      setActionError(toErrorMessage(error))
    }
  }

  async function saveTrade(request: TradingUpsertRequest): Promise<void> {
    if (selectedProdId === null) {
      return
    }

    setActionError('')
    setSuccessMessage('')

    try {
      if (editingTrade) {
        await updateTradeMutation.mutateAsync({
          prodId: selectedProdId,
          tradingId: editingTrade.tradingId,
          request
        })
      }
      else {
        await createTradeMutation.mutateAsync({
          prodId: selectedProdId,
          request
        })
      }

      setEditingTrade(undefined)
      setSuccessMessage('Trading Detail 已儲存。')
    }
    catch (error) {
      setActionError(toErrorMessage(error))
    }
  }

  async function removeTrade(trade: Trading): Promise<void> {
    if (selectedProdId === null) {
      return
    }

    const confirmed = window.confirm(
      `確定刪除 Trading #${trade.tradingId}？此動作會直接異動資料。`
    )

    if (!confirmed) {
      return
    }

    setActionError('')
    setSuccessMessage('')

    try {
      await deleteTradeMutation.mutateAsync({
        prodId: selectedProdId,
        tradingId: trade.tradingId,
        rowVersion: trade.rowVersion
      })
      setSuccessMessage('Trading Detail 已刪除。')
    }
    catch (error) {
      setActionError(toErrorMessage(error))
    }
  }

  return (
    <div>
      <div className="page-heading mb-4">
        <div>
          <h1 className="h3 mb-1">Product / Trading Master Detail</h1>
          <p className="text-secondary mb-0">
            上層 Form、下層 Grid；示範 React State、TanStack Query 與 Spring Boot API 的基本協作。
          </p>
        </div>
      </div>

      {errorMessage && <ErrorAlert message={errorMessage} />}

      {successMessage && (
        <div
          className="alert alert-success"
          role="status"
          data-testid="success-message"
        >
          {successMessage}
        </div>
      )}

      {loading ? (
        <LoadingPanel />
      ) : (
        <>
          <section className="card app-card mb-4">
            <div className="card-body">
              <div className="row align-items-end g-3">
                <div className="col-md-6 col-lg-4">
                  <label className="form-label" htmlFor="productSelector">
                    選擇 Product
                  </label>
                  <select
                    id="productSelector"
                    value={selectedProdId ?? ''}
                    className="form-select"
                    data-testid="product-selector"
                    onChange={(event) => {
                      const nextProdId = Number(event.target.value)
                      setSelectedProdId(nextProdId)
                      setEditingTrade(undefined)
                      setActionError('')
                      setSuccessMessage('')
                    }}
                  >
                    {(productsQuery.data ?? []).map(item => (
                      <option key={item.prodId} value={item.prodId}>
                        {item.prodCode} · {item.prodName} · {item.prodStatus}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-auto">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => void refreshSelected()}
                  >
                    重新整理
                  </button>
                </div>
              </div>
            </div>
          </section>

          {productQuery.data ? (
            <>
              <ProductMasterForm
                key={`${productQuery.data.prodId}:${productQuery.data.rowVersion}`}
                product={productQuery.data}
                saving={updateProductMutation.isPending}
                onSave={(request) => void saveProduct(request)}
              />

              {editingTrade !== undefined && (
                <TradingEditPanel
                  key={editingTrade ? `${editingTrade.tradingId}:${editingTrade.rowVersion}` : 'new'}
                  trade={editingTrade}
                  saving={
                    createTradeMutation.isPending ||
                    updateTradeMutation.isPending
                  }
                  onSave={(request) => void saveTrade(request)}
                  onCancel={() => setEditingTrade(undefined)}
                />
              )}

              <TradingDetailGrid
                trades={tradesQuery.data ?? []}
                onAdd={() => {
                  setEditingTrade(null)
                  setSuccessMessage('')
                }}
                onEdit={(trade) => {
                  setEditingTrade(trade)
                  setSuccessMessage('')
                }}
                onRemove={(trade) => void removeTrade(trade)}
              />
            </>
          ) : (
            <div className="text-secondary">
              沒有可顯示的 Product。
            </div>
          )}
        </>
      )}
    </div>
  )
}
