# ADR-003：SQLite Local Standalone

## Decision

Local Citizen Template 使用 SQLite File。

## Rationale

- 不需要 Database Server。
- Agent / Citizen 可以快速驗證。
- Test 可以建立 temporary DB。

## Boundary

公司核心資料仍由 Enterprise API 提供，SQLite 不代表 Citizen 可以自行複製正式核心 Database。
