# AI 協作開發模板：共同假設、目標與專案差異

> 本文件整理目前討論後的共同設計前提，以及 IT / Citizen Developer 各模板專案的重要設計概念。  
> 目的不是固定所有技術細節，而是先固定「長期不應頻繁改變的設計原則」。

---

# 1. 通用假設

## 1.1 AI 將承擔更多程式實作

未來開發模式預期逐步由：

```text
人撰寫大部分程式
→ 人逐行 Review
```

轉為：

```text
人定義 Business Problem / Spec / Acceptance Criteria
                ↓
            Coding Agent
                ↓
        產生程式、測試、修改
                ↓
       Automated Verification
                ↓
          Human Review
```

因此模板的目標不是讓 AI「可以寫程式」，而是讓：

- Agent 容易找到正確 Context
- Agent 不容易跨越架構邊界
- 人可以快速理解修改範圍
- 大量低階錯誤由 Compiler / Lint / Test / Architecture Rule 自動阻擋
- Human Review 更聚焦於 Business Rule、資料、權限、設計與驗證結果

---

## 1.2 人員的程式能力可能逐步弱化

未來並不假設每一位開發者都會深入掌握 Framework 細節。

更重要的能力逐步轉為：

- 能清楚描述 Business Problem
- 能拆解 Workflow
- 能理解 Input / Output / Data
- 能定義 Business Rule
- 能定義正確結果與 Acceptance Criteria
- 能 Review API Contract
- 能判斷權限與資料存取是否合理
- 能閱讀主要程式結構
- 能檢查 Agent 提供的 Verification Evidence

因此架構應避免依賴「資深工程師記得所有規則」。

規則應盡可能轉為：

```text
Compiler
Type Check
Lint
Test
Architecture Test
API Contract
CI Gate
```

---

## 1.3 Business Feature 優先於 Technical Layer

專案應盡量以 Business Feature 組織，而不是把所有功能拆散到：

```text
controller/
service/
repository/
dto/
utils/
```

優先採：

```text
product-trading/
claims/
premium/
treaty/
...
```

讓人與 Agent 接到 Business Task 時，可以在較小的 Context 範圍內完成工作。

---

## 1.4 AI Write / Human Review Friendly

模板應優先滿足：

1. 檔案位置容易預測
2. 修改範圍容易界定
3. 架構規則可自動驗證
4. Business Rule 可測試
5. API Contract 明確
6. 不鼓勵過度抽象
7. 不讓 Agent 任意選擇 Framework
8. 完成工作必須提供 Verification Evidence

---

## 1.5 Harness Engineering 是共同工作方式

各模板都採類似以下結構：

```text
README.md
AGENTS.md
ARCHITECTURE.md
SPEC / product-specs
docs/
exec-plans/
progress.md
tests/
```

核心概念：

- `AGENTS.md`：Agent 在 Repo 中必須遵守的長期規則
- `ARCHITECTURE.md`：系統邊界與主要架構
- `SPEC.md` / Product Spec：這次或這類功能「要做對什麼」
- `exec-plans/`：較大型工作的執行計畫
- `progress.md`：進度與已完成驗證
- 自動化測試：作為「完成」的可執行證據

文件與程式註解以 **繁體中文優先**。

程式識別名稱維持英文。

---

## 1.6 技術選型以長期穩定為優先

不追求 Framework 數量，也不因 AI 很會寫就增加架構複雜度。

共同原則：

```text
少 Framework
少 Magic
少不必要抽象
少跨 Feature Dependency
多明確 Contract
多機械式 Guardrail
```

非必要不導入：

- Microservices
- GraphQL
- Event Sourcing
- CQRS
- Micro Frontend
- 多套 State Management
- 多套 UI Framework
- 過度 Generic Base Class / Utility Framework

---

# 2. Database 共通原則

## 2.1 Table / Column 命名

Database 使用：

```text
TABLE_NAME      全大寫
COLUMN_NAME     全大寫
CONSTRAINT      全大寫
INDEX           全大寫
```

Sample：

```text
SAMPLE_PROD
SAMPLE_TRADING
```

