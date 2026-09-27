<script setup lang="ts">
import { reactive, watch } from 'vue'

import type {
  TradeType,
  Trading,
  TradingUpsertRequest
} from '../model/product-trading.types'

const props = defineProps<{
  trade: Trading | null
  saving: boolean
}>()

const emit = defineEmits<{
  save: [request: TradingUpsertRequest]
  cancel: []
}>()

const form = reactive<TradingUpsertRequest>({
  tradeDate: '',
  tradeType: 'BUY',
  counterparty: '',
  quantity: 1,
  unitPrice: 0,
  marketCode: null,
  remark: null,
  rowVersion: null
})

watch(
  () => props.trade,
  (trade) => {
    Object.assign(form, trade
      ? {
          tradeDate: trade.tradeDate,
          tradeType: trade.tradeType,
          counterparty: trade.counterparty,
          quantity: trade.quantity,
          unitPrice: trade.unitPrice,
          marketCode: trade.marketCode,
          remark: trade.remark,
          rowVersion: trade.rowVersion
        }
      : {
          tradeDate: new Date().toISOString().slice(0, 10),
          tradeType: 'BUY',
          counterparty: '',
          quantity: 1,
          unitPrice: 0,
          marketCode: null,
          remark: null,
          rowVersion: null
        })
  },
  { immediate: true }
)

const tradeTypes: TradeType[] = ['BUY', 'SELL']

function submit(): void {
  emit('save', {
    ...form,
    counterparty: form.counterparty.trim(),
    marketCode: form.marketCode?.trim() || null,
    remark: form.remark?.trim() || null
  })
}
</script>

<template>
  <section class="card border-primary-subtle mb-4" data-testid="trading-edit-panel">
    <div class="card-header bg-primary-subtle d-flex align-items-center justify-content-between">
      <span class="fw-semibold">
        {{ trade ? `編輯 Trading #${trade.tradingId}` : '新增 Trading' }}
      </span>
      <button class="btn-close" type="button" aria-label="關閉" @click="emit('cancel')"></button>
    </div>

    <form class="card-body" @submit.prevent="submit">
      <div class="row g-3">
        <div class="col-md-2">
          <label class="form-label" for="tradeDate">Trade Date</label>
          <input
            id="tradeDate"
            v-model="form.tradeDate"
            class="form-control"
            type="date"
            required
          />
        </div>

        <div class="col-md-2">
          <label class="form-label" for="tradeType">Type</label>
          <select id="tradeType" v-model="form.tradeType" class="form-select">
            <option v-for="type in tradeTypes" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>

        <div class="col-md-4">
          <label class="form-label" for="counterparty">Counterparty</label>
          <input
            id="counterparty"
            v-model="form.counterparty"
            class="form-control"
            maxlength="100"
            required
          />
        </div>

        <div class="col-md-2">
          <label class="form-label" for="quantity">Quantity</label>
          <input
            id="quantity"
            v-model.number="form.quantity"
            class="form-control"
            type="number"
            min="0.0001"
            step="0.0001"
            required
          />
        </div>

        <div class="col-md-2">
          <label class="form-label" for="unitPrice">Unit Price</label>
          <input
            id="unitPrice"
            v-model.number="form.unitPrice"
            class="form-control"
            type="number"
            min="0"
            step="0.0001"
            required
          />
        </div>

        <div class="col-md-3">
          <label class="form-label" for="marketCode">Market</label>
          <input
            id="marketCode"
            v-model="form.marketCode"
            class="form-control"
            maxlength="20"
          />
        </div>

        <div class="col-md-9">
          <label class="form-label" for="tradeRemark">Remark</label>
          <input
            id="tradeRemark"
            v-model="form.remark"
            class="form-control"
            maxlength="500"
          />
        </div>
      </div>

      <div class="alert alert-light border mt-3 mb-0 small">
        Trade Amount 不由前端輸入；Backend 會依 Quantity × Unit Price 計算。
      </div>

      <div class="d-flex justify-content-end gap-2 mt-3">
        <button class="btn btn-outline-secondary" type="button" @click="emit('cancel')">
          取消
        </button>
        <button class="btn btn-primary" type="submit" :disabled="saving">
          儲存 Trading
        </button>
      </div>
    </form>
  </section>
</template>
