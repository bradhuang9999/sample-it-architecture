# AGENTS.md

## 專案目的

本 Repo 是公司 Citizen Developer 教學模板。

Agent 的主要任務不是展示技術能力，而是把 `SPEC.md` 描述的 Business Problem 做成**簡單、可驗證、容易人工 Review**的應用。

## 開始工作前

依序閱讀：

1. `SPEC.md`
2. `ARCHITECTURE.md`
3. `docs/BUSINESS_RULES.md`
4. `docs/DATA.md`
5. `docs/SECURITY.md`
6. 與本次任務直接相關的程式碼

不要為了「理解專案」一次讀取所有檔案。

## 固定技術邊界

- Backend：Python + FastAPI + Pydantic。
- HTML：Jinja2 Server-side Rendering。
- UI：Bootstrap 5。
- Chart：Apache ECharts。
- Local DB：SQLite。
- 測試：pytest。
- Static Analysis：Ruff + mypy。

未經人工 Architecture Review：

- 不得加入 React、Vue、Angular、Svelte。
- 不得加入 Node.js / npm build chain。
- 不得加入 Redux、Zustand 或其他 Global State Library。
- 不得自行加入 ORM；目前使用 Python `sqlite3` 與明確 SQL。
- 不得自行新增 Framework。

## Business-first 原則

每次修改先回答：

1. 使用者現在遇到什麼問題？
2. Input 是什麼？
3. Output 是什麼？
4. 哪些是明確 Business Rule？
5. 什麼情況算完成？

如果這些問題無法從 `SPEC.md` 或相關文件回答，先補充 Spec，不要猜測 Business Rule。

## Frontend 規則

- 預設 Server-side Rendering。
- 只有局部互動才寫 JavaScript。
- JavaScript 不建立自製 Framework。
- ECharts 只負責視覺化；Business 計算放 Backend。
- 不得在 Browser 重複實作 Backend Business Rule。
- 當 UI 已出現大量共享 State、複雜跨元件同步或高度互動 Workflow，停止擴充並標記需要 Solution Builder / IT 評估。

## Database 規則

- `database/CURRENT_SCHEMA.sql` 代表目前最新版 Schema。
- 不使用 Flyway / Liquibase。
- Table / Column / Constraint / Index 使用英文全大寫。
- Local SQLite 可由 Application 初始化，僅供 Citizen Local Standalone。
- Citizen App 不得直接連公司核心 Oracle / SQL Server Database。
- 公司核心資料應透過核准的 Enterprise API 取得。

## 程式碼規則

- 文件、註解以繁體中文優先。
- Class / Function / Variable 使用英文。
- Function 應短小並表達 Business Intent。
- 優先使用清楚的重複程式碼，不要提早建立高度 Generic Abstraction。
- Business Feature 的程式碼留在 `app/features/<feature>/`。
- 跨 Feature 共用能力才放 `app/shared/`。

## 完成條件

Agent 不得只回答「已完成」。至少要提供：

- 修改檔案清單
- Business Rule 驗證結果
- 測試結果
- 已知限制

完成前執行：

```text
scripts/verify.ps1
```

或：

```text
scripts/verify.sh
```

如果因環境缺少 dependency 無法完成某項驗證，明確列出未驗證項目，不可假裝通過。
