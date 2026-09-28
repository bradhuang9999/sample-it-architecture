---
title: 建議學習路徑
group: getting-started
kind: course
---

# 建議學習路徑

## 146. 如果學員原本只會 JSP

不要：

```text
第一週 Vue
第二週 React
第三週 Spring Boot
第四週 FastAPI
```

建議：

### Stage 1 — 共同模型

```text
HTTP
HTML
JSON
JavaScript 基礎
SQL
Browser DevTools
```

完成條件：能從 Browser Network 看懂：

```text
GET /api/products
status 200
request / response JSON
```

---

### Stage 2 — Spring Boot Backend

```text
Java modern syntax
Controller
DTO
Validation
Service
Repository
JdbcClient
Transaction
Error handling
Test
```

完成條件：能追一條：

```text
GET /api/products/1
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
SQL
 ↓
Response
```

---

### Stage 3A — Vue 或 Stage 3B — React 二選一

不要同時學兩個 framework。

Vue 路線先掌握：

```text
SFC
ref/reactive
computed/watch
props/emits
v-model
v-if/v-for
Router
API
```

React 路線先掌握：

```text
JSX
props
useState
controlled form
conditional/list render
Router
TanStack Query
useEffect only for side effects
```

---

### Stage 4 — Dashboard

```text
ECharts option
click event
drill-down
server state
local UI state
```

---

### Stage 5 — Agent Collaboration

讓學員不是從空白寫程式，而是：

```text
讀 SPEC
 ↓
讓 Agent 修改
 ↓
讀 diff
 ↓
執行 verify
 ↓
對照 Business Rule
```

---

## 147. Citizen Developer 學習順序

Citizen 不需要先學 Spring / Vue / React。

```text
1. Business Problem / SPEC
2. HTML / Form / Table
3. Python 基礎
4. FastAPI request / response
5. Pydantic data model
6. Jinja2
7. SQLite / SQL 基礎
8. 少量 JavaScript fetch / DOM
9. ECharts
10. pytest / verification
11. Enterprise API / Security boundary
```

Graduation Gate：

如果開始出現：

```text
大量 cross-component state
複雜 SPA navigation
高度互動 workflow
核心 transaction
正式 enterprise business rule
複雜 authorization
高 SLA / 高風險
```

教學網站應明確提示：

> **這不是再多學幾招 JavaScript 就好，而是應評估升級到 IT / Solution Builder Golden Path。**

---
