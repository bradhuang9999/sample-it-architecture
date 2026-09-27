<script setup lang="ts">
import { onMounted, ref } from 'vue'

import ErrorAlert from '../../../shared/ui/ErrorAlert.vue'
import LoadingPanel from '../../../shared/ui/LoadingPanel.vue'
import { ApiError } from '../../../shared/api/api-error'
import { productTradingApi } from '../api/product-trading.api'
import type {
  Product,
  ProductSummary,
  ProductUpdateRequest,
  Trading,
  TradingUpsertRequest
} from '../model/product-trading.types'
import ProductMasterForm from './ProductMasterForm.vue'
import TradingDetailGrid from './TradingDetailGrid.vue'
import TradingEditPanel from './TradingEditPanel.vue'

const products = ref<ProductSummary[]>([])
const selectedProdId = ref<number | null>(null)
const product = ref<Product | null>(null)
const trades = ref<Trading[]>([])

const loading = ref(true)
const savingProduct = ref(false)
const savingTrade = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// undefined = editor 關閉；null = 新增；Trading = 編輯。
const editingTrade = ref<Trading | null | undefined>(undefined)

onMounted(async () => {
  await loadProducts()
})

async function loadProducts(): Promise<void> {
  loading.value = true
  errorMessage.value = ''

  try {
    products.value = await productTradingApi.getProducts()

    if (products.value.length > 0) {
      selectedProdId.value = products.value[0].prodId
      await loadSelectedProduct()
    }
  }
  catch (error) {
    errorMessage.value = toMessage(error)
  }
  finally {
    loading.value = false
  }
}

async function loadSelectedProduct(): Promise<void> {
  if (selectedProdId.value === null) {
    product.value = null
    trades.value = []
    return
  }

  errorMessage.value = ''
  editingTrade.value = undefined

  try {
    const [master, detail] = await Promise.all([
      productTradingApi.getProduct(selectedProdId.value),
      productTradingApi.getTrades(selectedProdId.value)
    ])

    product.value = master
    trades.value = detail
  }
  catch (error) {
    errorMessage.value = toMessage(error)
  }
}

async function saveProduct(request: ProductUpdateRequest): Promise<void> {
  if (selectedProdId.value === null) return

  savingProduct.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    product.value = await productTradingApi.updateProduct(
      selectedProdId.value,
      request
    )

    successMessage.value = 'Master 已儲存。'

    // Product Name / Status 可能被修改，同步更新 selector。
    products.value = await productTradingApi.getProducts()
  }
  catch (error) {
    errorMessage.value = toMessage(error)
  }
  finally {
    savingProduct.value = false
  }
}

function addTrade(): void {
  editingTrade.value = null
  successMessage.value = ''
}

function editTrade(trade: Trading): void {
  editingTrade.value = trade
  successMessage.value = ''
}

async function saveTrade(request: TradingUpsertRequest): Promise<void> {
  if (selectedProdId.value === null) return

  savingTrade.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    if (editingTrade.value) {
      await productTradingApi.updateTrade(
        selectedProdId.value,
        editingTrade.value.tradingId,
        request
      )
    }
    else {
      await productTradingApi.createTrade(selectedProdId.value, request)
    }

    trades.value = await productTradingApi.getTrades(selectedProdId.value)
    editingTrade.value = undefined
    successMessage.value = 'Trading Detail 已儲存。'
  }
  catch (error) {
    errorMessage.value = toMessage(error)
  }
  finally {
    savingTrade.value = false
  }
}

async function removeTrade(trade: Trading): Promise<void> {
  if (selectedProdId.value === null) return

  const confirmed = window.confirm(
    `確定刪除 Trading #${trade.tradingId}？此動作會直接異動資料。`
  )

  if (!confirmed) return

  errorMessage.value = ''
  successMessage.value = ''

  try {
    await productTradingApi.deleteTrade(
      selectedProdId.value,
      trade.tradingId,
      trade.rowVersion
    )

    trades.value = await productTradingApi.getTrades(selectedProdId.value)
    successMessage.value = 'Trading Detail 已刪除。'
  }
  catch (error) {
    errorMessage.value = toMessage(error)
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
        <h1 class="h3 mb-1">Product / Trading Master Detail</h1>
        <p class="text-secondary mb-0">
          上層 Form、下層 Grid；示範 Vue State 與 Spring Boot API 的基本協作。
        </p>
      </div>
    </div>

    <ErrorAlert v-if="errorMessage" :message="errorMessage" />

    <div
      v-if="successMessage"
      class="alert alert-success"
      role="status"
      data-testid="success-message"
    >
      {{ successMessage }}
    </div>

    <LoadingPanel v-if="loading" />

    <template v-else>
      <section class="card app-card mb-4">
        <div class="card-body">
          <div class="row align-items-end g-3">
            <div class="col-md-6 col-lg-4">
              <label class="form-label" for="productSelector">選擇 Product</label>
              <select
                id="productSelector"
                v-model="selectedProdId"
                class="form-select"
                data-testid="product-selector"
                @change="loadSelectedProduct"
              >
                <option
                  v-for="item in products"
                  :key="item.prodId"
                  :value="item.prodId"
                >
                  {{ item.prodCode }} · {{ item.prodName }} · {{ item.prodStatus }}
                </option>
              </select>
            </div>

            <div class="col-auto">
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="loadSelectedProduct"
              >
                重新整理
              </button>
            </div>
          </div>
        </div>
      </section>

      <template v-if="product">
        <ProductMasterForm
          :product="product"
          :saving="savingProduct"
          @save="saveProduct"
        />

        <TradingEditPanel
          v-if="editingTrade !== undefined"
          :trade="editingTrade"
          :saving="savingTrade"
          @save="saveTrade"
          @cancel="editingTrade = undefined"
        />

        <TradingDetailGrid
          :trades="trades"
          @add="addTrade"
          @edit="editTrade"
          @remove="removeTrade"
        />
      </template>

      <div v-else class="text-secondary">
        沒有可顯示的 Product。
      </div>
    </template>
  </div>
</template>
