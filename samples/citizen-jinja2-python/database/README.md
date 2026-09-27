# Database

本 Citizen Template 使用 SQLite，目的是讓 Local Standalone 驗證不依賴 Database Server。

- `CURRENT_SCHEMA.sql`：目前最新版 Local Schema。
- `LOCAL_SAMPLE_DATA.sql`：教學 Sample Data。
- 不保留 Migration Chain。
- 不使用 Flyway / Liquibase。

## Citizen 邊界

SQLite 只用於這個 Citizen App 自己擁有的小型資料或 Local Prototype。

Citizen App **不得直接存取公司核心 Oracle / SQL Server Database**。需要核心資料時，應使用公司核准的 Enterprise API / SDK。
