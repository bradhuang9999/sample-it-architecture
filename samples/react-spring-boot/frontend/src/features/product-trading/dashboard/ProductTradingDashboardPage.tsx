import {
  useEffect,
  useState
} from 'react'

import { toErrorMessage } from '../../../shared/api/to-error-message'
import { ErrorAlert } from '../../../shared/ui/ErrorAlert'
import { LoadingPanel } from '../../../shared/ui/LoadingPanel'
import {
  useDashboardSummary,
  useDashboardTrades,
  useMonthlyTrading,
  useProductAggregates
} from '../api/product-trading.queries'
import type { ProductTradingAggregate } from '../model/product-trading.types'
import { DashboardSummaryCards } from './DashboardSummaryCards'
import { ProductSummaryChart } from './ProductSummaryChart'
import { TradingDrilldownChart } from './TradingDrilldownChart'
import { TradingDrilldownGrid } from './TradingDrilldownGrid'

export function ProductTradingDashboardPage() {
  const summaryQuery = useDashboardSummary()
  const productAggregatesQuery = useProductAggregates()
  const [requestedProdId, setSelectedProdId] = useState<number | null>(null)

  useEffect(() => {
    document.title = 'Dashboard | WUT1 Template'
  }, [])

  const aggregates = productAggregatesQuery.data ?? []
  const selectedProduct: ProductTradingAggregate | null =
    aggregates.find(item => item.prodId === requestedProdId) ??
    aggregates[0] ?? null
  const selectedProdId = selectedProduct?.prodId ?? null

  const monthlyQuery = useMonthlyTrading(selectedProdId)
  const tradingQuery = useDashboardTrades(selectedProdId)

  const pageError =
    summaryQuery.error ??
    productAggregatesQuery.error ??
    monthlyQuery.error ??
    tradingQuery.error

  const loading =
    summaryQuery.isPending ||
    productAggregatesQuery.isPending

  const drilldownLoading =
    selectedProdId !== null &&
    (monthlyQuery.isPending || tradingQuery.isPending)

  async function refreshDashboard(): Promise<void> {
    await Promise.all([
      summaryQuery.refetch(),
      productAggregatesQuery.refetch()
    ])
  }

  return (
    <div>
      <div className="page-heading mb-4">
        <div>
          <h1 className="h3 mb-1">Product Trading Dashboard</h1>
          <p className="text-secondary mb-0">
            示範 KPI、ECharts 與 Drill-down。點擊 Product 長條後，下方 Chart 與 Grid 由同一份 Selection State 驅動。
          </p>
        </div>
      </div>

      {pageError && <ErrorAlert message={toErrorMessage(pageError)} />}

      {loading ? (
        <LoadingPanel />
      ) : (
        <>
          {summaryQuery.data && (
            <DashboardSummaryCards summary={summaryQuery.data} />
          )}

          <section className="card app-card mb-4">
            <div className="card-body">
              <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3">
                <div>
                  <h2 className="h5 mb-1">Trading Amount by Product</h2>
                  <p className="text-secondary small mb-0">
                    點擊任一長條執行 Drill-down。
                  </p>
                </div>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  type="button"
                  onClick={() => void refreshDashboard()}
                >
                  重新整理
                </button>
              </div>

              {(productAggregatesQuery.data ?? []).length > 0 ? (
                <ProductSummaryChart
                  items={productAggregatesQuery.data ?? []}
                  onSelect={(item) => setSelectedProdId(item.prodId)}
                />
              ) : (
                <div className="text-secondary py-5 text-center">
                  目前沒有 Dashboard 資料。
                </div>
              )}
            </div>
          </section>

          {selectedProduct && (
            <section
              className="card app-card"
              data-testid="dashboard-drilldown"
            >
              <div className="card-body">
                <div className="mb-3">
                  <span className="badge text-bg-secondary me-2">
                    Drill-down
                  </span>
                  <strong>
                    {selectedProduct.prodCode} · {selectedProduct.prodName}
                  </strong>
                </div>

                {drilldownLoading ? (
                  <LoadingPanel />
                ) : (
                  <div className="row g-4">
                    <div className="col-12 col-xl-7">
                      <h3 className="h6">每月 Trading Amount</h3>
                      <TradingDrilldownChart
                        items={monthlyQuery.data ?? []}
                      />
                    </div>
                    <div className="col-12 col-xl-5">
                      <h3 className="h6">Trading Detail</h3>
                      <TradingDrilldownGrid
                        trades={tradingQuery.data ?? []}
                      />
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}
