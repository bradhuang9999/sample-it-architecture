import { useState } from 'react'
import type { FormEvent } from 'react'

import type {
  TradeType,
  Trading,
  TradingUpsertRequest
} from '../model/product-trading.types'

interface TradingEditPanelProps {
  trade: Trading | null
  saving: boolean
  onSave: (request: TradingUpsertRequest) => void
  onCancel: () => void
}

const tradeTypes: TradeType[] = ['BUY', 'SELL']

function createForm(trade: Trading | null): TradingUpsertRequest {
  if (trade) {
    return {
      tradeDate: trade.tradeDate,
      tradeType: trade.tradeType,
      counterparty: trade.counterparty,
      quantity: trade.quantity,
      unitPrice: trade.unitPrice,
      marketCode: trade.marketCode,
      remark: trade.remark,
      rowVersion: trade.rowVersion
    }
  }

  return {
    tradeDate: new Date().toISOString().slice(0, 10),
    tradeType: 'BUY',
    counterparty: '',
    quantity: 1,
    unitPrice: 0,
    marketCode: null,
    remark: null,
    rowVersion: null
  }
}

export function TradingEditPanel({
  trade,
  saving,
  onSave,
  onCancel
}: TradingEditPanelProps) {
  const [form, setForm] = useState<TradingUpsertRequest>(() => createForm(trade))

  function submit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    onSave({
      ...form,
      counterparty: form.counterparty.trim(),
      marketCode: form.marketCode?.trim() || null,
      remark: form.remark?.trim() || null
    })
  }

  return (
    <section className="card border-primary-subtle mb-4" data-testid="trading-edit-panel">
      <div className="card-header bg-primary-subtle d-flex align-items-center justify-content-between">
        <span className="fw-semibold">
          {trade ? `編輯 Trading #${trade.tradingId}` : '新增 Trading'}
        </span>
        <button
          className="btn-close"
          type="button"
          aria-label="關閉"
          onClick={onCancel}
        />
      </div>

      <form className="card-body" onSubmit={submit}>
        <div className="row g-3">
          <div className="col-md-2">
            <label className="form-label" htmlFor="tradeDate">Trade Date</label>
            <input
              id="tradeDate"
              value={form.tradeDate}
              onChange={(event) => setForm(current => ({
                ...current,
                tradeDate: event.target.value
              }))}
              className="form-control"
              type="date"
              required
            />
          </div>

          <div className="col-md-2">
            <label className="form-label" htmlFor="tradeType">Type</label>
            <select
              id="tradeType"
              value={form.tradeType}
              onChange={(event) => setForm(current => ({
                ...current,
                tradeType: event.target.value as TradeType
              }))}
              className="form-select"
            >
              {tradeTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label" htmlFor="counterparty">Counterparty</label>
            <input
              id="counterparty"
              value={form.counterparty}
              onChange={(event) => setForm(current => ({
                ...current,
                counterparty: event.target.value
              }))}
              className="form-control"
              maxLength={100}
              required
            />
          </div>

          <div className="col-md-2">
            <label className="form-label" htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              value={form.quantity}
              onChange={(event) => setForm(current => ({
                ...current,
                quantity: Number(event.target.value)
              }))}
              className="form-control"
              type="number"
              min="0.0001"
              step="0.0001"
              required
            />
          </div>

          <div className="col-md-2">
            <label className="form-label" htmlFor="unitPrice">Unit Price</label>
            <input
              id="unitPrice"
              value={form.unitPrice}
              onChange={(event) => setForm(current => ({
                ...current,
                unitPrice: Number(event.target.value)
              }))}
              className="form-control"
              type="number"
              min="0"
              step="0.0001"
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label" htmlFor="marketCode">Market</label>
            <input
              id="marketCode"
              value={form.marketCode ?? ''}
              onChange={(event) => setForm(current => ({
                ...current,
                marketCode: event.target.value
              }))}
              className="form-control"
              maxLength={20}
            />
          </div>

          <div className="col-md-9">
            <label className="form-label" htmlFor="tradeRemark">Remark</label>
            <input
              id="tradeRemark"
              value={form.remark ?? ''}
              onChange={(event) => setForm(current => ({
                ...current,
                remark: event.target.value
              }))}
              className="form-control"
              maxLength={500}
            />
          </div>
        </div>

        <div className="alert alert-light border mt-3 mb-0 small">
          Trade Amount 不由前端輸入；Backend 會依 Quantity × Unit Price 計算。
        </div>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={onCancel}
          >
            取消
          </button>
          <button className="btn btn-primary" type="submit" disabled={saving}>
            儲存 Trading
          </button>
        </div>
      </form>
    </section>
  )
}
