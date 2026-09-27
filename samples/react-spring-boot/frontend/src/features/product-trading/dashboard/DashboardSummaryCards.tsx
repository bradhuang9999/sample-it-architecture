import type { DashboardSummary } from '../model/product-trading.types'

interface DashboardSummaryCardsProps {
  summary: DashboardSummary
}

const numberFormatter = new Intl.NumberFormat('zh-TW', {
  maximumFractionDigits: 2
})

export function DashboardSummaryCards({
  summary
}: DashboardSummaryCardsProps) {
  const amountLabel =
    `${summary.currencyCode} ${numberFormatter.format(summary.totalTradingAmount)}`

  return (
    <div className="row g-3 mb-4" data-testid="dashboard-summary">
      <div className="col-md-4">
        <div className="card app-card h-100">
          <div className="card-body">
            <div className="text-secondary small">Product Count</div>
            <div className="display-6 fw-semibold">{summary.productCount}</div>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card app-card h-100">
          <div className="card-body">
            <div className="text-secondary small">Trading Count</div>
            <div className="display-6 fw-semibold">{summary.tradingCount}</div>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card app-card h-100">
          <div className="card-body">
            <div className="text-secondary small">Total Trading Amount</div>
            <div className="h2 fw-semibold mt-2 mb-0">{amountLabel}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
