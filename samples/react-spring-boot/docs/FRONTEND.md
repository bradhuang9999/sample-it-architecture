# Frontend 開發規範

## 技術基線

- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- Bootstrap 5
- Apache ECharts

## 為什麼這版改採 React

本 Template 用來驗證另一條公司 Golden Path：在 Coding Agent 大量產生程式的前提下，以更大的 React 生態搭配更嚴格的 Repository Convention，降低「每個人各寫一套」的風險。

React 本身刻意保留高度自由，因此本 Template **不把自由度留給每個 Developer / Agent 自行決定**，而是透過固定 Folder Structure、State 分類、API Boundary、Lint 與 AGENTS.md 先做收斂。

## Feature-oriented

```text
src/
├─ app/
├─ features/
│  └─ <business-feature>/
└─ shared/
```

Business Feature 內只建立真正需要的子目錄，不為了形式預先建立空的 `hooks/`、`utils/`、`stores/`、`services/`。

不要建立全域 `components/` 後把所有 Business Component 都丟進去。

## 依賴方向

```text
shared
  ↑
features
  ↑
app
```

- `shared` 不知道任何 Business Feature。
- Feature 不直接依賴另一個 Feature 的 internal implementation。
- 跨 Feature 組合由 `app` 或明確 public boundary 負責。

## State 原則

State 分成三類：

### Server State

來源是 Backend / API 的資料，例如 Product、Trading、Dashboard Aggregate。

使用 **TanStack Query**：

- Query
- Cache
- Refetch
- Mutation
- Invalidations
- Loading / Error 狀態

不要用 `useEffect + fetch + useState` 自行重做 Server State Framework。

### Local UI State

例如：

- 目前選取 Product
- 編輯 Panel 是否開啟
- Form draft
- Tab

使用 React `useState`。

### URL State

需要 Bookmark、分享、重新整理後保留的查詢條件，優先放 URL。

未經 ADR 核准，不加入 Redux、Zustand 或其他 Global State Library。

## API 原則

```text
Component
   ↓
Query / Mutation Hook
   ↓
Feature API Function
   ↓
shared/api
```

- Component 不散落直接 `fetch()`。
- Feature API 放 `features/*/api/`。
- Backend Request / Response 必須有 TypeScript type。
- Business Rule 不在 Frontend 重算。
- Mutation 完成後由 Query Invalidation 保持畫面與 Server State 一致。

## React Hooks 原則

- Hooks 保持可讀，不建立 Generic Hook Factory。
- `useEffect` 不作為一般資料查詢工具。
- 不因為 React 有 Hook 就把每段邏輯抽成 Custom Hook。
- 只有跨 Component 可重複、且具有清楚語意的行為才抽取 Custom Hook。

## UI 原則

- Bootstrap 5 作為 Layout 與基本 UI Foundation。
- 公司視覺規範集中於 `src/styles/`。
- ECharts 只透過 `shared/chart/EChart.tsx` 管理 init / resize / dispose。
- Table 預設使用原生 Bootstrap Table；沒有大量資料功能需求時不引入 Data Grid Framework。
- Loading、Error、Empty State 必須明確呈現。

## 註解

註解以繁體中文為主，只說明：

- 不直覺的 Business Rule
- State ownership 理由
- Framework workaround
- Security / Data boundary

不要把程式碼逐行翻譯成中文。
