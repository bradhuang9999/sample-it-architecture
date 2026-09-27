# WUT1 IT Application Template - React

公司 IT 正式應用的教學模板，示範如何在 **AI 撰寫（AI Write）+ 人工審查（Human Review）+ 自動驗證（Machine Verification）** 的開發模式下，維持清楚的 Business Feature 邊界與可長期維護的技術結構。

本版本把原先 Vue Frontend 改成 **React Golden Path**，Backend、SQLite Schema、API 與 Business Rule 保持相同，用來直接比較兩種 Frontend 架構的可讀性與治理方式。

技術：

- Backend：Spring Boot 4.1.1、Spring MVC、Spring JDBC `JdbcClient`、Spring Modulith
- Frontend：React 19、TypeScript、Vite、React Router、TanStack Query、Bootstrap 5、Apache ECharts
- Database：SQLite（Local Standalone，單一 DB File）
- Packaging：Spring Boot executable JAR（Embedded Tomcat）
- Testing：JUnit、Spring Modulith verification、TypeScript type check、ESLint、Playwright E2E
- Agent Harness：`AGENTS.md`、`ARCHITECTURE.md`、Product Spec、Execution Plan、Quality Score

> 本專案是教學模板，不是特定業務系統。Sample Table 與 Sample Data 都是為了示範 Master / Detail、Dashboard 與 Drill-down。

## 1. React Golden Path

本 Template 不讓 Developer / Agent 自行選擇不同 React Architecture。

固定原則：

```text
app
 │
 ▼
features
 │
 ▼
shared
```

State：

```text
Server State   → TanStack Query
Local UI State → React useState
Shareable State → URL
```

未經 ADR，不加入 Redux、Zustand、Next.js 或其他 State / Meta Framework。

## 2. 兩個示範畫面

### Master / Detail

React Route：`/master-detail`

實際瀏覽器網址（Hash Router）：`/#/master-detail`

- 上半部：`SAMPLE_PROD` Master Form
- 下半部：`SAMPLE_TRADING` Detail Grid
- 可切換 Product
- 可修改 Product
- 可新增、修改、刪除 Trading
- Server State 由 TanStack Query 管理
- `TRADE_AMOUNT` 由 Backend 依 `QUANTITY × UNIT_PRICE` 計算，不接受 Frontend 自行指定

### Dashboard

React Route：`/dashboard`

實際瀏覽器網址（Hash Router）：`/#/dashboard`

- KPI：Product 數量、Trading 筆數、Trading Amount
- ECharts 顯示 Product Trading Amount
- 點擊 Product Bar 後 Drill-down
- 單一 `selectedProdId` 同時驅動月別 Chart 與明細 Grid
- Drill-down API Data 屬於 Server State，交給 TanStack Query

## 3. 執行架構

開發時：

```text
Browser
  │
  ▼
Vite :5173
  │
  │ /api proxy
  ▼
Spring Boot :8080
  │
  ▼
SQLite ./data/wut1-sample.db
```

完整 Build 後：

```text
React / TypeScript
      │
      ▼
 Vite build
      │
      ▼
HTML / JS / CSS
      │
      ▼
Spring Boot executable JAR
      │
      ├─ Embedded Tomcat
      └─ SQLite File
```

Local Standalone 只需啟動：

```bash
java -jar backend/target/wut1-it-app-template.jar
```

不需要另外啟動 SQL Server、Docker、Vite Server 或 Node.js Runtime。

## 4. SQLite Local Standalone

第一次啟動時，Application 會在 Local Profile：

1. 建立 `data/wut1-sample.db`。
2. 依 `database/CURRENT_SCHEMA.sql` 建立 Sample Table / Index。
3. 依 `database/LOCAL_SAMPLE_DATA.sql` 放入 Sample Data。
4. Sample Data 使用 `INSERT OR IGNORE`，重啟不會重複新增。

