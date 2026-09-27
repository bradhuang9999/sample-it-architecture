# 001 Initial Sample Application

## Goal

建立可供公司 IT 教學與 Agent 協作的完整 Sample Application。

## Scope

- SQLite Current Schema（與 React、Citizen Sample 一致）
- Product / Trading Master Detail
- ECharts Dashboard
- Drill-down
- Spring Modulith boundary
- Vue + TypeScript
- Harness documentation
- Verification scripts

## Out of Scope

- 公司正式 Keycloak Client 設定
- Production CI/CD pipeline
- 真實 Business Data
- Database migration automation

## Implementation

- [x] Repository Harness 結構
- [x] Database Schema
- [x] Backend API / Service / Repository
- [x] Frontend Master Detail
- [x] Dashboard / Drill-down
- [x] Unit / Architecture / E2E test source
- [ ] Local SQLite Integration Test 與 Browser E2E 實跑
- [ ] 公司 Keycloak 整合 review

## Verification

產出 ZIP 前應至少執行：

```text
Frontend typecheck
Frontend lint
Frontend build
Backend compile
Backend unit tests
Spring Modulith architecture verification
```

Browser E2E 需要先啟動 Local Standalone JAR。

## Decisions

- Spring Boot executable JAR
- No Flyway / Liquibase
- Repo only keeps current approved schema
- Chinese-first documentation / comments

## Current Verification Evidence

原始 Source-level checks 記於 `docs/generated/verification-2026-09-25.md`；SQLite 轉換後需重新執行 Maven Test、JAR Smoke Test 與 Playwright。
