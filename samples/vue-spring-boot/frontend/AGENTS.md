# Frontend AGENTS.md

Root `AGENTS.md` 仍然有效，本檔補充 Vue / TypeScript 規則。

## 技術

- Vue 3
- TypeScript
- Vite
- Vue Router
- Bootstrap 5
- Apache ECharts

## Feature Boundary

Business-specific code 放：

`src/features/<feature>/`

只有真正跨 Feature 的穩定能力才放 `src/shared/`。

## State

- Page 擁有跨 Component State。
- Child Component 使用 Props / Emits。
- 不得因為單一畫面方便就新增 Pinia 或其他 Global State Library。
- Dashboard Drill-down 的 Selection State 必須只有一個 Owner，避免 Chart 與 Grid 各自維護不同狀態。

## API

- Vue Component 不散落直接 `fetch()`。
- Feature API 放 `features/*/api/`。
- HTTP 共用行為放 `shared/api/`。
- Backend Business Rule 不在 Frontend 重算。
- `TRADE_AMOUNT` 只顯示 Backend 回傳結果。

## ECharts

- ECharts instance lifecycle 只在 `shared/chart/EChart.vue` 管理。
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
