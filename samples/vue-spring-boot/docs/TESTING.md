# Testing 規範

## 驗證層級

### 1. Compiler / Type

- Java Compiler
- TypeScript `vue-tsc`

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

### 5. Integration

Local Profile 的 SQLite Integration Test 應驗證 Schema、Sample Data 與 Dashboard Aggregate。

正式 Application 不因測試需要而自動修改 DB。

### 6. E2E

Playwright 驗證：

- Master / Detail 可以載入與切換。
- Dashboard 可以點擊 Product 後 Drill-down。

E2E 需要已啟動的 Backend 與可使用的 Sample Database。

## 完成證據

「Agent 說測過」不是證據。Execution Plan / PR 應保留實際 command 與結果。

## Frontend Dependency Lock

正式專案應提交 `frontend/package-lock.json`；CI 在 lock file 建立後應使用 `npm ci`。
