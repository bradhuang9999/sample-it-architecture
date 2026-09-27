# ADR-003：Database Schema Management

## Status

Accepted

## Context

公司規範要求每次正式 Database Schema 異動都需填單、審核並由授權人員人工執行；同時本教學模板需要能夠在工程師電腦上快速 standalone 驗證。

## Decision

### Local 教學環境

- 使用 SQLite File Database。
- Local Profile 可自動執行 `CURRENT_SCHEMA.sql` 與 `LOCAL_SAMPLE_DATA.sql`。
- 不需要 SQL Server、Docker 或 Database 帳密。

### 正式企業環境

- 不使用 Flyway / Liquibase。
- Application 不執行正式環境 DDL。
- Repo 只保存目前核准的最新 Schema。
- Git 不保存 migration chain。
- Schema Change History 由公司的正式變更管理流程保存。

## Consequence

優點：

- 教學 / Review 啟動成本低。
- Local E2E 不依賴外部 Database Server。
- Production Governance 仍維持人工控制。

風險：

- SQLite 與未來正式 Database 的 SQL Dialect 不完全相同。
- 若正式系統切換 Database，需要重新驗證 Repository SQL 與型別行為。

控制：

- SQL 集中於 `infrastructure/persistence`，避免 Dialect 滲透 Business Layer。
- `CURRENT_SCHEMA.sql` 永遠只有一份，切正式 Database 時以正式版本取代，不維護雙份正式 Schema。
