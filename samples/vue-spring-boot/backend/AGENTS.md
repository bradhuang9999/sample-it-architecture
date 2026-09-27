# Backend AGENTS.md

本檔只補充 Backend 規則；Root `AGENTS.md` 仍然有效。

## 技術

- Java 25
- Spring Boot 4
- Spring MVC
- Spring JDBC `JdbcClient`
- Spring Modulith
- SQLite（Local Standalone）

## Feature 結構

```text
<feature>/
├─ api/
├─ application/
├─ domain/
└─ infrastructure/
```

## 依賴規則

- Controller 不直接呼叫 `JdbcClient`。
- `api` 呼叫 `application`。
- `application` 負責 Transaction 與 Use Case。
- `domain` 不依賴 Web / JDBC。
- `infrastructure` 實作 Repository。
- SQL 只放在 `infrastructure/persistence`。
- 跨 Business Module 呼叫只能透過對方公開 API package 或明確 interface。

## SQL / Database

- 不使用 JPA。
- 不使用 Flyway / Liquibase。
- 只有 local profile 可初始化 SQLite Sample Schema / Data；非 Local 環境不自動執行 DDL。
- 只依 `database/CURRENT_SCHEMA.sql` 開發。
- 全部 Query 使用參數。
- 禁止 `SELECT *`。
- Dashboard Aggregate 優先用 SQL set-based operation。

## Business Rule

- 正式 Business Rule 不放 Controller。
- 正式 Business Rule 不交給 Frontend 重算。
- 本 Sample 的 `TRADE_AMOUNT` 只能由 Backend 計算。

## Error

- 404：資源不存在。
- 409：Optimistic Concurrency / State Conflict。
- 400：Validation。
- 500：不可將 Stack Trace 直接回傳 Client。

## 註解

繁體中文優先，只解釋設計意圖、Business Rule、邊界或非直覺行為。
