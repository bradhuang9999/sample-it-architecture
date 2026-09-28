---
title: 三種架構總覽
group: getting-started
kind: course
---

# 三種架構總覽

## 3. 三種架構總覽

### 3.1 IT Vue

```text
Browser
  │
  │ HTML / JS / CSS
  ▼
Vue 3 + TypeScript
  │
  │ fetch / JSON
  ▼
Spring Boot 4 REST API
  │
  │ JdbcClient / SQL
  ▼
SQLite（Local）
```

開發階段：

```text
Browser → Vite :5173 → /api proxy → Spring Boot :8080 → SQLite
```

正式 build：

```text
Vue source
   ↓ vite build
HTML / JS / CSS
   ↓ Maven 複製
Spring Boot static/
   ↓
Executable JAR
```

---

### 3.2 IT React

```text
Browser
  │
  ▼
React + TypeScript
  │
  ├─ Local UI State → React Hooks
  ├─ Server State   → TanStack Query
  │
  ▼
Spring Boot 4 REST API
  │
  ▼
SQLite（Local）
```

與 Vue 版共用同一個 Backend / Database design。主要差異集中在 Frontend State 與 Component 模型。

---

### 3.3 Citizen Python

```text
Browser
  │
  ├─ Server-rendered HTML
  └─ 少量 fetch / ECharts
  ▼
FastAPI
  ├─ Jinja2
  ├─ Pydantic
  ├─ Business Service
  └─ sqlite3
  ▼
SQLite
```

這一套刻意沒有：

```text
React
Vue
Vite
npm
SPA global state
ORM
Migration framework
```

目的不是技術能力最大化，而是降低 Citizen Developer 需要掌握的技術面。

---

## 4. 三套專案共同的 Business Example

資料模型：

```text
SAMPLE_PROD
      │
      │ 1 : N
      ▼
SAMPLE_TRADING
```

畫面一：

```text
Product Master Form
────────────────────────
產品代號
產品名稱
分類
狀態
幣別
牌價

Trading Detail Grid
────────────────────────
日期 | 類型 | 對手方 | 數量 | 單價 | 金額
```

畫面二：

```text
Dashboard KPI
────────────────────────
Total Amount | Trade Count

Product Amount Bar Chart
────────────────────────
P001 █████████
P002 ██████
P003 ████

點擊 P001
      ↓
Monthly Drill-down Line Chart
      +
Trading Detail Grid
```

共同 Business Rule：

```text
TRADE_AMOUNT = QUANTITY × UNIT_PRICE
```

共同 concurrency concept：

```text
ROW_VERSION
```

更新時必須確認「你修改的是不是你當初看到的版本」，避免兩人互相覆蓋。

---