---

## 2.2 Schema 由人治理

公司正式環境不採 Application 自動 Migration。

不使用：

- Flyway
- Liquibase
- Application Startup DDL

正式 Schema 異動流程仍為：

```text
需求
↓
提出 DB Change
↓
人工填單
↓
人工審核
↓
人工執行
↓
確認正式 Schema
↓
更新 Repo 中 CURRENT_SCHEMA.sql
```

Repo 只保存：

```text
database/CURRENT_SCHEMA.sql
```

代表「目前核准最新版 Schema」。

不保存 Migration Chain。

---

## 2.3 SQLite 的定位

目前 Sample Template 使用 SQLite，主要目的為：

```text
Clone Repo
↓
Local Standalone
↓
不依賴外部 DB Server
↓
可直接驗證功能與測試
```

SQLite 是 **Local Verification / Teaching Runtime**。

它不代表未來所有正式系統必須採 SQLite。

正式 Enterprise Application 仍可依公司規範使用 SQL Server / Oracle / Enterprise API。

---

# 3. 共用 Sample Business Case

所有模板目前以相同 Sample Business Case 做比較。

## 3.1 Master

```text
SAMPLE_PROD
```

代表 Product Master。

---

## 3.2 Detail

```text
SAMPLE_TRADING
```

代表 Product 對應的 Trading Detail。

關係：

```text
SAMPLE_PROD
        │
        │ 1 : N
        ▼
SAMPLE_TRADING
```

---

## 3.3 第一個畫面：Master / Detail

上半部：

```text
Product Form
```

下半部：

```text
Trading Grid
```

主要目的：

- 示範 Master / Detail
- 示範 CRUD
- 示範 State / Data Flow
- 示範 Optimistic Concurrency
- 讓既有 JSP 工程師可以直接理解新架構

---

## 3.4 第二個畫面：Dashboard

包含：

- KPI
- Product Trading Amount
- ECharts
- Drill-down

互動：

```text
Product Chart
      │
      │ Click
      ▼
Selected Product
      │
      ├─ Monthly Trend
      └─ Trading Grid
```

主要目的：

- 示範前端 State
- 示範 Server State
- 示範 Chart Interaction
- 示範 Drill-down
- 比較不同 Frontend Architecture 的複雜度

---

# 4. IT Application Template：共同定位

IT Application 的目標是：

> 建立可以長期維護、多人協作、承載正式企業能力的 Application。

主要考量：

- 5～10 年以上生命週期
- 正式企業 API
- Authentication / Authorization
- Transaction
- Audit
- Business Rule
- 長期 Refactoring
- Architecture Boundary
- 跨系統整合
- 高度自動化驗證

Backend 統一採：

```text
Spring Boot 4
Executable JAR
Embedded Tomcat
```

不是外部 Tomcat WAR。

---

# 5. IT Vue Template

## 5.1 技術組合

```text
Spring Boot 4
+
Vue 3
TypeScript
Vite
Bootstrap 5
ECharts
```

---

## 5.2 設計定位

Vue 版主要目的是：

> 提供從 JSP / HTML / Handlebars 思維進入現代 Reactive UI 的較平順路徑。

對既有 JSP 工程師：

```text
JSP / HTML
    ↓
Vue Template
    ↓
Reactive State
```

認知跨度相對較小。

---

## 5.3 Frontend 主要結構

```text
app/
features/
shared/
styles/
```

Feature：

```text
features/
└─ product-trading/
   ├─ api/
   ├─ model/
   ├─ master-detail/
   └─ dashboard/
```

---

## 5.4 重要設計概念

- Vue Component 負責 UI
- TypeScript 提供型別 Guardrail
- Vite 只負責 Development / Build
- Production 由 Spring Boot JAR 提供 Static Assets
- 不預設導入 Pinia
- Business Rule 留在 Backend
- Feature-specific code 優先留在 Feature
- `shared/` 只放真正跨 Feature 共用能力

---

## 5.5 Vue 版主要優勢

- 接近 HTML Template
- JSP 工程師較容易閱讀
- Framework 對 Reactive UI 的寫法較一致
- 適合作為 Legacy Java Team 的前端轉型入口

