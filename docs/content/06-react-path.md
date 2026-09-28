---
title: IT React 路線
group: react
kind: course
---

# IT React 路線

## 58. React 路線先學什麼、不學什麼

使用：

```text
React
TypeScript / TSX
React Router
TanStack Query
Vite
Bootstrap 5
ECharts
```

刻意沒有：

```text
Redux
Zustand
Next.js
React Server Components
Tailwind
CSS-in-JS
```

核心規則：

```text
Server State → TanStack Query
Local UI State → React useState
Navigation / shareable state → Router / URL
```

---

# 59. JSX / TSX

最基本 React Component：

```tsx
export function Hello() {
  return <div>Hello</div>
}
```

TSX = TypeScript + JSX syntax。

### JSX 不是 HTML String

```tsx
const element = <button>Save</button>
```

Build tool 會把 JSX transform 成 React element creation logic。

### `className`

HTML：

```html
<div class="card">
```

React：

```tsx
<div className="card">
```

因為 JSX attribute 使用 JavaScript naming convention。

---

# 60. React `createRoot()` / `StrictMode`

`main.tsx`：

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('找不到 root')
}

createRoot(rootElement).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>
)
```

讀法：

```text
index.html #root
      ↓
createRoot
      ↓
render React component tree
```

`StrictMode` 是開發輔助工具，不是 Security Mode。

---

# 61. React Functional Component

```tsx
export function ProductMasterForm(props: Props) {
  return (...)
}
```

Destructuring props：

```tsx
export function ProductMasterForm({
  product,
  saving,
  onSave
}: Props) {
}
```

---

# 62. React Props Interface

```typescript
interface Props {
  product: Product
  saving: boolean
  onSave: (request: ProductUpdateRequest) => Promise<void>
}
```

資料仍然是：

```text
Parent → Props → Child
```

Event callback：

```text
Child → callback prop → Parent
```

---

# 63. `PropsWithChildren`

Providers：

```tsx
export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

`children` 就是：

```tsx
<AppProviders>
  <App />
</AppProviders>
```

中間的 `<App />`。

---

# 64. `useState()`

```tsx
const [selectedProductId, setSelectedProductId] =
  useState<number | null>(null)
```

拆解：

```text
selectedProductId       現值
setSelectedProductId    更新 function
```

更新：

```tsx
setSelectedProductId(1)
```

React 重新 render，依新 state 產生新的 UI 描述。

### 中文延伸閱讀

