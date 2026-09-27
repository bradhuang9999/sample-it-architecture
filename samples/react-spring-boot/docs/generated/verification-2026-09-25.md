# Verification Evidence — 2026-09-25

本檔記錄目前 Artifact 實際完成的驗證，避免把「已撰寫」誤當成「已完整 Build」。

## 已完成

- `pom.xml` / `backend/pom.xml` XML parse：通過。
- `feature_list.json` / `frontend/package.json` / `frontend/tsconfig.json` JSON parse：通過。
- React / TypeScript Source 使用 TypeScript parser 檢查 `.ts` / `.tsx` syntax：0 個 parse diagnostic。
- Frontend relative import path 靜態檢查：0 個 unresolved relative import。
- React 版本中已無 `.vue` source。
- Backend 與 Database 目錄和原 SQLite 版本逐檔 SHA-256 比對：0 個差異。
- SQLite `CURRENT_SCHEMA.sql`：建立乾淨 in-memory Database：通過。
- SQLite `LOCAL_SAMPLE_DATA.sql`：載入 5 筆 Product / 18 筆 Trading：通過。
- Dashboard Sample Total Amount：306550：通過。
- Master / Detail 與 Dashboard Playwright spec 保留原 route 與 `data-testid` contract。

## React Architecture 檢查

- React 19 + TypeScript + Vite。
- React Router 使用 Hash Router，Standalone JAR 不需要另外設定 SPA fallback。
- Server State 統一使用 TanStack Query。
- Local UI State 使用 `useState`。
- 未加入 Redux / Zustand。
- Component 不直接散落 `fetch()`；HTTP 行為仍由 Feature API 與 `shared/api` 管理。
- ECharts lifecycle 集中於 `shared/chart/EChart.tsx`。
- Backend Business Rule 與 API Contract 未因 Vue → React 轉換而改動。

## 本執行環境尚未完成

本執行環境執行 `npm install` 時因外部 Registry 連線等待逾時，未取得完整 Frontend dependency；因此下列命令仍需在可連公司 Artifact Repository 或公開 Registry 的環境實際執行：

```text
npm install --no-audit --no-fund
npm run typecheck
npm run lint
npm run build
./mvnw clean package
java -jar backend/target/wut1-it-app-template.jar
npm run e2e
```

未完成上述 Runtime Verification 前，不宣稱完整 Build / E2E 已通過。

## Review 建議

第一輪請優先 Review：

1. `app → features → shared` 的 React Folder Boundary 是否容易理解。
2. Server State / Local UI State / URL State 三分法是否適合作為公司規範。
3. TanStack Query 是否讓 React 版比手寫 `useEffect + fetch` 更容易 Review。
4. Master / Detail 的 Form / Grid 是否仍容易讓既有 JSP 工程師理解。
5. Dashboard Drill-down 是否清楚呈現單一 `selectedProdId` 驅動多個查詢結果。
6. `frontend/AGENTS.md` 是否足以限制 Coding Agent 自行增加 Redux / Zustand / Next.js 等額外複雜度。