---

# 6. IT React Template

## 6.1 技術組合

```text
Spring Boot 4
+
React
TypeScript
Vite
React Router
TanStack Query
Bootstrap 5
ECharts
```

---

## 6.2 設計定位

React 版主要目的是：

> 使用市場主流 React 生態，但透過 Company Template 強制收斂 React 過大的自由度。

React 本身較少替 Application 決定架構，因此公司 Template 必須更明確。

---

## 6.3 Frontend Dependency Direction

主要結構：

```text
shared
   ↓
features
   ↓
app
```

禁止：

```text
shared → feature
feature A → feature B
```

Feature 間協作原則上由 `app` 組合。

---

## 6.4 State 分三類

### Server State

使用：

```text
TanStack Query
```

例如：

- Product
- Trading
- Dashboard Summary
- Drill-down Data

避免每個 Component 自行：

```text
useEffect + fetch
```

---

### Local UI State

使用：

```text
useState
```

例如：

- Selected Product
- Modal Open
- Form State
- Current Tab

---

### URL State

可分享 / Bookmark 的查詢條件優先放：

```text
URL Query Parameter
```

---

## 6.5 明確不預設使用

- Redux
- Zustand
- Next.js
- 其他 Global State Framework

如有必要，必須先形成新的 Architecture Decision。

---

## 6.6 React 版主要優勢

- 生態與人才市場大
- Coding Agent 對 React 範例非常充足
- TanStack Query 等成熟工具完整
- 適合長期 Rich UI / Dashboard

主要代價：

- React 過度自由
- Company Architecture Rule 必須比 Vue 更嚴格
- 對原 JSP Engineer 的學習跨度較大

---

# 7. Citizen Application Template

## 7.1 技術組合

```text
Python
FastAPI
Pydantic
Jinja2
Bootstrap 5
ECharts
少量 Vanilla JavaScript
SQLite
pytest
Ruff
mypy / Pyright 類型檢查
```

預設不使用：

```text
React
Vue
Vite
npm
SPA Framework
ORM
Database Migration Framework
```

---

## 7.2 設計定位

Citizen Application 的目的不是培養另一批 Full-stack Engineer。

目標是：

> 讓最了解 Business Problem 的人，透過 Agent 把工作方法變成可執行 Application。

因此 Citizen Developer 主要應關注：

```text
Problem
Input
Output
Business Rule
Data
Acceptance Criteria
Verification
```

而不是：

```text
Framework Lifecycle
Dependency Injection
State Framework
Frontend Build Tool
Complex Architecture Pattern
```

---

## 7.3 `SPEC.md` 是最重要的檔案

Citizen Template 把：

```text
SPEC.md
```

直接放在 Repo Root。

Citizen / Business Owner 最主要應修改的是 Spec，而不是程式碼。

Spec 應包含：

- 要解決的問題
- 使用者
- Input
- Output
- Business Rule
- Data Source
- 權限
- 完成條件
- Known Example

---

## 7.4 UI 策略

預設採：

```text
FastAPI
   ↓
Jinja2 Server-side Rendering
   ↓
Bootstrap
```

只有 Dashboard / Drill-down 等局部互動使用 JavaScript + ECharts。

不因為「有一個互動畫面」就把整套 Application 變成 SPA。

---

## 7.5 Python Architecture 刻意保持簡單

Feature：

```text
features/
└─ product_trading/
   ├─ routes.py
   ├─ service.py
   ├─ models.py
   ├─ repository.py
   └─ templates/
```

避免：

```text
controller/
service/
usecase/
port/
adapter/
factory/
mapper/
...
```

過度 Enterprise Pattern。

---

## 7.6 Citizen 與 Enterprise Capability 的邊界

Citizen Application 不應直接擁有：

- 核心 Authorization
- 正式 Transaction Rule
- 核心企業 Business Rule
- Core Database 任意存取
- 自建帳號 / Password
- 自建 Authentication

正式情境應優先：

```text
Citizen App
    ↓
Enterprise API
    ↓
Spring Boot / Core System
```

