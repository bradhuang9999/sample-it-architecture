# Agent Progress

## Current state

- React 版教學模板已由既有 Vue 版轉換完成。
- Backend / SQLite / API / Business Rule 保持不變。
- Frontend 改為 React 19 + TypeScript + Vite + React Router + TanStack Query。
- Master / Detail 與 Dashboard / Drill-down 仍維持相同行為與 Playwright selector。
- React State 已收斂成：Server State / Local UI State / URL State 三類。
- No migration framework；正式企業 DB 仍採人工變更治理。
- Chinese-first documentation / comments applied.

## Pending environment verification

仍需在可連 approved Maven / npm Repository 的環境完成：

- Real Maven dependency resolution and `clean package`.
- Real npm install / TypeScript typecheck / ESLint / Vite build.
- Spring Boot executable JAR runtime smoke test.
- Playwright E2E.
- Company Keycloak / CI integration review.

## Next

- IT team比較 React 與 Vue 版本的可讀性、Agent 修改邊界與 Review 成本。
- Review React Folder Structure、TanStack Query Golden Path，以及是否需要進一步加 Import Boundary Lint。
- Review 後修正 findings，再建立第一份正式 `frontend/package-lock.json`。
