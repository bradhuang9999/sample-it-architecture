<script setup lang="ts">
import { reactive, watch } from 'vue'

import type {
  Product,
  ProductStatus,
  ProductUpdateRequest
} from '../model/product-trading.types'

const props = defineProps<{
  product: Product
  saving: boolean
}>()

const emit = defineEmits<{
  save: [request: ProductUpdateRequest]
}>()

const form = reactive<ProductUpdateRequest>({
  prodCode: '',
  prodName: '',
  prodCategory: '',
  prodStatus: 'ACTIVE',
  currencyCode: 'TWD',
  listPrice: 0,
  effectiveDate: '',
  ownerDeptCode: '',
  remark: null,
  rowVersion: ''
})

watch(
  () => props.product,
  (product) => {
    Object.assign(form, {
      prodCode: product.prodCode,
      prodName: product.prodName,
      prodCategory: product.prodCategory,
      prodStatus: product.prodStatus,
      currencyCode: product.currencyCode,
      listPrice: product.listPrice,
      effectiveDate: product.effectiveDate,
      ownerDeptCode: product.ownerDeptCode,
      remark: product.remark,
      rowVersion: product.rowVersion
    })
  },
  { immediate: true }
)

function submit(): void {
  emit('save', {
    ...form,
    prodCode: form.prodCode.trim(),
    prodName: form.prodName.trim(),
    prodCategory: form.prodCategory.trim(),
    currencyCode: form.currencyCode.trim().toUpperCase(),
    ownerDeptCode: form.ownerDeptCode.trim(),
    remark: form.remark?.trim() || null
  })
}

const statuses: ProductStatus[] = ['ACTIVE', 'INACTIVE']
</script>

<template>
  <section class="card app-card mb-4" data-testid="product-master-form">
    <div class="card-header d-flex align-items-center justify-content-between">
      <div>
        <div class="section-title">Product Master</div>
        <div class="small text-secondary">
          SAMPLE_PROD
        </div>
      </div>
      <span class="badge text-bg-light border">ID {{ product.prodId }}</span>
    </div>

    <form class="card-body" @submit.prevent="submit">
      <div class="row g-3">
        <div class="col-md-3">
          <label class="form-label" for="prodCode">Product Code</label>
          <input
            id="prodCode"
            v-model="form.prodCode"
            class="form-control"
            maxlength="20"
            required
          />
        </div>

        <div class="col-md-5">
          <label class="form-label" for="prodName">Product Name</label>
          <input
            id="prodName"
            v-model="form.prodName"
            class="form-control"
            maxlength="100"
            required
          />
        </div>

        <div class="col-md-2">
          <label class="form-label" for="prodCategory">Category</label>
          <input
            id="prodCategory"
            v-model="form.prodCategory"
            class="form-control"
            maxlength="30"
            required
          />
        </div>

        <div class="col-md-2">
          <label class="form-label" for="prodStatus">Status</label>
          <select id="prodStatus" v-model="form.prodStatus" class="form-select">
            <option v-for="status in statuses" :key="status" :value="status">
              {{ status }}
            </option>
          </select>
        </div>

        <div class="col-md-2">
          <label class="form-label" for="currencyCode">Currency</label>
          <input
            id="currencyCode"
            v-model="form.currencyCode"
            class="form-control text-uppercase"
            maxlength="3"
            pattern="[A-Za-z]{3}"
            required
          />
        </div>

        <div class="col-md-3">
          <label class="form-label" for="listPrice">List Price</label>
          <input
            id="listPrice"
            v-model.number="form.listPrice"
            class="form-control"
            type="number"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div class="col-md-3">
          <label class="form-label" for="effectiveDate">Effective Date</label>
          <input
            id="effectiveDate"
            v-model="form.effectiveDate"
            class="form-control"
            type="date"
            required
          />
        </div>

        <div class="col-md-4">
          <label class="form-label" for="ownerDeptCode">Owner Department</label>
          <input
            id="ownerDeptCode"
            v-model="form.ownerDeptCode"
            class="form-control"
            maxlength="20"
            required
          />
        </div>

        <div class="col-12">
          <label class="form-label" for="productRemark">Remark</label>
          <textarea
            id="productRemark"
            v-model="form.remark"
            class="form-control"
            rows="2"
            maxlength="500"
          ></textarea>
        </div>
      </div>

      <div class="d-flex justify-content-end mt-3">
        <button class="btn btn-primary" type="submit" :disabled="saving">
          <span
            v-if="saving"
            class="spinner-border spinner-border-sm me-2"
            aria-hidden="true"
          ></span>
          儲存 Master
        </button>
      </div>
    </form>
  </section>
</template>
