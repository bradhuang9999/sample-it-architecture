import type { Trading } from '../model/product-trading.types'

interface TradingDrilldownGridProps {
  trades: Trading[]
}

const numberFormatter = new Intl.NumberFormat('zh-TW', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

export function TradingDrilldownGrid({
  trades
}: TradingDrilldownGridProps) {
  return (
    <div className="table-responsive" data-testid="dashboard-drilldown-grid">
      <table className="table table-sm table-hover align-middle mb-0">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Counterparty</th>
            <th className="text-end">Quantity</th>
            <th className="text-end">Unit Price</th>
            <th className="text-end">Amount</th>
          </tr>
        </thead>
        <tbody>
          {trades.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center text-secondary py-4">
                沒有 Drill-down 明細。
              </td>
            </tr>
          ) : trades.map(trade => (
            <tr key={trade.tradingId}>
              <td>{trade.tradeDate}</td>
              <td>{trade.tradeType}</td>
              <td>{trade.counterparty}</td>
              <td className="text-end font-monospace">
                {numberFormatter.format(trade.quantity)}
              </td>
              <td className="text-end font-monospace">
                {numberFormatter.format(trade.unitPrice)}
              </td>
              <td className="text-end font-monospace fw-semibold">
                {numberFormatter.format(trade.tradeAmount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
