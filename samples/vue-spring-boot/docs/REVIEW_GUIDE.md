# 第一輪 Review Guide

這個版本的目的不是證明所有公司標準都已定案，而是提供一個可以被具體 Review 的 Golden Path 候選。

建議依下列順序 Review。

## 1. Business Feature 結構

先看：

- `ARCHITECTURE.md`
- `backend/src/main/java/com/example/wut1sample/producttrading/`
- `frontend/src/features/product-trading/`

確認：

- 是否接受以 Business Feature 為第一層，而不是全域 `controller/service/repository`。
- `api -> application -> domain` 的方向是否符合公司習慣。
- `infrastructure` 是否清楚限制 DB / 外部 Adapter。

## 2. Database Governance

先看：

- `database/CURRENT_SCHEMA.sql`
- `database/README.md`
- `docs/DATABASE.md`

確認：

- Repo 只保留目前最新版正式 Schema，是否符合既有變更流程。
- Application 無 DDL / Flyway / Liquibase，是否符合公司要求。
- Table / Column / Constraint / Index 全大寫的命名是否合適。

## 3. Master / Detail 畫面

先看：

- `ProductTradingPage.vue`
- `ProductMasterForm.vue`
- `TradingDetailGrid.vue`
- `ProductTradingController.java`

確認：

- 上層 Form、下層 Grid 是否接近既有 JSP 使用者的操作習慣。
- `ROW_VERSION` Optimistic Concurrency 是否適合作為公司預設範例。
- `TRADE_AMOUNT` 只由 Backend 計算的 Rule 是否清楚。

## 4. Dashboard / Drill-down

先看：

- `ProductTradingDashboardPage.vue`
- `ProductSummaryChart.vue`
- `TradingDrilldownChart.vue`
- `ProductTradingDashboardService.java`

確認：

- Page 擁有唯一 `selectedProduct` State 是否容易理解。
- 點擊 ECharts 後，同一份 State 驅動 Chart + Grid 的做法是否適合拿來教 JSP 工程師。
- Aggregate 放 Database 執行是否符合公司 Dashboard 查詢習慣。

## 5. Agent Harness

先看：

- `AGENTS.md`
- `backend/AGENTS.md`
- `frontend/AGENTS.md`
- `docs/product-specs/`
- `docs/exec-plans/`
- `docs/QUALITY_SCORE.md`

確認：

- Agent 規則是否太多或太少。
- 人是否能在不逐行閱讀所有程式的情況下，先 Review Spec、Boundary、Verification Evidence。
- 哪些 Review 規則應進一步機械化成 Test / Lint / CI Gate。

## 6. 本版刻意未完成的項目

以下不是遺漏，而是留給公司標準確認後再導入：

- 公司 Keycloak / OIDC 正式整合。
- OpenAPI code generation；目前 Java DTO 與 TypeScript type 都是明確定義，但尚未自動同步。
- 公司 CI / Security Scan / Artifact Repository 整合。
- 正式 Database Adapter 與 Playwright Runtime Test。

實際已完成與尚未完成的驗證，請看 `docs/generated/verification-2026-09-25.md`。
