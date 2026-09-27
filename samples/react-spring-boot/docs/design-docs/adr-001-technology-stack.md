# ADR-001：Technology Stack

## Status

Accepted

## Context

本 Repository 是公司 IT 正式應用教學模板，需要同時滿足：

- Coding Agent 容易理解並修改。
- 人員可以用固定結構 Review。
- UI 能支援 Master / Detail、Dashboard、Drill-down。
- Backend 維持既有 Java / Spring Boot 能力。
- Local 可以 Standalone 驗證。
- Production Runtime 不增加 Node.js Server。

## Decision

Backend：

- Java 25
- Spring Boot 4
- Spring MVC
- Spring JDBC `JdbcClient`
- Spring Modulith
- executable JAR + Embedded Tomcat

Frontend：

- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- Bootstrap 5
- Apache ECharts

Database：

- SQLite Local Standalone
- 正式企業 Database 仍依公司人工變更流程治理

## Rationale

- React 生態成熟，但自由度高，因此 Repository 必須用 Feature Boundary、State 分類與 Lint 主動收斂。
- TypeScript 提供編譯期 Guardrail，降低 Agent 產生大量程式後人工逐行 Review 的負擔。
- TanStack Query 專責 Server State，避免每個頁面自行組合 `useEffect + fetch + loading + error + cache`。
- Vite 只負責 Frontend 開發與 Build；正式 Runtime 不需要 Node.js。
- Spring Boot 仍是 Enterprise Capability / Business Rule 的主要 Runtime。
- SQLite 只作為 Local Standalone 教學資料庫。

## Not Chosen by Default

- Next.js / Remix / React Server Components
- Redux / Zustand
- Tailwind
- GraphQL
- Micro Frontend
- JPA
- Flyway / Liquibase

上述技術不是禁止永久使用；需要時必須先以 ADR 說明問題、收益與新增複雜度。
