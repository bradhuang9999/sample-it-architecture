# 001 Initial Sample Application

## Goal

建立可供公司 IT 教學與 Agent 協作的完整 Sample Application，並可在單機環境直接驗證。

## Scope

- SQLite Current Schema + Sample Data
- Product / Trading Master Detail
- ECharts Dashboard
- Drill-down
- Spring Modulith boundary
- React + TypeScript + TanStack Query
- Harness documentation
- Verification scripts

## Out of Scope

- 公司正式 Keycloak Client 設定
- Production CI/CD pipeline
- 真實 Business Data
- Production Database Adapter
- Database migration automation

## Implementation

- [x] Repository Harness 結構
- [x] SQLite Database Schema / Sample Data
- [x] Backend API / Service / Repository
- [x] Frontend Master Detail
- [x] Dashboard / Drill-down
- [x] Unit / Architecture / E2E test source
- [x] Local DB 不依賴外部 Database Server
- [ ] 公司 Keycloak 整合 review

## Verification

產出 ZIP 前至少執行：

```text
SQLite schema / sample data smoke test
Frontend source verification
Backend source verification
```

在可存取 Maven / npm Repository 的環境再執行：

```text
Frontend typecheck
Frontend lint
Frontend build
Backend compile
Backend unit tests
Spring Modulith architecture verification
Playwright E2E
```

## Decisions

- Spring Boot executable JAR
- SQLite for Local Standalone
- No Flyway / Liquibase
- Repo only keeps current schema
- Chinese-first documentation / comments

## Current Verification Evidence

見 `docs/generated/verification-2026-09-25.md`。
