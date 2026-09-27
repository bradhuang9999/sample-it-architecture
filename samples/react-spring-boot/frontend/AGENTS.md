# Frontend AGENTS.md

Root `AGENTS.md` 仍然有效，本檔補充 React / TypeScript 規則。

## 技術

- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- Bootstrap 5
- Apache ECharts

## Feature Boundary

Business-specific code 放：

`src/features/<feature>/`

只有真正跨 Feature 的穩定能力才放 `src/shared/`。

允許的主要依賴方向：

```text
shared
  ↑
features
  ↑
app
```

- `shared` 不得 import `features`。
- Business Feature 不應直接 import 另一個 Feature 的 internal code。
- 跨 Feature 組合由 `app` 或正式定義的 public boundary 負責。

## State

State 必須先分類，再決定工具：

1. Server State：使用 TanStack Query。
2. Component / Page Local State：使用 React `useState`。
3. 可分享、可 Bookmark 的查詢條件：優先使用 URL。
4. 未經 ADR 核准，不得加入 Redux、Zustand 或其他 Global State Library。

Dashboard Drill-down 的 Selection State 必須只有一個 Owner，避免 Chart 與 Grid 各自維護不同狀態。

## React Hooks

- 不用 `useEffect` 模擬 Server State fetch；資料查詢使用 TanStack Query。
- `useEffect` 只用於與 React 外部系統同步、生命週期 side effect 或必要的 state synchronization。
- 不因「可能比較快」隨意加入 `useMemo` / `useCallback`；只有明確的 referential stability 或 expensive calculation 需求時使用。
- Hook 必須遵守 ESLint React Hooks 規則。

## API

- React Component 不散落直接 `fetch()`。
- Feature API 放 `features/*/api/`。
- Query / Mutation hooks 也放在 Feature API 目錄。
- HTTP 共用行為放 `shared/api/`。
- Backend Business Rule 不在 Frontend 重算。
- `TRADE_AMOUNT` 只顯示 Backend 回傳結果。

## ECharts

- ECharts instance lifecycle 只在 `shared/chart/EChart.tsx` 管理。
- Feature Component 只準備 option 與處理 semantic event。

## UI

- 先用 Bootstrap 5。
- 不自行加入另一套 UI Framework。
- Loading / Error / Empty 必須可見。
- Comment 以中文為主，只說明不直覺的意圖與規則。

## 完成前

至少執行：

```bash
npm run typecheck
npm run lint
npm run build
```

UI 行為改變時，更新 / 執行相關 Playwright spec。
