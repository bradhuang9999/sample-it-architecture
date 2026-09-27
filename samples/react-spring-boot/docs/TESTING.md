# Testing 規範

## 驗證層級

### 1. Compiler / Type

- Java Compiler
- TypeScript `tsc --noEmit`

先用型別擋掉低成本錯誤。

### 2. Lint

Frontend 使用 ESLint。

### 3. Unit Test

Business Rule 與 Application Service 必須能在不啟動完整 Server 的情況下驗證。

Sample 重點：

- `TRADE_AMOUNT = QUANTITY × UNIT_PRICE`
- Product / Trading not found
- Optimistic concurrency conflict

### 4. Architecture Test

Spring Modulith：

```java
ApplicationModules.of(SampleApplication.class).verify();
```

確保 Business Module 不形成 cycle，且沒有不允許的跨模組依賴。

### 5. SQLite Integration / Smoke Test

本 Template 的 Local Profile 使用 SQLite，因此完整驗證不需要外部 Database Server。

目標至少驗證：

- `CURRENT_SCHEMA.sql` 可建立乾淨 SQLite Database。
- `LOCAL_SAMPLE_DATA.sql` 可載入 Sample Data。
- Product / Trading Query 正常。
- Trading Create / Update / Delete 正常。
- `ROW_VERSION` conflict 可被偵測。
- Dashboard Aggregate / Monthly Drill-down Query 正常。

Local SQLite 自動初始化只供教學與測試；正式 Database 不因此取得自動 DDL 權限。

### 6. E2E

Playwright 驗證：

- Master / Detail 可以載入與切換。
- Dashboard 可以點擊 Product 後 Drill-down。

完整 executable JAR 啟動後即可使用同一個 SQLite Sample Database 執行 E2E。

## 完成證據

「Agent 說測過」不是證據。Execution Plan / PR 應保留實際 command 與結果。

## Frontend Dependency Lock

正式專案應提交 `frontend/package-lock.json`；CI 在 lock file 建立後應使用 `npm ci`。
