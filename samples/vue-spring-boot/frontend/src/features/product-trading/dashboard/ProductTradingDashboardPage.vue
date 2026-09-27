<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { ApiError } from '../../../shared/api/api-error'
import ErrorAlert from '../../../shared/ui/ErrorAlert.vue'
import LoadingPanel from '../../../shared/ui/LoadingPanel.vue'
import { productTradingApi } from '../api/product-trading.api'
import type {
  DashboardSummary,
  MonthlyTrading,
  ProductTradingAggregate,
  Trading
} from '../model/product-trading.types'
import DashboardSummaryCards from './DashboardSummaryCards.vue'
import ProductSummaryChart from './ProductSummaryChart.vue'
import TradingDrilldownChart from './TradingDrilldownChart.vue'
import TradingDrilldownGrid from './TradingDrilldownGrid.vue'

const summary = ref<DashboardSummary | null>(null)
const productAggregates = ref<ProductTradingAggregate[]>([])
const selectedProduct = ref<ProductTradingAggregate | null>(null)
const monthlyItems = ref<MonthlyTrading[]>([])
const tradingItems = ref<Trading[]>([])

const loading = ref(true)
const drilldownLoading = ref(false)
const errorMessage = ref('')

onMounted(async () => {
  await loadDashboard()
})

async function loadDashboard(): Promise<void> {
  loading.value = true
  errorMessage.value = ''
  selectedProduct.value = null
  monthlyItems.value = []
  tradingItems.value = []

  try {
    const [dashboardSummary, aggregates] = await Promise.all([
      productTradingApi.getDashboardSummary(),
      productTradingApi.getProductAggregates()
    ])

    summary.value = dashboardSummary
    productAggregates.value = aggregates

    // 教學範例預設選第一個 Product，讓頁面載入後就能看到 Drill-down 結果。
    // 使用者再點擊長條圖時，會用相同 State 流程切換 Product。
    if (aggregates.length > 0) {
      await selectProduct(aggregates[0])
    }
  }
  catch (error) {
    errorMessage.value = toMessage(error)
  }
  finally {
    loading.value = false
  }
}

async function selectProduct(item: ProductTradingAggregate): Promise<void> {
  selectedProduct.value = item
  drilldownLoading.value = true
  errorMessage.value = ''

  try {
    const [monthly, trades] = await Promise.all([
      productTradingApi.getMonthly(item.prodId),
      productTradingApi.getDashboardTrades(item.prodId)
    ])

    monthlyItems.value = monthly
    tradingItems.value = trades
  }
  catch (error) {
    monthlyItems.value = []
    tradingItems.value = []
    errorMessage.value = toMessage(error)
  }
  finally {
    drilldownLoading.value = false
  }
}

function toMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return '發生未預期錯誤。'
}
</script>

<template>
  <div>
    <div class="page-heading mb-4">
      <div>
        <h1 class="h3 mb-1">Product Trading Dashboard</h1>
        <p class="text-secondary mb-0">
          示範 KPI、ECharts 與 Drill-down。點擊 Product 長條後，下方明細會依同一份 State 更新。
        </p>
      </div>
    </div>

    <ErrorAlert v-if="errorMessage" :message="errorMessage" />
    <LoadingPanel v-if="loading" />

    <template v-else>
      <DashboardSummaryCards v-if="summary" :summary="summary" />

      <section class="card app-card mb-4">
        <div class="card-body">
          <div class="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3">
            <div>
              <h2 class="h5 mb-1">Trading Amount by Product</h2>
              <p class="text-secondary small mb-0">
                點擊任一長條執行 Drill-down。
              </p>
            </div>
            <button class="btn btn-outline-secondary btn-sm" type="button" @click="loadDashboard">
              重新整理
            </button>
          </div>

          <ProductSummaryChart
            v-if="productAggregates.length > 0"
            :items="productAggregates"
            @select="selectProduct"
          />
          <div v-else class="text-secondary py-5 text-center">
            目前沒有 Dashboard 資料。
          </div>
        </div>
      </section>

      <section v-if="selectedProduct" class="card app-card" data-testid="dashboard-drilldown">
        <div class="card-body">
          <div class="mb-3">
            <span class="badge text-bg-secondary me-2">Drill-down</span>
            <strong>{{ selectedProduct.prodCode }} · {{ selectedProduct.prodName }}</strong>
          </div>

          <LoadingPanel v-if="drilldownLoading" />

          <template v-else>
            <div class="row g-4">
              <div class="col-12 col-xl-7">
                <h3 class="h6">每月 Trading Amount</h3>
                <TradingDrilldownChart :items="monthlyItems" />
              </div>
              <div class="col-12 col-xl-5">
                <h3 class="h6">Trading Detail</h3>
                <TradingDrilldownGrid :trades="tradingItems" />
              </div>
            </div>
          </template>
        </div>
      </section>
    </template>
  </div>
</template>
