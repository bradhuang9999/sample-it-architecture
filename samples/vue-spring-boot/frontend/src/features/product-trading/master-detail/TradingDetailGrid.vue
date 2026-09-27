<script setup lang="ts">
import type { Trading } from '../model/product-trading.types'

defineProps<{
  trades: Trading[]
}>()

const emit = defineEmits<{
  add: []
  edit: [trade: Trading]
  remove: [trade: Trading]
}>()

const numberFormatter = new Intl.NumberFormat('zh-TW', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

function formatNumber(value: number): string {
  return numberFormatter.format(value)
}
</script>

<template>
  <section class="card app-card" data-testid="trading-detail-grid">
    <div class="card-header d-flex align-items-center justify-content-between gap-3">
      <div>
        <div class="section-title">Trading Detail</div>
        <div class="small text-secondary">
          SAMPLE_TRADING · {{ trades.length }} 筆
        </div>
      </div>

      <button class="btn btn-outline-primary btn-sm" type="button" @click="emit('add')">
        新增 Trading
      </button>
    </div>

    <div class="table-responsive">
      <table class="table table-hover align-middle mb-0">
        <thead>
          <tr>
            <th>Trade Date</th>
            <th>Type</th>
            <th>Counterparty</th>
            <th class="text-end">Quantity</th>
            <th class="text-end">Unit Price</th>
            <th class="text-end">Trade Amount</th>
            <th>Market</th>
            <th class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="trades.length === 0">
            <td colspan="8" class="text-center text-secondary py-4">
              目前沒有 Trading Detail。
            </td>
          </tr>

          <tr v-for="trade in trades" :key="trade.tradingId">
            <td>{{ trade.tradeDate }}</td>
            <td>
              <span
                class="badge"
                :class="trade.tradeType === 'BUY' ? 'text-bg-success' : 'text-bg-secondary'"
              >
                {{ trade.tradeType }}
              </span>
            </td>
            <td>
              <div>{{ trade.counterparty }}</div>
              <div v-if="trade.remark" class="small text-secondary text-truncate app-remark">
                {{ trade.remark }}
              </div>
            </td>
            <td class="text-end font-monospace">{{ formatNumber(trade.quantity) }}</td>
            <td class="text-end font-monospace">{{ formatNumber(trade.unitPrice) }}</td>
            <td class="text-end font-monospace fw-semibold">
              {{ formatNumber(trade.tradeAmount) }}
            </td>
            <td>{{ trade.marketCode || '—' }}</td>
            <td class="text-end text-nowrap">
              <button
                class="btn btn-link btn-sm text-decoration-none"
                type="button"
                @click="emit('edit', trade)"
              >
                編輯
              </button>
              <button
                class="btn btn-link btn-sm text-danger text-decoration-none"
                type="button"
                @click="emit('remove', trade)"
              >
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
