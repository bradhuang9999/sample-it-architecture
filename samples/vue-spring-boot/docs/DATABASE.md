# Database 設計與治理

## 目前教學版選擇：SQLite

本 Template 目前使用 SQLite，主要目的不是把 SQLite 定為公司正式 Database 標準，而是讓工程師可以：

```text
Clone / 解壓專案
    ↓
Build
    ↓
java -jar
    ↓
直接驗證完整 Master / Detail + Dashboard
```

不需要先安裝 SQL Server、建立 Database、設定帳密或啟動 Container。

## Current Schema

`database/CURRENT_SCHEMA.sql` 是目前專案唯一 Schema 來源：

- 只保留最新版。
- 不保存 `V001`、`V002` Migration Chain。
- 不使用 Flyway / Liquibase。
- Build 時會複製到 JAR classpath，供 Local Profile 初始化 SQLite。

## Local Profile 例外

Local Profile 允許 Spring Boot SQL Init 建立 SQLite Sample Schema / Sample Data。

這是為了教學與 standalone verification；**不代表 Production Application 可以自動執行 DDL**。

## 正式 Database Governance

正式系統仍遵循公司流程：

1. 提出 Schema Change。
2. 填寫 DB 異動單。
3. 人工審核。
4. 授權人員人工執行。
5. 驗證完成後更新正式專案的 `CURRENT_SCHEMA.sql`。

若正式 Database 改為 SQL Server，應以 SQL Server 的真實最新版 Schema 取代 SQLite `CURRENT_SCHEMA.sql`，而不是保留雙份互相漂移的正式 Schema。

## SQL 原則

- 使用參數化 SQL。
- 禁止字串拼接使用者輸入。
- 查詢只 SELECT 必要欄位，避免 `SELECT *`。
- SQL 放在 Feature 的 `infrastructure/persistence`。
- Dashboard Aggregate 優先讓 Database 做 set-based aggregation，不把大量明細拉回 Java 再加總。

## Transaction

Write Use Case 由 Application Service 控制 Transaction Boundary。

SQLite Local Profile 將 Hikari pool 限制為單一 Connection，降低單檔 Database 的 Write Lock 複雜度。

## Optimistic Concurrency

Sample Table 使用：

```text
ROW_VERSION INTEGER NOT NULL DEFAULT 1
```

Update 同時：

```sql
SET ROW_VERSION = ROW_VERSION + 1
WHERE ...
  AND ROW_VERSION = :expectedRowVersion
```

若 Row Count = 0，Backend 回 HTTP 409，避免 last-write-wins 靜默覆蓋。

API 仍把 `rowVersion` 當字串傳遞，避免 Frontend 與特定 Database 型別耦合。

## Sample Currency Rule

本教學 Schema 將 `CURRENCY_CODE` 限定為 `TWD`，因為 Dashboard 直接加總 `TRADE_AMOUNT`。真實多幣別系統若要彙總金額，必須先定義基準幣別、匯率來源與換算時點；不可直接跨幣別相加。
