# 第一輪 Review Guide

本文件讓 Reviewer 先檢查「這套 Golden Path 是否值得成為公司模板」，而不是先陷入逐行語法。

## Review 順序

### 1. Repository 與 Agent Harness

先看：

- `AGENTS.md`
- `ARCHITECTURE.md`
- `frontend/AGENTS.md`
- `docs/FRONTEND.md`

請確認：

- Agent 是否知道修改前要讀哪些文件？
- 技術選擇是否被限制在足夠小的範圍？
- Business Feature 是否比技術資料夾更容易找到？
- 規則是否能被 Compiler / Lint / Test 驗證？

### 2. React Folder Structure

主要看：

```text
frontend/src/
├─ app/
├─ features/
│  └─ product-trading/
└─ shared/
```

請確認這個結構是否比全域：

```text
components/
services/
hooks/
utils/
stores/
```

更容易讓人與 Agent 從 Business Feature 開始工作。

### 3. State Strategy

看：

- `product-trading.queries.ts`
- `product-trading.mutations.ts`
- `ProductTradingPage.tsx`
- `ProductTradingDashboardPage.tsx`

重點不是 Hook 語法，而是分類是否清楚：

```text
Server State   → TanStack Query
Local UI State → useState
Shareable State → URL
```

第一版明確不加入 Redux / Zustand。

### 4. Master / Detail

看：

- `ProductTradingPage.tsx`
- `ProductMasterForm.tsx`
- `TradingDetailGrid.tsx`
- `TradingEditPanel.tsx`

請確認：

- 上層 Form / 下層 Grid 是否容易理解？
- Product / Trading API 是否由 TanStack Query 統一管理？
- `TRADE_AMOUNT` 是否仍由 Backend 計算？
- Optimistic Concurrency 是否仍以 `ROW_VERSION` 為準？

### 5. Dashboard / Drill-down

看：

- `ProductTradingDashboardPage.tsx`
- `ProductSummaryChart.tsx`
- `TradingDrilldownChart.tsx`
- `TradingDrilldownGrid.tsx`

核心教學概念：

```text
selectedProdId
      │
      ├─ Monthly Query → Chart
      └─ Trading Query → Grid
```

請確認 React 版是否讓 State Owner 與 Server State Boundary 更清楚。

### 6. Backend / Database

React 轉換不應影響：

- Spring Boot API
- Business Rule
- SQLite Schema
- Local Sample Data
- Executable JAR

如果 Frontend 改框架卻要求 Backend 跟著改 API，表示 Frontend Boundary 不夠乾淨。

## 第一輪不需要花時間的地方

- CSS 細節
- React 語法偏好
- Component 是否可以再抽更小
- 是否還能再加入更多 library

第一輪先決定這套「限制過的 React」是否比 Vue 版更適合公司長期 Golden Path。
