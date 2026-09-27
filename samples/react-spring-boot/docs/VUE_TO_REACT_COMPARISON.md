# Vue → React 轉換 Review

本文件只比較 Frontend。Backend、API、SQLite Schema、Business Rule 與 executable JAR 模式沒有改動。

## 對應關係

| Vue 版本 | React 版本 |
| --- | --- |
| `App.vue` | `app/App.tsx` |
| Vue Router | React Router |
| `ref()` | `useState()` |
| `computed()` | 直接衍生或 `useMemo()` |
| Props / Emits | Props / Callback |
| `onMounted()` | `useEffect()`（只用於真正 side effect） |
| 手動 API Page State | TanStack Query Server State |
| `EChart.vue` | `EChart.tsx` |

## React 版刻意新增的約束

React 自由度較高，因此 Template 加入下列 Golden Path：

```text
app
 │
 ▼
features
 │
 ▼
shared
```

State：

```text
Server State    → TanStack Query
Local UI State  → useState
Shareable State → URL
```

未經 ADR 不加入：

- Redux
- Zustand
- Next.js
- 其他 Global State / Meta Framework

## Master / Detail

Vue 版 Page 同時保存：

- Product Server Data
- Trading Server Data
- Loading
- Error
- Selected Product
- Editor State

React 版刻意分開：

- Product / Trading / Loading / Query Error → TanStack Query
- Selected Product / Editor → Local State
- Business Rule → Backend

Review 重點不是哪一版程式碼較短，而是哪一版更容易讓未來 Developer / Agent 判斷「資料應該放哪裡」。

## Dashboard

React 版保留單一：

```text
selectedProdId
```

然後：

```text
selectedProdId
   ├─ useMonthlyTrading()
   └─ useDashboardTrades()
```

Chart 與 Grid 不各自維護 Server Data。

## 建議 Review 問題

1. React + TanStack Query 是否比 Vue 版更容易區分 Server State 與 UI State？
2. React JSX 對既有 JSP 工程師的閱讀成本是否可接受？
3. `app / features / shared` 是否足夠，不需要再增加全域 `hooks / utils / stores`？
4. TanStack Query 是否值得成為公司標準依賴？
5. Agent 是否更容易沿固定 Query / Mutation pattern 產生一致程式？
6. Human Review 是否能更聚焦 Business Rule、State Owner 與 API Contract，而不是 framework boilerplate？
