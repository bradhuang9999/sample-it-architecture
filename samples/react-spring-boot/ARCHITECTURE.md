# ARCHITECTURE.md

本文件是系統的頂層地圖。它保持簡短，讓人與 Coding Agent 能快速找到正確邊界；更深的設計理由放在 `docs/`。

## 系統形態

- 產品：WUT1 IT Application Template - React
- 類型：公司 IT 正式應用教學模板
- Runtime：Spring Boot executable JAR + Embedded Tomcat
- Frontend：React SPA，由 Vite Build 成 static assets 後打包進 JAR
- Backend：Spring Boot 4 Modular Monolith
- Database：SQLite（Local Standalone）
- 產品行為真相來源：`docs/product-specs/`
- Database 結構真相來源：`database/CURRENT_SCHEMA.sql`

## Business Domain Map

| Domain | 負責內容 | Backend | Frontend | Spec |
| --- | --- | --- | --- | --- |
| Product Trading | Product Master、Trading Detail、Dashboard、Drill-down | `producttrading` | `features/product-trading` | `docs/product-specs/` |
| Shared | Error、共用設定、橫切能力 | `shared` | `shared` | 架構文件 |

目前只有一個 Business Feature。新增功能時，優先建立新的 Business Feature，而不是把程式堆進 `shared`。

## Backend 分層

每個 Business Module 使用固定方向：

```text
api
 ↓
application
 ↓
domain
 ↑
infrastructure
```

規則：

- `api` 可以呼叫 `application`。
- `application` 負責 Use Case / Transaction / Business Rule orchestration。
- `domain` 不依賴 Web / Database framework。
- `infrastructure` 實作 Repository 與外部系統 Adapter。
- Controller 不得直接存取 Database。
- SQL 只能出現在 `infrastructure/persistence` 或明確的 Data Adapter。
- Spring Modulith Test 驗證 Application Module Boundary。

## Frontend 分層

```text
app
 │
 ▼
features/<business-feature>
 │
 ▼
shared
```

Feature 內：

```text
Page
 ├─ Feature Components
 ├─ Query / Mutation Hooks
 ├─ Feature API
 └─ Feature Model
```

規則：

- 以 Business Feature 分目錄，不以全域 `components/services/utils` 技術類別堆疊。
- `shared` 不得 import Business Feature。
- Business Feature 不直接 import 另一個 Feature 的 internal implementation。
- Server State 使用 TanStack Query。
- Local UI State 使用 React `useState`。
- 可分享、可 Bookmark 的查詢條件優先使用 URL。
- 未經 ADR 不加入 Redux / Zustand。
- HTTP 存取統一透過 Feature API 與 `shared/api`。
- ECharts lifecycle 統一封裝在 `shared/chart/EChart.tsx`。

## Database Boundary

Local Standalone：

```text
Spring Boot
    │
    │ JdbcClient
    ▼
SQLite File
./data/wut1-sample.db
```

Local Profile 啟動時可以建立 Sample Schema / Data，目的是讓教學專案不依賴外部 Database Server。

這個便利機制**不得直接推論為 Production Database 策略**。未來接公司正式 Database 時：

- 不使用 Flyway / Liquibase。
- 正式 Schema 仍依公司人工 DB Change 流程治理。
- Repo 只保留當下最新版 `CURRENT_SCHEMA.sql`，不保留 migration chain。

## Optimistic Concurrency

SQLite Sample 使用：

```text
ROW_VERSION INTEGER
```

每次 Update：

```text
WHERE ROW_VERSION = expected
SET ROW_VERSION = ROW_VERSION + 1
```

不符合時 Update Row Count = 0，Backend 回 HTTP 409，避免 silent overwrite。

## Hard Rules

- Business Rule 必須在可測試的 Application / Domain 層，不放在 React Component 或 SQL 結果加工的隱性邏輯。
- Frontend 不重算正式 Business Rule。
- `TRADE_AMOUNT` 由 Backend 計算。
- Shared 不得演變成 Business Logic 垃圾桶。
- 新依賴必須有明確問題與理由。
- 不使用 Microservices、GraphQL、Redux、Zustand、Next.js、JPA 等額外複雜度，除非未來 ADR 明確核准。

## 變更檢查

當 Architecture Boundary 改變：

1. 更新本文件。
2. 將設計理由寫入 `docs/design-docs/`。
3. 可機械驗證的規則，補成 Test / Lint / Build Gate。