定位：

```text
Spring Boot
= Enterprise Capability

Python Citizen App
= Business Solution Composition
```

---

# 8. Citizen Graduation Gate

Citizen Application 不應無限制長大。

如果出現以下特徵，應停止擴充並重新評估：

- 大量 Client-side State
- 複雜 Cross-component Interaction
- 高度即時 UI
- 多人交易
- 正式核心 Business Rule
- Financial / Regulatory Critical Transaction
- SLA
- 高安全風險
- 被大量其他系統依賴
- 已成為正式核心 Workflow

可能的演進：

```text
Citizen Prototype
      ↓
Solution Builder Review
      ↓
Advanced Citizen
或
IT Enterprise Application
```

---

# 9. 三個模板的核心差異

| 項目 | IT Vue | IT React | Citizen |
|---|---|---|---|
| 主要 Owner | IT | IT | Business / Citizen |
| Backend | Spring Boot 4 | Spring Boot 4 | FastAPI |
| Frontend | Vue 3 | React | Jinja2 + Vanilla JS |
| Type System | TypeScript + Java | TypeScript + Java | Python Type Hint + Pydantic |
| Build | Maven + Vite | Maven + Vite | Python |
| SPA | 是 | 是 | 預設否 |
| Server State | Vue Feature API | TanStack Query | Server-side |
| Local State | Vue Reactive State | useState | Server / 少量 JS |
| Global State | 預設不用 Pinia | 預設不用 Redux/Zustand | 不需要 |
| Dashboard | ECharts | ECharts | ECharts |
| Local DB | SQLite | SQLite | SQLite |
| DB Migration | 不使用 | 不使用 | 不使用 |
| 主要 Design Goal | 易於 JSP 團隊轉型 | 主流生態 + 嚴格 Architecture | Business-first / 低技術門檻 |
| Architecture Complexity | 中 | 中～高 | 低 |
| 適合 Rich UI | 高 | 高 | 中低 |
| 長期大型 Enterprise App | 是 | 是 | 否 |
| Agent 自由度 | 中低 | 低 | 低 |
| Human Review 重點 | Architecture + Business | Architecture + Business | Business + Verification |

---

# 10. 不同模板「故意不同」的原因

不是希望公司出現三套沒有關係的技術。

而是因為不同工作應該最佳化不同目標。

## IT

最佳化：

```text
Long-term Maintainability
Architecture Boundary
Security
Transaction
Enterprise Integration
Rich UI
```

---

## Citizen

最佳化：

```text
Time to Solution
Business Understanding
Low Ceremony
Agent-assisted Implementation
Verification
```

---

# 11. 共同不變的核心

不論 Vue、React 或 Citizen Python，真正希望固定的是：

```text
Business Problem
      ↓
Explicit Spec
      ↓
Small / Clear Feature Boundary
      ↓
Agent Implementation
      ↓
Automated Verification
      ↓
Human Business / Design Review
```

因此真正的企業標準不是：

```text
所有人都一定要寫同一個 Framework
```

而是：

> **不同層級可以使用不同技術，但必須遵守相同的 Spec、Boundary、Verification、Security 與治理原則。**

---

# 12. 目前建議定位

## IT Enterprise Application

目前可在 Vue / React 之間評估。

若重視：

```text
既有 JSP Engineer 學習成本
```

Vue 較有利。

若重視：

```text
市場生態
Agent 支援
React 人才
長期 Rich UI Ecosystem
```

React 較有利。

Backend 不因 Frontend 選擇而改變：

```text
Spring Boot 4
```

---

## Citizen Application

預設：

```text
Python + FastAPI + Jinja2
```

不直接跟 IT 採相同 SPA Stack。

Citizen 的技術範圍應比 IT **更受限制，而不是更自由**。

---

# 13. 最終設計原則

> **IT Template 把 Architecture 做強。**

> **Citizen Template 把 Business Problem、Spec 與 Verification 做強。**

> **Agent 負責大量 Implementation，人負責 Business Meaning、Boundary、Risk 與 Acceptance。**

這是目前所有 Template 共用的核心方向。
