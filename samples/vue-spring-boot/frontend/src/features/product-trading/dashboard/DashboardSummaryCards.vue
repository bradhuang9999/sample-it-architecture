<script setup lang="ts">
import type { DashboardSummary } from '../model/product-trading.types'

const props = defineProps<{
  summary: DashboardSummary
}>()

const numberFormatter = new Intl.NumberFormat('zh-TW', {
  maximumFractionDigits: 2
})

function amountLabel(): string {
  return `${props.summary.currencyCode} ${numberFormatter.format(props.summary.totalTradingAmount)}`
}
</script>

<template>
  <div class="row g-3 mb-4" data-testid="dashboard-summary">
    <div class="col-md-4">
      <div class="card app-card h-100">
        <div class="card-body">
          <div class="text-secondary small">Product Count</div>
          <div class="display-6 fw-semibold">{{ summary.productCount }}</div>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card app-card h-100">
        <div class="card-body">
          <div class="text-secondary small">Trading Count</div>
          <div class="display-6 fw-semibold">{{ summary.tradingCount }}</div>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card app-card h-100">
        <div class="card-body">
          <div class="text-secondary small">Total Trading Amount</div>
          <div class="h2 fw-semibold mt-2 mb-0">{{ amountLabel() }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
