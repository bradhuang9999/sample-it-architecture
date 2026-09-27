# WUT1 IT Application Template

公司 IT 正式應用的教學模板，示範如何在 **AI 撰寫（AI Write）+ 人工審查（Human Review）+ 自動驗證（Machine Verification）** 的開發模式下，維持清楚的 Business Feature 邊界與可長期維護的技術結構。

本專案刻意使用少量、穩定且容易理解的技術：

- Backend：Spring Boot 4.1.1、Spring MVC、Spring JDBC `JdbcClient`、Spring Modulith
- Frontend：Vue 3、TypeScript、Vite、Bootstrap 5、Apache ECharts
- Database：SQLite（Local Standalone）
- Packaging：Spring Boot executable JAR（Embedded Tomcat）
- Testing：JUnit、Spring Modulith verification、Vue type check、ESLint、Playwright E2E
- Agent Harness：`AGENTS.md`、`ARCHITECTURE.md`、Product Spec、Execution Plan、Quality Score

> 本專案是教學模板，不是特定業務系統。Sample Table 與 Sample Data 都是為了示範 Master / Detail、Dashboard 與 Drill-down。

## 1. 兩個示範畫面

### Master / Detail

Vue Route：`/master-detail`

實際瀏覽器網址（Hash Router）：`/#/master-detail`

- 上半部：`SAMPLE_PROD` Master Form
- 下半部：`SAMPLE_TRADING` Detail Grid
- 可切換 Product
- 可修改 Product
- 可新增、修改、刪除 Trading
- `TRADE_AMOUNT` 由 Backend 依 `QUANTITY × UNIT_PRICE` 計算，不接受 Frontend 自行指定

### Dashboard

Vue Route：`/dashboard`

實際瀏覽器網址（Hash Router）：`/#/dashboard`

- KPI：Product 數量、Trading 筆數、Trading Amount
- ECharts 顯示 Product Trading Amount
- 點擊 Product Bar 後 Drill-down
- Drill-down 顯示月別趨勢與明細 Grid

## 2. 執行架構

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

正式 Build：

```text
Vue / TypeScript
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
      ▼
Embedded Tomcat
```

Local Standalone 執行：

```bash
./scripts/run-local.sh
```

Windows 使用 `scripts/run-local.ps1`。執行時由腳本指定 `local` profile；Runtime 不需要 Vite Server 或 Node.js。

## 3. Database 原則

本專案 **不使用 Flyway / Liquibase**。

Local Profile 會使用 `database/CURRENT_SCHEMA.sql` 建立 SQLite Sample Table，並載入 `database/LOCAL_SAMPLE_DATA.sql`。重啟不會重複新增資料；需重置時使用 `scripts/reset-local-db.*`。

正式系統的 Database Schema 仍由人工變更流程治理：

1. 系統需求提出 Schema Change。
2. 依公司規範填寫 DB 異動單。
3. 由授權人員人工審核及執行。
4. 正式 Schema 完成後，更新 `database/CURRENT_SCHEMA.sql`。
5. Repository 只保存目前核准的最新 Schema，不保存 migration chain。

`database/CURRENT_SCHEMA.sql` 是目前教學版 SQLite Schema。未來正式系統如採其他 Database，應替換為該系統已核准的最新版 Schema。

只有 Local Profile 會初始化 SQLite；非 Local 環境不會在啟動時執行 DDL。

`database/LOCAL_SAMPLE_DATA.sql` 只提供本機教學資料，不代表正式資料。

## 4. 開始前先閱讀

人工開發與 Coding Agent 都應依序閱讀：

1. `AGENTS.md`
2. `ARCHITECTURE.md`
3. `docs/product-specs/`
4. `docs/QUALITY_SCORE.md`
5. `docs/PLANS.md`
6. `docs/REVIEW_GUIDE.md`（第一輪 Review 建議）

本 Repo 的文件結構參考 Walking Labs 的 Harness Engineering OpenAI Advanced Repo Template，並依公司 Java / Vue / SQLite 教學情境重新整理。

參考：
https://github.com/walkinglabs/learn-harness-engineering/tree/main/docs/zh-TW/resources/openai-advanced/repo-template

## 5. 必要環境

建議：

- JDK 25
- Maven 3.9+
- Node.js 22.16+（只用於 Frontend 開發 / Build）
- npm 10.9+

不需要安裝 Database Server。SQLite JDBC 直接使用本機 DB File。

Maven Build 會使用 `frontend-maven-plugin` 安裝固定 Node / npm 版本，所以 CI 不需要預先配置全域 Node.js。

## 6. Database 初始化

執行 Local Profile 時，Application 會在 `./data/wut1-sample.db` 建立 SQLite Sample Schema 與資料。`CURRENT_SCHEMA.sql` 與 `LOCAL_SAMPLE_DATA.sql` 和 React、Citizen 範本相同。

## 7. Local Backend

Windows 可直接執行：

```powershell
.\scripts\dev-backend.ps1
```

Linux / macOS 先建立 `data/` 目錄，再執行：

```bash
mkdir -p data
SPRING_PROFILES_ACTIVE=local ./mvnw -pl backend spring-boot:run -Dskip.frontend=true
```

完整 Build 後也可執行 `scripts/run-local.*`。可用 `SQLITE_DB_PATH` 指定其他 SQLite 檔案；若路徑含新目錄，請先建立該目錄。非 Local 環境需明確設定 `DB_URL` 與 `APP_DEFAULT_USER`，且不會自動執行 Schema DDL。

## 8. Local Frontend

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

> 第一次安裝完成後會產生 `frontend/package-lock.json`。正式建立公司專案時，應將 lock file 一併提交 Git；後續 CI 建議改用 `npm ci`，確保 transitive dependency 可重現。

## 9. Build executable JAR

在 Repo Root：

```bash
./mvnw clean package
```

Build 會：

1. 安裝固定版本 Node / npm。
2. 執行 `npm install --no-audit --no-fund`。
3. 執行 Vue type check / lint / Vite build。
4. 將 `frontend/dist` 複製進 Spring Boot static resources。
5. 編譯 Backend。
6. 執行 Backend tests 與架構驗證。
7. 產生 executable JAR。

輸出：

```text
backend/target/wut1-it-app-template.jar
```

## 10. 驗證

Windows：

```powershell
.\scripts\verify.ps1
```

Linux / macOS：

```bash
./scripts/verify.sh
```

完成條件不是「Agent 說完成」，而是可觀察的驗證結果通過。

## 11. 語言規範

- 文件：繁體中文優先。
- 程式註解：繁體中文優先，只寫「為什麼」與 Business Rule，不寫無資訊量的逐行翻譯。
- Java / TypeScript Class、Method、Variable：英文。
- Database Table / Column / Constraint / Index：英文全大寫。
- Framework / API 等標準技術名詞保留英文。