- [React 中文：useState](https://zh-hans.react.dev/reference/react/useState)

---

# 65. Controlled Form

```tsx
<input
  value={form.prodName}
  onChange={event =>
    setForm({
      ...form,
      prodName: event.target.value
    })
  }
/>
```

Vue 的：

```vue
v-model="form.prodName"
```

React 通常拆成：

```text
value      State → UI
onChange   UI → State
```

這是學 React 最重要的認知差異之一。

---

# 66. `FormEvent` / `preventDefault()`

```tsx
function submit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()
  onSave(form)
}
```

Template：

```tsx
<form onSubmit={submit}>
```

---

# 67. Conditional Rendering

### `if`

```tsx
if (query.isPending) {
  return <LoadingPanel />
}
```

### Ternary

```tsx
{error ? <ErrorAlert message={error} /> : <Content />}
```

### `&&`

```tsx
{selectedProduct && (
  <ProductMasterForm product={selectedProduct} />
)}
```

### 中文延伸閱讀

- [React 中文：條件渲染](https://zh-hans.react.dev/learn/conditional-rendering)

---

# 68. List Rendering `.map()` + `key`

```tsx
<tbody>
  {tradings.map(item => (
    <tr key={item.tradingId}>
      <td>{item.tradeDate}</td>
    </tr>
  ))}
</tbody>
```

React 不提供 `v-for`；使用 JavaScript Array `.map()`。

`key` 與 Vue 相同概念：穩定識別 list item。

---

# 69. `useEffect()`

ECharts / browser API 等 side effect：

```tsx
useEffect(() => {
  const chart = echarts.init(elementRef.current!)

  return () => {
    chart.dispose()
  }
}, [])
```

### Dependency Array

```tsx
useEffect(() => {
  // effect
}, [option])
```

意思：`option` dependency 改變後重新執行 effect。

### Cleanup

Effect return function：

```tsx
return () => {
  observer.disconnect()
}
```

Component unmount 或重新執行 effect 前 cleanup。

### 不要拿 `useEffect + fetch` 當預設 Server State 解法

WUT1 React Template 已指定：

```text
Server State → TanStack Query
```

`useEffect` 主要保留給真正 external system synchronization，例如 ECharts / ResizeObserver。

### 中文延伸閱讀

- [React 中文：useEffect](https://zh-hans.react.dev/reference/react/useEffect)

---

# 70. `useRef()`

DOM ref：

```tsx
const elementRef = useRef<HTMLDivElement | null>(null)
```

JSX：

```tsx
<div ref={elementRef} />
```

也可以保存「不需要觸發 render」的 mutable value：

```tsx
const clickHandlerRef = useRef(onChartClick)
clickHandlerRef.current = onChartClick
```

---

# 71. `useMemo()`

```tsx
const chartOption = useMemo(() => ({
  // ...
}), [data])
```

用途：cache calculation/object identity。

不要把每個簡單 expression 都包 `useMemo()`；只有 dependency / expensive compute / identity 有理由時使用。

---

# 72. Inline Expression / Style Object

```tsx
<div style={{ height: `${height}px` }} />
```

JSX `{}` 內是 JavaScript expression。

Object literal：

```typescript
{ height: '320px' }
```

---

# 73. Optional Callback

```typescript
interface Props {
  onChartClick?: (params: unknown) => void
}
```

呼叫：

```typescript
onChartClick?.(params)
```

---

# 74. React Router

```tsx
export const router = createHashRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/master-detail" replace />
      },
      {
        path: 'master-detail',
        element: <ProductTradingPage />
      },
      {
        path: 'dashboard',
        element: <ProductTradingDashboardPage />
      }
    ]
  }
])
```

Layout：

```tsx
<Outlet />
```

Navigation：

```tsx
<NavLink to="/dashboard">Dashboard</NavLink>
```

Router Provider：

```tsx
<RouterProvider router={router} />
```

Hash route 的理由與 Vue 相同：Standalone static resource hosting 容易。

### 中文延伸閱讀

- [React Router 繁中參考站](https://router.react.com.tw/api/data-routers/createBrowserRouter)

> React Router 版本演進快，教學網站應以「route tree / layout / navigation / URL state」概念為主，API 細節需對照專案鎖定版本。

---

# 75. TanStack Query：為什麼 React 版多這一層

React 本身不替你管理 Server State cache / refetch / mutation lifecycle。

WUT1 定義：

```text
Backend data
    ↓
TanStack Query
    ↓
React Component
```

而不是：

```text
useEffect
+ fetch
+ loading state
+ error state
+ cache
+ refresh
+ mutation
全部自己寫
```

---

# 76. `QueryClient` / `QueryClientProvider`

```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
      refetchOnWindowFocus: false
    },
    mutations: {
      retry: false
    }
  }
})
```

Provider：

```tsx
<QueryClientProvider client={queryClient}>
  {children}
</QueryClientProvider>
```

### Numeric Separator

```typescript
30_000
```

等於 `30000`，底線只是提高可讀性。

---

# 77. Query Key

```typescript
export const productTradingKeys = {
  all: ['product-trading'] as const,
  products: () => [...productTradingKeys.all, 'products'] as const,
  product: (id: number) =>
    [...productTradingKeys.all, 'product', id] as const
}
```

Query Key 就像 Server State 的 identity/address。

---

# 78. `useQuery()`

```tsx
export function useProducts() {
  return useQuery({
    queryKey: productTradingKeys.products(),
    queryFn: productTradingApi.getProducts
  })
}
```

Dependent query：

```tsx
export function useProduct(prodId: number | null) {
  return useQuery({
    queryKey:
      prodId === null
        ? [...productTradingKeys.all, 'product', 'none']
        : productTradingKeys.product(prodId),
    queryFn: () => productTradingApi.getProduct(prodId as number),
    enabled: prodId !== null
  })
}
```

重要 property：

- `queryKey`
- `queryFn`
- `enabled`
- 回傳的 `data`
- `isPending`
- `error`

### 中文延伸閱讀

- [TanStack Query 中文：Quick Start](https://tanstack.com.cn/query/latest/docs/framework/react/quick-start)
- [TanStack Query 中文：Query Functions](https://tanstack.com.cn/query/latest/docs/framework/react/guides/query-functions)

---

# 79. `useMutation()`

```tsx
return useMutation({
  mutationFn: ({ prodId, request }) =>
    productTradingApi.updateProduct(prodId, request),
  onSuccess: invalidate
})
```

使用：

```tsx
await mutation.mutateAsync({
  prodId,
  request
})
```

Query 是「讀 Server State」，Mutation 是「改 Server State」。

### 中文延伸閱讀

- [TanStack Query 中文：Mutations](https://tanstack.com.cn/query/latest/docs/framework/react/guides/mutations)

---

# 80. `useQueryClient()` / `invalidateQueries()`

```tsx
const queryClient = useQueryClient()

await queryClient.invalidateQueries({
  queryKey: productTradingKeys.all
})
```

意思：

> mutation 成功後，標記相關 query data 已經舊了，讓 query 機制重新取得正確 server state。

這比手動：

```text
setProducts
setProduct
setTradings
setDashboard
...
```

逐個同步更穩定。

---

# 81. React Master / Detail State Flow

```text
ProductTradingPage
│
├─ Local UI State
│    selectedProductId → useState
│
├─ Server State
│    products          → useProducts()
│    product           → useProduct(id)
│    tradings          → useTradings(id)
│
└─ Mutation
     updateProduct     → useUpdateProduct()
     createTrading     → useCreateTrading()
```

這一頁是理解 React Golden Path 的關鍵：

> **不是所有東西都塞 `useState()`。**

---

# 82. React ECharts Wrapper

核心 pattern：

```tsx
const elementRef = useRef<HTMLDivElement | null>(null)

useEffect(() => {
  if (!elementRef.current) return

  const chart = echarts.init(elementRef.current)
  chart.setOption(option)

  const observer = new ResizeObserver(() => chart.resize())
  observer.observe(elementRef.current)

  return () => {
    observer.disconnect()
    chart.dispose()
  }
}, [])
```

另一個 effect 更新 option：

```tsx
useEffect(() => {
  chartRef.current?.setOption(option, true)
}, [option])
```

這是典型「React 管 component lifecycle、ECharts 管自己的 imperative chart instance」整合。

---

# 83. React Vite / ESLint / Playwright

Vite 的角色與 Vue 相同：

```text
DEV → HMR / Proxy
BUILD → TSX/TS → HTML/JS/CSS dist
```

差異只在 plugin：

```typescript
plugins: [react()]
```

Playwright test 的語法也與 Vue 版幾乎相同，因為 E2E test 測的是 Browser behavior，不應依賴 Vue / React internals。

這也是一個重要架構觀念：

> **好的 E2E test 可以在前端 framework 替換時大量沿用。**
