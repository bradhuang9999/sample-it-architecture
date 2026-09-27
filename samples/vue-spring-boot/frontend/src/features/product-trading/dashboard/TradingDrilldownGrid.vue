<script setup lang="ts">
import type { Trading } from '../model/product-trading.types'

defineProps<{
  trades: Trading[]
}>()

const numberFormatter = new Intl.NumberFormat('zh-TW', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})
</script>

<template>
  <div class="table-responsive" data-testid="dashboard-drilldown-grid">
    <table class="table table-sm table-hover align-middle mb-0">
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Counterparty</th>
          <th class="text-end">Quantity</th>
          <th class="text-end">Unit Price</th>
          <th class="text-end">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="trades.length === 0">
          <td colspan="6" class="text-center text-secondary py-4">
            沒有 Drill-down 明細。
          </td>
        </tr>
        <tr v-for="trade in trades" :key="trade.tradingId">
          <td>{{ trade.tradeDate }}</td>
          <td>{{ trade.tradeType }}</td>
          <td>{{ trade.counterparty }}</td>
          <td class="text-end font-monospace">
            {{ numberFormatter.format(trade.quantity) }}
          </td>
          <td class="text-end font-monospace">
            {{ numberFormatter.format(trade.unitPrice) }}
          </td>
          <td class="text-end font-monospace fw-semibold">
            {{ numberFormatter.format(trade.tradeAmount) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
