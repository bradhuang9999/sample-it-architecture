# ADR-005：React State Management

## Status

Accepted

## Problem

React 不替 Application 決定 State Architecture。若 Developer / Agent 各自選擇 `useEffect`、Context、Redux、Zustand 或自製 cache，長期會形成難以 Review 的多套模式。

## Decision

State 分成三類：

1. **Server State**：TanStack Query。
2. **Local UI State**：React `useState`。
3. **可分享的查詢條件**：URL。

未經新的 ADR，不加入 Redux、Zustand 或其他 Global State Library。

## Server State

以下資料都視為 Server State：

- Product
- Trading
- Dashboard Summary
- Product Aggregate
- Monthly Drill-down

Feature Component 不自行：

- 維護 API cache
- 實作 retry
- 用 `useEffect` 做一般 fetch
- 在多個 Component 複製同一份 Server data

## Local UI State

以下可由 Page / Component 擁有：

- selected product id
- editor open / close
- form draft
- local message

State Owner 要靠近真正需要協調的 Component 範圍。

## Consequence

優點：

- Agent 修改時可快速判斷資料應放在哪裡。
- Human Review 可以用固定規則檢查。
- 不需要一開始就引入大型 Global Store。

代價：

- TanStack Query 成為 Frontend Golden Path 的固定依賴。
- 團隊必須理解 Server State 與 Local State 的差異。