這是**教學與 Local Standalone 的例外**。未來連接公司正式 Database 時，Schema 仍應依公司 DB Change Request 流程由人員治理，不應把 Local 自動初始化做法直接搬到 Production。

若要重置 Local DB：

Windows：

```powershell
.\scripts\reset-local-db.ps1
```

Linux / macOS：

```bash
./scripts/reset-local-db.sh
```

## 5. Database 原則

本專案 **不使用 Flyway / Liquibase**。

- `database/CURRENT_SCHEMA.sql`：目前專案最新版 Schema。
- `database/LOCAL_SAMPLE_DATA.sql`：Local 教學資料。
- Repo 不保存 `V001`、`V002` 等 Migration Chain。
- Table / Column / Constraint / Index 使用英文全大寫。
- `ROW_VERSION` 使用遞增整數示範 Optimistic Concurrency。
- 正式企業 Database 的 Schema Change 仍須走人工填單、審核、執行流程。

## 6. 開始前先閱讀

人工開發與 Coding Agent 都應依序閱讀：

1. `AGENTS.md`
2. `ARCHITECTURE.md`
3. `docs/product-specs/`
4. `docs/FRONTEND.md`
5. `docs/QUALITY_SCORE.md`
6. `docs/PLANS.md`
7. `docs/REVIEW_GUIDE.md`

本 Repo 的文件結構參考 Walking Labs 的 Harness Engineering OpenAI Advanced Repo Template，並依公司 Java / React / SQLite 開發情境重新整理。

參考：
https://github.com/walkinglabs/learn-harness-engineering/tree/main/docs/zh-TW/resources/openai-advanced/repo-template

## 7. 必要環境

建議：

- JDK 25
- Maven 3.9+
- Node.js 22.16+（Frontend 開發 / Build）
- npm 10.9+

**不需要安裝 Database Server。** SQLite JDBC 會直接使用本機 DB File。

Maven Build 會使用 `frontend-maven-plugin` 安裝固定 Node / npm 版本，所以 CI 不需要預先配置全域 Node.js。

## 8. Local Backend

```bash
./mvnw -pl backend spring-boot:run -Dskip.frontend=true -Dspring-boot.run.profiles=local
```

Windows：

```powershell
.\mvnw.cmd -pl backend spring-boot:run -Dskip.frontend=true -Dspring-boot.run.profiles=local
```

若要改 SQLite File 路徑：

```text
SQLITE_DB_PATH=./data/another.db
```

## 9. Local Frontend

```bash
cd frontend
npm install --no-audit --no-fund
npm run dev
```

瀏覽：

```text
http://localhost:5173
```

Vite 會將 `/api` 轉送到 `http://localhost:8080`。

## 10. Build executable JAR

在 Repo Root：

```bash
./mvnw clean package
```

Build 會：

1. 安裝固定版本 Node / npm。
2. 執行 React / TypeScript Frontend build。
3. 將 `frontend/dist` 複製進 Spring Boot static resources。
4. 將 SQLite Schema / Sample Data 複製進 JAR classpath。
5. 編譯 Backend。
6. 執行 Backend tests 與架構驗證。
7. 產生 executable JAR。

輸出：

```text
backend/target/wut1-it-app-template.jar
```

完整 Standalone：

```bash
java -jar backend/target/wut1-it-app-template.jar
```

## 11. 驗證

Windows：

```powershell
.\scripts\verify.ps1
```

Linux / macOS：

```bash
./scripts/verify.sh
```

Frontend 完成條件包含：

```bash
npm run typecheck
npm run lint
npm run build
```

UI 行為變更時再執行 Playwright。

## 12. 語言規範

- 文件：繁體中文優先。
- 程式註解：繁體中文優先，只寫「為什麼」與 Business Rule，不寫無資訊量的逐行翻譯。
- Java / TypeScript Class、Method、Variable：英文。
- Database Table / Column / Constraint / Index：英文全大寫。
- Framework / API 等標準技術名詞保留英文。
