---
title: IT Vue 路線
group: vue
kind: course
---

# IT Vue 路線

## 34. Vue 路線先學什麼、不學什麼

這個專案使用：

```text
Vue 3
Composition API
<script setup>
TypeScript
Vue Router
Vite
Bootstrap 5
ECharts
```

第一階段**沒有**：

```text
Pinia
Nuxt
Vuex
Options API 為主的寫法
SSR
複雜 component framework
```

所以教學網站不要一開始把 Vue 生態全部塞給學員。

---

# 35. Vue Single File Component（SFC）

典型 `.vue`：

```vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">
    {{ count }}
  </button>
</template>

<style scoped>
/* optional */
</style>
```

一個檔案同時描述：

```text
<script>   行為 / State
<template> 畫面
<style>    樣式
```

WUT1 專案主要把共用 CSS 放在 `src/styles/`，不必每個 component 都寫 style。

### `<script setup lang="ts">`

- `setup`：Composition API 的簡化語法。
- `lang="ts"`：script 使用 TypeScript。
- script 中宣告的 variable / function 可以直接在 template 使用。

### 中文延伸閱讀

- [Vue 中文：Component 基礎](https://cn.vuejs.org/guide/essentials/component-basics)
- [Vue 中文：Template Syntax](https://cn.vuejs.org/guide/essentials/template-syntax)

---

# 36. Vue `ref()`

```typescript
const selectedProductId = ref<number | null>(null)
```

JavaScript 中實際 value：

```typescript
selectedProductId.value = 1
```

Template 會自動 unwrap：

```vue
<div>{{ selectedProductId }}</div>
```

### 使用時機

單一 reactive value：

```text
selectedProductId
loading
saving
error
```

### 中文延伸閱讀

- [Vue 中文：Reactivity Fundamentals](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals)

---

# 37. Vue `reactive()`

Form object：

```typescript
const form = reactive<ProductUpdateRequest>({
  prodName: '',
  prodCategory: '',
  prodStatus: 'ACTIVE',
  currencyCode: 'TWD',
  listPrice: 0,
  remark: null,
  rowVersion: ''
})
```

適合管理一組彼此相關的 form fields。

修改：

```typescript
form.prodName = 'New Name'
```

不要重新指定整個 `form` binding，而是修改 properties 或用 `Object.assign()`。

---

# 38. Vue `computed()`

```typescript
const selectedProduct = computed(() =>
  products.value.find(p => p.prodId === selectedProductId.value) ?? null
)
```

用途：

> 從既有 state **推導**新值，而不是再保存一份容易不同步的 state。

```text
products + selectedProductId
            ↓
      selectedProduct
```

### 中文延伸閱讀

- [Vue 中文：Computed](https://cn.vuejs.org/guide/essentials/computed)

---

# 39. Vue `watch()`

Product Form 會需要在 parent 換 Product 時同步 form：

```typescript
watch(
  () => props.product,
  product => {
    Object.assign(form, {
      prodName: product.prodName,
      // ...
    })
  },
  { immediate: true }
)
```

拆解：

```text
第一個參數  watch source
第二個參數  source 改變後執行
第三個參數  option
```

`immediate: true`：component 建立時先執行一次。

### 不要濫用 watch

能用 `computed()` 表達的 derived state，不要全部改成 `watch()` + 手動同步。

---

# 40. Vue Lifecycle：`onMounted()` / `onBeforeUnmount()`

ECharts wrapper：

```typescript
onMounted(() => {
  chart = echarts.init(container.value!)
})

onBeforeUnmount(() => {
  chart?.dispose()
})
```

心智模型：

```text
Component 建立 DOM
      ↓
onMounted
      ↓
建立 ECharts / ResizeObserver
      ↓
Component 要離開
      ↓
onBeforeUnmount
      ↓
dispose / cleanup
```

這是 resource lifecycle，不只是「Vue 語法」。

---

# 41. Vue Props：`defineProps`

```typescript
const props = defineProps<{
  product: Product
  saving: boolean
}>()
```

Parent：

```vue
<ProductMasterForm
  :product="product"
  :saving="saving"
/>
```

核心：

```text
Parent
  │ props
  ▼
Child
```

Child 不應直接任意修改 parent state。

### 中文延伸閱讀

- [Vue 中文：Props](https://cn.vuejs.org/guide/components/props)

---

# 42. Vue Events：`defineEmits`

Child：

```typescript
const emit = defineEmits<{
  save: [request: ProductUpdateRequest]
}>()

function submit() {
  emit('save', { ...form })
}
```

Parent：

```vue
<ProductMasterForm @save="saveProduct" />
```

資料方向：

```text
Parent → Child：Props
Child → Parent：Events
```

### 中文延伸閱讀

- [Vue 中文：Component Events](https://cn.vuejs.org/guide/components/events)

---

# 43. Vue Template Interpolation `{{ }}`

```vue
<td>{{ trading.tradeAmount }}</td>
```

`{{ expression }}`：把 JavaScript expression 結果渲染成文字。

不要放大量複雜 business calculation：

```vue
<!-- 不建議把正式金額規則塞這裡 -->
{{ quantity * unitPrice * someRule }}
```

Business Rule 應由 Backend 決定。

---

# 44. `v-bind` / `:`

完整：

```vue
<input v-bind:disabled="saving" />
```

簡寫：

```vue
<input :disabled="saving" />
```

Component prop：

```vue
<TradingDetailGrid :items="tradings" />
```

---

# 45. `v-on` / `@`

完整：

```vue
<button v-on:click="reload">Reload</button>
```

簡寫：

```vue
<button @click="reload">Reload</button>
```

Custom event：

```vue
<TradingDetailGrid @edit="openEdit" />
```

---

# 46. `@submit.prevent`

```vue
<form @submit.prevent="submit">
```

等於：

1. 聽 `submit` event。
2. 呼叫 `event.preventDefault()`。
3. 執行 `submit` function。

避免 browser 做傳統整頁 form submit。

---

# 47. `v-model`

```vue
<input v-model="form.prodName" />
```

概念上同時處理：

```text
input value ← state
input event → state
```

Number modifier：

```vue
<input type="number" v-model.number="form.listPrice" />
```

要求 Vue 嘗試把 input string 轉 number。

---

# 48. `v-if` / `v-else`

```vue
<LoadingPanel v-if="loading" />
<ErrorAlert v-else-if="error" :message="error" />
<div v-else>
  ...
</div>
```

這是 declarative conditional rendering。

---

# 49. `v-for` + `:key`

```vue
<tr
  v-for="item in tradings"
  :key="item.tradingId"
>
```

`:key` 讓 Vue 能穩定追蹤每一筆 list item 身分。

不要用 index 當 key，如果資料本身已有 stable id。

---

# 50. Vue Template Ref

ECharts container：

```typescript
const chartElement = ref<HTMLDivElement | null>(null)
```

Template：

```vue
<div ref="chartElement"></div>
```

Mounted 後：

```typescript
echarts.init(chartElement.value!)
```

### 中文延伸閱讀

- [Vue 中文：Template Refs](https://cn.vuejs.org/guide/essentials/template-refs)

---

# 51. Vue Router

Router config：

```typescript
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: 'master-detail',
          component: ProductTradingPage
        },
        {
          path: 'dashboard',
          component: ProductTradingDashboardPage
        }
      ]
    }
  ]
})
```

### `createWebHashHistory()`

URL 類似：

```text
http://localhost:8080/#/dashboard
```

優點是 static hosting / Spring Boot fallback 設定較簡單。

### `RouterLink`

```vue
<RouterLink to="/dashboard">Dashboard</RouterLink>
```

### `RouterView`

```vue
<RouterView />
```

表示目前 route 對應 component 的渲染位置。

### 中文延伸閱讀

- [Vue Router 中文指南](https://router.vuejs.org/zh/guide/)
- [Vue Router 中文 API](https://router.vuejs.org/zh/api/)

---

# 52. Vue API Client

不要在每個 component 到處：

```typescript
fetch('/api/...')
```

WUT1 抽成：

```text
feature component
       ↓
product-trading.api.ts
       ↓
shared/api/api-client.ts
       ↓
HTTP
```

典型：

```typescript
export async function getProducts(): Promise<Product[]> {
  return apiClient.get<Product[]>('/api/products')
}
```

目的：

- HTTP error handling 集中。
- Header / auth 未來容易統一。
- Component 專注 UI state。

---

# 53. Vue Master / Detail State Flow

Page：

```text
ProductTradingPage.vue
│
├─ products
├─ selectedProductId
├─ product
├─ tradings
├─ loading
└─ error
```

流程：

```text
Page mounted
   ↓
load products
   ↓
選第一筆 product
   ↓
load product + tradings
   ↓
props
 ┌─────────────┬──────────────┐
 ▼             ▼
Master Form   Detail Grid
```

Update：

```text
Form emit save
     ↓
Page call API
     ↓
Backend
     ↓
reload page state
```

這一頁是理解 Vue 「State owner」最重要的案例。

---

# 54. Vue Dashboard Drill-down

```text
ProductTradingDashboardPage.vue
│
├─ dashboard summary
├─ product aggregates
└─ selectedProductId
        │
        ├─ TradingDrilldownChart
        └─ TradingDrilldownGrid
```

Bar chart click：

```text
ECharts
 ↓ emit chart-click
ProductSummaryChart
 ↓ emit product-select
Dashboard Page
 ↓ selectedProductId 更新
Drill-down components 更新
```

這就是 Vue 相對 Handlebars 最值得學的概念：

> **不是手動找 DOM 再逐個 refresh，而是 State 改變 → UI 依 dependency 更新。**

---

# 55. Vite

`vite.config.ts` 概念：

```typescript
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  build: {
    outDir: 'dist'
  }
})
```

### Vite 在這個專案的兩個職責

```text
DEV
Source → Vite Dev Server / HMR → Browser

BUILD
Source → vite build → dist HTML/JS/CSS
```

Production 不需要 Vite server。

### `import.meta.env`

若未來需要 Vite environment variable，會用這個 namespace；目前 Sample 主要靠 dev proxy，避免 frontend 硬編 backend URL。

### 中文延伸閱讀

- [Vite 中文指南](https://vitejs.cn/vite5-cn/guide/)
- [Vite 中文：Production Build](https://vitejs.cn/vite5-cn/guide/build.html)

> 注意：這個中文鏡像頁面是較早版本的 Vite 文件；概念可用，特定 option 應以專案實際 Vite 版本與官方英文文件為準。

---

# 56. Vue ESLint

用途不是「格式漂亮」而已，而是讓一些常見錯誤在 CI / local verification 被機器擋掉。

Flat config 會看到：

```javascript
export default [
  // ...
]
```

以及 Vue / TypeScript plugin config。

教學重點：

```text
Compiler / Typecheck → 型別問題
ESLint               → coding / framework rule
Test                 → behavior
```

三者不同。

---

# 57. Vue Playwright E2E

```typescript
import { test, expect } from '@playwright/test'

test('可以切換產品並看到交易明細', async ({ page }) => {
  await page.goto('/#/master-detail')
  await expect(page.getByTestId('product-form')).toBeVisible()
})
```

會看到：

- `test(...)`
- `async ({ page }) => {}`
- `page.goto()`
- `page.getByTestId()`
- `page.getByRole()`
- `.click()` / `.fill()` / `.selectOption()`
- `expect(...).toBeVisible()`
- `expect(...).toContainText()`

### 中文延伸閱讀

- [Playwright 繁中：Writing Tests](https://playwright.tw/docs/writing-tests)
- [Playwright 繁中：Assertions](https://playwright.tw/docs/test-assertions)
- [Playwright 繁中：TypeScript](https://playwright.tw/docs/test-typescript)

---
