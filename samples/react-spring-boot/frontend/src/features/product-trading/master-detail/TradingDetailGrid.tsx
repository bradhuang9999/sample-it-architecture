import type { Trading } from '../model/product-trading.types'

interface TradingDetailGridProps {
  trades: Trading[]
  onAdd: () => void
  onEdit: (trade: Trading) => void
  onRemove: (trade: Trading) => void
}

const numberFormatter = new Intl.NumberFormat('zh-TW', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

export function TradingDetailGrid({
  trades,
  onAdd,
  onEdit,
  onRemove
}: TradingDetailGridProps) {
  return (
    <section className="card app-card" data-testid="trading-detail-grid">
      <div className="card-header d-flex align-items-center justify-content-between gap-3">
        <div>
          <div className="section-title">Trading Detail</div>
          <div className="small text-secondary">
            SAMPLE_TRADING · {trades.length} 筆
          </div>
        </div>

        <button
          className="btn btn-outline-primary btn-sm"
          type="button"
          onClick={onAdd}
        >
          新增 Trading
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th>Trade Date</th>
              <th>Type</th>
              <th>Counterparty</th>
              <th className="text-end">Quantity</th>
              <th className="text-end">Unit Price</th>
              <th className="text-end">Trade Amount</th>
              <th>Market</th>
              <th className="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {trades.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center text-secondary py-4">
                  目前沒有 Trading Detail。
                </td>
              </tr>
            ) : trades.map(trade => (
              <tr key={trade.tradingId}>
                <td>{trade.tradeDate}</td>
                <td>
                  <span
                    className={`badge ${
                      trade.tradeType === 'BUY'
                        ? 'text-bg-success'
                        : 'text-bg-secondary'
                    }`}
                  >
                    {trade.tradeType}
                  </span>
                </td>
                <td>
                  <div>{trade.counterparty}</div>
                  {trade.remark && (
                    <div className="small text-secondary text-truncate app-remark">
                      {trade.remark}
                    </div>
                  )}
                </td>
                <td className="text-end font-monospace">
                  {numberFormatter.format(trade.quantity)}
                </td>
                <td className="text-end font-monospace">
                  {numberFormatter.format(trade.unitPrice)}
                </td>
                <td className="text-end font-monospace fw-semibold">
                  {numberFormatter.format(trade.tradeAmount)}
                </td>
                <td>{trade.marketCode || '—'}</td>
                <td className="text-end text-nowrap">
                  <button
                    className="btn btn-link btn-sm text-decoration-none"
                    type="button"
                    onClick={() => onEdit(trade)}
                  >
                    編輯
                  </button>
                  <button
                    className="btn btn-link btn-sm text-danger text-decoration-none"
                    type="button"
                    onClick={() => onRemove(trade)}
                  >
                    刪除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
