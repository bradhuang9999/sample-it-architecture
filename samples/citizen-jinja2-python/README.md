# WUT1 Citizen Developer Python Template

公司 Citizen Developer 的教學模板，目標不是把使用者訓練成 Full-stack Engineer，而是讓使用者把重心放在：

1. 說清楚 Business Problem。
2. 定義 Input / Output / Business Rule。
3. 定義什麼情況算做對。
4. 讓 Coding Agent 完成大部分實作。
5. 用自動化驗證與人工 Review 確認成果。

本專案刻意採用較薄的 Web Stack：

- Python 3.12+
- FastAPI
- Pydantic
- Jinja2 Server-side Rendering
- Bootstrap 5
- Apache ECharts
- 少量 Vanilla JavaScript
- SQLite Local Standalone
- pytest / Ruff / mypy

**預設不使用 React、Vue、Vite、npm、Redux、Zustand。**

> 這是一個 Citizen Golden Path。若需求已需要大量 Client State、複雜跨 Component 互動、核心交易、SLA 或高風險權限，應升級由 Solution Builder / IT 接手，而不是繼續把 Citizen Template 變成大型 Framework。

## 1. Sample Domain

使用兩個 Sample Table：

```text
SAMPLE_PROD       Master
        │
        │ 1 : N
        ▼
SAMPLE_TRADING    Detail
```

Table / Column / Constraint / Index 命名維持英文全大寫。

### 畫面一：Master / Detail

`/master-detail`

- 上方：Product Master Form
- 下方：Trading Detail Grid
- 可切換 Product
- 可修改 Product
- 可新增、修改、刪除 Trading
- `TRADE_AMOUNT = QUANTITY × UNIT_PRICE` 由 Backend 計算
- 使用 `ROW_VERSION` 示範 Optimistic Concurrency

### 畫面二：Dashboard

`/dashboard`

- Product Count
- Trading Count
- Total Trading Amount
- ECharts 顯示 Product Trading Amount
- 點擊 Product Bar 後 Drill-down
- 顯示月別趨勢與 Detail Grid

## 2. 專案結構

```text
wut1-citizen-app-template/
├─ README.md
├─ AGENTS.md
├─ ARCHITECTURE.md
├─ SPEC.md
├─ pyproject.toml
├─ requirements.txt
├─ requirements-dev.txt
│
├─ app/
│  ├─ main.py
│  ├─ config.py
│  ├─ features/
│  │  └─ product_trading/
│  │     ├─ routes.py
│  │     ├─ service.py
│  │     ├─ repository.py
│  │     ├─ models.py
│  │     └─ templates/
│  ├─ shared/
│  │  ├─ db.py
│  │  ├─ errors.py
│  │  ├─ audit.py
│  │  └─ enterprise_api.py
│  ├─ templates/
│  └─ static/
│
├─ database/
│  ├─ CURRENT_SCHEMA.sql
│  └─ LOCAL_SAMPLE_DATA.sql
│
├─ tests/
├─ e2e/
├─ docs/
└─ scripts/
```

## 3. Local Standalone

不需要 Database Server、Node.js 或 npm。

### Windows

```powershell
.\scripts\setup-local.ps1
.\scripts\run-local.ps1
```

### Linux / macOS

```bash
./scripts/setup-local.sh
./scripts/run-local.sh
```

瀏覽：

```text
http://127.0.0.1:8000/master-detail
http://127.0.0.1:8000/dashboard
```

SQLite 預設位置：

```text
./data/wut1-citizen.db
```

若要重置：

```powershell
.\scripts\reset-local-db.ps1
```

或：

```bash
./scripts/reset-local-db.sh
```

## 4. 驗證

```powershell
.\scripts\verify.ps1
```

或：

```bash
./scripts/verify.sh
```

驗證包含：

- Python compile
- Ruff
- mypy
- pytest
- SQLite Schema / Sample Data
- API / Business Rule 測試

E2E Browser Test 另行執行，詳見 `docs/TESTING.md`。

## 5. Citizen 開發者真正應該先改什麼

優先順序：

```text
SPEC.md
  ↓
docs/BUSINESS_RULES.md
  ↓
docs/DATA.md
  ↓
讓 Agent 修改 app/features/<business-feature>/
  ↓
執行 scripts/verify.*
  ↓
人工 Review Business Result
```

不要一開始就從 Framework、Route 或 CSS 開始。

## 6. 外部前端資產

為了讓 Citizen 專案不需要 npm，本教學版直接從 CDN 載入 Bootstrap 5 與 ECharts。

正式公司環境若禁止外網，應由平台團隊將核准版本放入公司內部靜態資源服務，或 vendoring 到 `app/static/vendor/`。Citizen Developer 不自行決定版本來源。

## 7. Harness Engineering

Repo 結構沿用 Harness Engineering 的核心觀念：

- `AGENTS.md`：Agent 的固定工作規則
- `SPEC.md`：本次應用真正要解決的 Business Problem
- `ARCHITECTURE.md`：技術邊界與責任分工
- `docs/exec-plans/`：較大任務的執行計畫
- `docs/generated/`：驗證證據與自動產出
- `progress.md`：目前進度與下一步

參考：
https://github.com/walkinglabs/learn-harness-engineering/tree/main/docs/zh-TW/resources/openai-advanced/repo-template
