# Architecture

## 1. Architecture Goal

這不是縮小版 Enterprise Framework。

Citizen Template 的 Architecture Goal 是：

> 讓 Business User + Agent 可以快速建立受控的小型應用，同時維持足夠的可讀性、驗證能力與升級邊界。

## 2. High-level Architecture

```text
Browser
   │
   │ HTML / JSON
   ▼
FastAPI
   │
   ├─ Jinja2 Page Rendering
   ├─ Product / Trading API
   ├─ Business Rules
   └─ Enterprise API Client Boundary
             │
             ▼
       Approved Enterprise API

Local application data
   │
   ▼
SQLite
```

## 3. Feature-oriented Structure

```text
app/features/product_trading/
├─ routes.py       HTTP / Page Boundary
├─ service.py      Business Rules / Use Cases
├─ repository.py   SQL / Persistence
├─ models.py       Input / Output Contract
└─ templates/      Feature-specific HTML
```

依賴方向：

```text
routes
  ↓
service
  ↓
repository
```

`routes.py` 不直接寫 SQL。

`repository.py` 不包含 Business Decision。

## 4. Shared Code

`app/shared/` 只放真正跨 Feature 的基礎能力：

- DB connection
- Error handling
- Audit
- Enterprise API boundary

不要建立大型 `utils.py`。

## 5. Frontend Boundary

預設使用 Server-side HTML。

```text
Jinja2 HTML
   +
Bootstrap
   +
少量 JavaScript
```

Dashboard 的 Drill-down 使用 JavaScript 呼叫 API，這是局部互動，不代表整個應用需要 SPA。

## 6. Graduation Gate

如果出現下列情況，應停止擴張 Citizen App：

- 大量頁面共享 Client State
- 複雜 Cross-filter / Rich UI
- 高頻即時更新
- 核心交易或正式 Domain Rule
- 多系統強耦合
- 重要 SLA
- 高安全 / 財務 / 法規風險

處理方式：

```text
Citizen Prototype
      ↓
Solution Builder / IT Review
      ↓
Advanced Citizen 或 Enterprise Application
```
