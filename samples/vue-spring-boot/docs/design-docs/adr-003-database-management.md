# ADR-003：Database Schema Management

## Status

Accepted

## Context

公司規範要求每次正式 Database Schema 異動都需填單、審核並由授權人員人工執行。教學版以 SQLite 提供 Local Standalone 驗證。

## Decision

- 不使用 Flyway / Liquibase。
- 只有 Local Profile 可用 `database/CURRENT_SCHEMA.sql` 初始化 SQLite Sample Schema / Data。
- 非 Local 環境不執行 DDL；正式系統仍採人工 Schema 變更流程。
- `database/CURRENT_SCHEMA.sql` 保存目前教學版最新版 SQLite Schema；正式系統須替換為已核准的 Schema。
- Git 不保存 migration chain。
- Schema Change History 由公司的正式變更管理流程保存。

## Consequence

優點：

- 完全符合現有治理流程。
- 非 Local 部署不具備自動改正式 DB 的能力。

風險：

- Repo 與正式 DB 可能產生 schema drift。

控制：

- DB 異動完成條件必須包含同步更新 `CURRENT_SCHEMA.sql`。
