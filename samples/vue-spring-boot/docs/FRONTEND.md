# Frontend 開發規範

## 技術基線

- Vue 3
- TypeScript
- Vite
- Vue Router
- Bootstrap 5
- Apache ECharts

## 為什麼選 Vue

本 Template 的主要使用者包含既有 Java / JSP 開發人員。Vue Template 與 HTML 的認知距離較短，同時能提供 Component、Reactive State 與跨元件互動所需能力。

## Feature-oriented

```text
src/features/<business-feature>/
├─ api/
├─ model/
├─ master-detail/
└─ dashboard/
```

不要建立全域 `components/` 後把所有 Business Component 都丟進去。

## State 原則

- Page 擁有跨 Component 的畫面 State。
- Child Component 優先使用 Props / Emits。
- 不預設使用 Pinia。
- 當 Global State 真正跨多頁、跨 Domain 且難以用 Router / API 重建時，再提出 ADR。

## API 原則

- Component 不直接散落 `fetch()`。
- Feature API 放在 `features/*/api/`。
- 共用 HTTP 行為放在 `shared/api/`。
- Backend Response / Request 必須有 TypeScript type。
- Business Rule 不在 Frontend 重算。

## UI 原則

- Bootstrap 5 作為 Layout 與基本 UI Foundation。
- 公司視覺規範集中於 `src/styles/`。
- ECharts 只透過 `shared/chart/EChart.vue` 管理 init / resize / dispose。
- Table 預設使用原生 Bootstrap Table；沒有大量資料功能需求時不引入 Data Grid Framework。
- Loading、Error、Empty State 必須明確呈現。

## 註解

註解以繁體中文為主，只說明：

- 不直覺的 Business Rule
- State ownership 理由
- Framework workaround
- Security / Data boundary

不要把程式碼逐行翻譯成中文。
