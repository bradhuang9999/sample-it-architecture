# WUT1 三種應用架構教學網站設計與完整語法指南

> 適用專案：
>
> 1. **IT Vue Template**：Spring Boot 4 + Vue 3 + TypeScript + Vite + Bootstrap 5 + ECharts + SQLite
> 2. **IT React Template**：Spring Boot 4 + React + TypeScript + Vite + React Router + TanStack Query + Bootstrap 5 + ECharts + SQLite
> 3. **Citizen Python Template**：Python + FastAPI + Pydantic + Jinja2 + Bootstrap 5 + ECharts + Vanilla JavaScript + SQLite

---

## 0. 這份文件要解決什麼問題

這份文件不是「把 Java、Vue、React、Python 的官方手冊全部重寫一次」。它的目標是設計一個**可以直接拿來做內部教學網站**的完整課綱與內容骨架，讓一位原本只熟悉 JSP、甚至對現代前後端工具鏈不熟悉的人，可以從三個 WUT1 Sample 專案反向學會：

- 瀏覽器、Frontend、Backend、Database 各自負責什麼。
- Spring Boot 專案中實際出現的 Java / Spring / Maven / YAML / SQL 語法。
- Vue 專案中實際出現的 Vue / TypeScript / Vite / Router / ECharts 語法。
- React 專案中實際出現的 React / TypeScript / React Router / TanStack Query / ECharts 語法。
- Citizen 專案中實際出現的 Python / FastAPI / Pydantic / Jinja2 / Vanilla JavaScript / SQLite 語法。
- 三個專案共用的 HTML / CSS / Bootstrap / HTTP / REST / JSON / Testing / PowerShell / Shell 概念。
- 為什麼同一個商業問題，在 IT 與 Citizen Developer 的 Golden Path 中會有不同的技術解法。

### 「所有語法」的範圍定義

本文所稱的「所有語法」是：

> **三個 Sample Template 實際使用到的語言語法、框架語法、設定檔語法、測試語法與主要 API pattern。**

不代表教完 Java、Python、JavaScript、Vue 或 React 的全部語言功能。例如專案沒有使用 Java reflection、React Server Components、Vue Pinia、Python async database ORM，就不會把它們納入必修範圍。

這個範圍非常重要，因為教學網站的目的不是培養框架專家，而是讓使用者能夠：

1. **讀懂專案。**
2. **看懂 Agent 產生的修改。**
3. **知道資料從哪裡來、到哪裡去。**
4. **知道怎麼驗證。**
5. **把注意力移到 Business Problem、Business Rule 與 Acceptance Criteria。**

---

# Part I — 教學網站本身怎麼設計

## 1. 教學網站資訊架構（IA）

建議首頁不要先問「你想學 React 還是 Vue？」；應先建立共同心智模型，再讓使用者選技術路線。

```text
首頁：從一個 WUT1 Master / Detail 商業問題開始
│
├─ 00. 先看懂整個系統怎麼跑
│  ├─ Browser / Frontend / Backend / Database
│  ├─ HTTP Request / Response
│  ├─ JSON / REST API
│  └─ Master / Detail + Dashboard + Drill-down
│
├─ 01. 三個專案共通基礎
│  ├─ HTML
│  ├─ CSS / Bootstrap
│  ├─ JavaScript 基礎
│  ├─ TypeScript 基礎
│  ├─ SQL / SQLite
│  ├─ ECharts
│  └─ Test / Verification
│
├─ 02. IT 共用 Backend — Spring Boot
│  ├─ Java 語法
│  ├─ Spring Boot
│  ├─ Spring MVC REST API
│  ├─ Validation / Error Handling
│  ├─ Service / Repository / Transaction
│  ├─ JdbcClient / SQL
│  ├─ Spring Modulith
│  ├─ JUnit / Integration Test
│  ├─ Maven
│  └─ application.yml
│
├─ 03A. IT Frontend — Vue 路線
│  ├─ Vue SFC
│  ├─ Reactivity
│  ├─ Props / Emits
│  ├─ Form / List / Conditional Rendering
│  ├─ Vue Router
│  ├─ API Client
│  ├─ ECharts Wrapper
│  └─ Master / Detail + Dashboard 實作
│
├─ 03B. IT Frontend — React 路線
│  ├─ JSX / TSX
│  ├─ Component / Props
│  ├─ useState / useEffect / useRef / useMemo
│  ├─ React Router
│  ├─ TanStack Query
│  ├─ API Client
│  ├─ ECharts Wrapper
│  └─ Master / Detail + Dashboard 實作
│
├─ 04. Citizen — Python 路線
│  ├─ Python 語法
│  ├─ Pydantic
│  ├─ FastAPI
│  ├─ Jinja2
│  ├─ Vanilla JavaScript
│  ├─ sqlite3
│  └─ pytest / Playwright
│
├─ 05. 同一需求三種實作比較
│  ├─ Master / Detail
│  ├─ 修改 Product
│  ├─ CRUD Trading
│  ├─ Dashboard
│  └─ Drill-down
│
└─ 99. Syntax Index
   ├─ Java
   ├─ Spring
   ├─ Vue
   ├─ React
   ├─ TypeScript / JavaScript
   ├─ Python
   ├─ FastAPI / Jinja2
   ├─ SQL
   ├─ Maven / YAML / TOML / JSON
   ├─ PowerShell
   └─ POSIX Shell
```

---

## 2. 每一個教學頁都使用同一個模板

每頁統一用以下結構，避免「看完 API 文件還是不知道跟專案有什麼關係」。

```text
1. 這一頁要解決什麼問題？
2. 先看結果
3. 心智模型
4. 在 WUT1 專案哪個檔案？
5. 實際程式碼
6. 語法逐段拆解
7. 資料怎麼流動？
8. 常見錯誤
9. Agent 容易寫錯什麼？
10. Human Review 要看什麼？
11. 小練習
12. 如何驗證？
13. 中文延伸閱讀
```

### 教學網站的核心原則

不要用「學會框架」當終點。每一頁最後都要回到：

> **這個語法在解哪一個 Business / Application Problem？**

例如 `useState()` 不應只教「State hook 的 API」，而是：

> Dashboard 點擊 Product 後，頁面需要記住「目前選中的 Product」，這個畫面狀態在 React 版由 `useState()` 保存。

---

# Part II — 先看懂三種架構

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

# Part III — 三個專案共通的 Web 基礎

## 5. HTTP / REST / JSON

### 5.1 Request / Response

最重要的心智模型：

```text
Frontend                  Backend
   │                          │
   │ GET /api/products/1      │
   ├─────────────────────────>│
   │                          │ Query DB
   │                          │
   │ 200 + JSON               │
   │<─────────────────────────┤
```

### 5.2 專案實際使用的 HTTP Method

| Method | 用途 | WUT1 範例 |
|---|---|---|
| `GET` | 查詢 | 取得 Products / Trading / Dashboard |
| `POST` | 新增 | 新增 Trading |
| `PUT` | 修改 | 修改 Product / Trading |
| `DELETE` | 刪除 | 刪除 Trading |

### 5.3 JSON

```json
{
  "prodId": 1,
  "prodCode": "P001",
  "prodName": "Motor Treaty",
  "rowVersion": "1"
}
```

JSON 基本語法：

- `{}`：Object
- `[]`：Array
- Key 必須是字串。
- Value 可以是 string / number / boolean / null / object / array。
- JSON 沒有 Java / TypeScript 的型別宣告；型別由 API contract 與程式負責。

### Human Review 重點

不要只確認「API 能 call」。要確認：

- HTTP method 是否符合操作語意。
- Request / Response 欄位是否明確。
- 欄位 nullable 與 required 是否一致。
- Error status 是否合理，例如 404 / 409 / 400。
- Business Rule 是在 Backend 還是 Frontend。

### 中文延伸閱讀

- [MDN：使用 Fetch API](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API/Using_Fetch)
- [MDN：非同步 JavaScript](https://developer.mozilla.org/zh-TW/docs/Learn_web_development/Extensions/Async_JS/Introducing)

---

## 6. HTML：三套 Frontend 都離不開的底層

### 6.1 專案會看到的基本元素

```html
<div></div>
<form></form>
<label></label>
<input />
<select></select>
<option></option>
<button></button>
<table></table>
<thead></thead>
<tbody></tbody>
<tr></tr>
<th></th>
<td></td>
```

### 6.2 Attribute

```html
<input
  id="prodName"
  name="prodName"
  type="text"
  class="form-control"
  disabled
/>
```

要理解：

- `id`：DOM 唯一識別。
- `name`：傳統 form submit 時的欄位名稱。
- `type`：input 類型。
- `class`：CSS / Bootstrap selector。
- `disabled`：Boolean attribute。

### 6.3 `<form>` 與 submit

```html
<form>
  <input type="text" />
  <button type="submit">儲存</button>
</form>
```

Vue / React 會攔截 submit，避免瀏覽器整頁重新送出；Citizen Jinja 頁面也可能用 JavaScript 攔截，再呼叫 API。

### 中文延伸閱讀

- [MDN：網站表單](https://developer.mozilla.org/zh-TW/docs/Learn_web_development/Extensions/Forms)
- [MDN：如何建構 HTML 表單](https://developer.mozilla.org/zh-TW/docs/Learn_web_development/Extensions/Forms/How_to_structure_a_web_form)
- [MDN：button 元素](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Reference/Elements/button)

---

## 7. CSS 與 Bootstrap 5

三套專案都刻意避免建立龐大的自製 Design System，而是以 Bootstrap 5 當基礎。

### 7.1 常見 class 讀法

```html
<div class="container-fluid py-4">
  <div class="row g-3">
    <div class="col-md-6">
      <div class="card shadow-sm">
        <div class="card-body">
```

這不是一段 JavaScript，而是 HTML element 同時套多個 CSS class。

常見類別：

| 類別 | 意義 |
|---|---|
| `container` / `container-fluid` | 頁面容器 |
| `row` | Grid row |
| `col-*` | Grid column |
| `g-*` | Grid gap |
| `d-flex` | `display:flex` |
| `justify-content-*` | Flex 水平排列 |
| `align-items-*` | Flex 垂直排列 |
| `mb-*`, `mt-*`, `py-*`, `px-*` | margin / padding utility |
| `form-control` | Form input 樣式 |
| `form-select` | Select 樣式 |
| `table` | Table 基礎樣式 |
| `table-striped` | Zebra rows |
| `btn`, `btn-primary` | Button |
| `card`, `card-body` | Card component |
| `alert`, `alert-danger` | Alert component |

### 7.2 自訂 CSS

```css
.page-shell {
  max-width: 1440px;
  margin: 0 auto;
}
```

語法：

```text
selector {
  property: value;
}
```

### 中文延伸閱讀

- [Bootstrap 5 繁體中文文件：簡介](https://bootstrap5.hexschool.com/docs/5.1/getting-started/introduction/)
- [MDN Web Forms](https://developer.mozilla.org/zh-TW/docs/Learn_web_development/Extensions/Forms)

---

## 8. JavaScript：Vue、React、Citizen 都會看到

即使使用 Vue / React，底層仍然是 JavaScript / TypeScript。

### 8.1 `const` / `let`

```javascript
const apiBase = '/api'
let selectedProductId = null
```

- `const`：binding 不重新指定。
- `let`：變數之後可以重新指定。
- 現代前端優先 `const`，需要 reassign 才用 `let`。

### 8.2 Function

```javascript
function loadProduct(id) {
  return fetch(`/api/products/${id}`)
}
```

Arrow function：

```javascript
const loadProduct = (id) => fetch(`/api/products/${id}`)
```

### 8.3 Object / Array

```javascript
const product = {
  prodId: 1,
  prodName: 'Motor Treaty'
}

const products = [product]
```

### 8.4 Destructuring

```javascript
const { prodId, prodName } = product
```

React props 常大量使用：

```tsx
function ProductForm({ product, saving }: Props) {
```

### 8.5 Spread Syntax

```javascript
const request = {
  ...form,
  remark: form.remark?.trim() || null
}
```

意思是先複製 `form` 所有 property，再覆寫 `remark`。

### 8.6 Template Literal

```javascript
const url = `/api/products/${prodId}`
```

使用反引號 `` ` ``，`${...}` 內放 expression。

### 8.7 Optional Chaining `?.`

```javascript
form.remark?.trim()
```

如果 `remark` 是 `null` / `undefined`，不會直接拋出 error。

### 8.8 Nullish Coalescing `??`

```javascript
const message = error.message ?? '未知錯誤'
```

只有左邊是 `null` / `undefined` 才取右邊。

### 8.9 Array Methods

```javascript
products.map(product => product.prodName)
products.find(product => product.prodId === selectedId)
```

專案中也會看到 `.join()` 等。

### 8.10 `async` / `await`

```javascript
async function loadDashboard() {
  const response = await fetch('/api/dashboard')
  const data = await response.json()
  return data
}
```

核心概念：等待 Promise 完成，但不把整個瀏覽器執行緒同步鎖死。

### 8.11 `try / catch / finally`

```javascript
try {
  await save()
} catch (error) {
  showError(error)
} finally {
  saving = false
}
```

### 8.12 `Promise.all`

```javascript
const [summary, products] = await Promise.all([
  loadSummary(),
  loadProducts()
])
```

多個互不相依的 request 可以並行等待。

### 8.13 DOM API（Citizen 版特別重要）

```javascript
const element = document.getElementById('product-name')
element.textContent = 'Motor Treaty'
```

事件：

```javascript
button.addEventListener('click', () => {
  // ...
})
```

事件代理：

```javascript
const button = event.target.closest('button[data-action]')
const id = button.dataset.id
```

### 8.14 `innerHTML` 的安全風險

Citizen Sample 中使用 `innerHTML` 快速產生 table rows。教學網站應明確指出：

```javascript
element.innerHTML = `<td>${serverText}</td>`
```

如果 `serverText` 可能包含未信任的使用者輸入，就有 XSS 風險。正式企業應用應優先：

```javascript
element.textContent = serverText
```

或使用可靠的 escaping / templating strategy。

### 中文延伸閱讀

- [MDN：非同步 JavaScript](https://developer.mozilla.org/zh-TW/docs/Learn_web_development/Extensions/Async_JS/Introducing)
- [MDN：Fetch API](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API/Using_Fetch)
- [MDN：解構](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Destructuring)
- [MDN：可選串連 `?.`](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

---

## 9. TypeScript：IT Vue / React 的共同基礎

TypeScript = JavaScript + Static Type System。

### 9.1 Primitive Type

```typescript
const prodId: number = 1
const prodName: string = 'Motor Treaty'
const saving: boolean = false
```

### 9.2 Interface

```typescript
interface Product {
  prodId: number
  prodCode: string
  prodName: string
  remark: string | null
}
```

### 9.3 Type Alias

```typescript
type ProductStatus = 'ACTIVE' | 'INACTIVE'
```

這是 String Literal Union，代表只允許兩個值。

### 9.4 Union Type

```typescript
let selectedProductId: number | null = null
```

### 9.5 Optional Property

```typescript
interface Props {
  height?: number
}
```

`?` 代表 property 可以不存在。

### 9.6 Generic

```typescript
async function getJson<T>(url: string): Promise<T> {
```

`T` 由呼叫端決定。

### 9.7 `unknown`

```typescript
function toErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  return '未知錯誤'
}
```

比 `any` 安全，因為使用前必須先 narrowing。

### 9.8 `Record<K, V>`

```typescript
const headers: Record<string, string> = {}
```

### 9.9 `readonly` / `as const`

React Query key 常用：

```typescript
const all = ['product-trading'] as const
```

讓 TypeScript 保留較精確的 literal / readonly type。

### 9.10 Type Assertion `as`

```typescript
prodId as number
```

意思是「告訴 TypeScript 我已確認這裡是 number」。

要特別教育：`as` 不會在 runtime 幫你驗證資料，不應拿來掩蓋真正的 null/type 問題。

### 9.11 `Promise<T>`

```typescript
async function getProduct(id: number): Promise<Product> {
```

表示 asynchronous function 最後 resolve 為 `Product`。

### 中文延伸閱讀

- [TypeScript 中文文件](https://www.typescriptlang.org/zh/docs/)

---

## 10. SQLite / SQL：三個專案共同的資料層

### 10.1 Schema DDL

```sql
CREATE TABLE IF NOT EXISTS SAMPLE_PROD (
    PROD_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    PROD_CODE TEXT NOT NULL,
    PROD_NAME TEXT NOT NULL,
    PROD_STATUS TEXT NOT NULL,
    ROW_VERSION INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT UK_SAMPLE_PROD_CODE UNIQUE (PROD_CODE),
    CONSTRAINT CK_SAMPLE_PROD_STATUS
        CHECK (PROD_STATUS IN ('ACTIVE', 'INACTIVE'))
);
```

語法：

| Syntax | 意義 |
|---|---|
| `CREATE TABLE` | 建 table |
| `IF NOT EXISTS` | 已存在時不報錯 |
| `INTEGER PRIMARY KEY` | SQLite row identity 特殊形式 |
| `AUTOINCREMENT` | 自動遞增 |
| `TEXT`, `NUMERIC`, `INTEGER` | SQLite affinity |
| `NOT NULL` | 不允許 NULL |
| `DEFAULT` | 預設值 |
| `UNIQUE` | 唯一性 |
| `CHECK` | 值域規則 |
| `FOREIGN KEY` | 關聯完整性 |
| `REFERENCES` | 指向 Master table |

### 10.2 Index

```sql
CREATE INDEX IF NOT EXISTS IX_SAMPLE_TRADING_PROD_DATE
ON SAMPLE_TRADING (PROD_ID, TRADE_DATE DESC);
```

Index 是查詢效能結構，不等於 Business Rule。

### 10.3 Sample Data

```sql
INSERT OR IGNORE INTO SAMPLE_PROD (
  PROD_CODE,
  PROD_NAME
) VALUES
  ('P001', 'Motor Treaty'),
  ('P002', 'Property Treaty');
```

### 10.4 SELECT

```sql
SELECT
    PROD_ID,
    PROD_CODE,
    PROD_NAME
FROM SAMPLE_PROD
WHERE PROD_ID = :prodId
ORDER BY PROD_CODE;
```

### 10.5 JOIN / GROUP BY / Aggregate

```sql
SELECT
    P.PROD_ID,
    P.PROD_NAME,
    COUNT(T.TRADING_ID) AS TRADE_COUNT,
    COALESCE(SUM(T.TRADE_AMOUNT), 0) AS TOTAL_AMOUNT
FROM SAMPLE_PROD P
LEFT JOIN SAMPLE_TRADING T
    ON T.PROD_ID = P.PROD_ID
GROUP BY P.PROD_ID, P.PROD_NAME;
```

語法：

- `LEFT JOIN`：Master 即使沒有 Detail 也保留。
- `COUNT()`：筆數。
- `SUM()`：加總。
- `COALESCE(a, b)`：a 為 NULL 時回 b。
- `GROUP BY`：依 Product 聚合。
- `AS`：欄位 alias。

### 10.6 月別 Drill-down：`strftime`

```sql
SELECT
  strftime('%Y-%m', TRADE_DATE) AS TRADE_MONTH,
  SUM(TRADE_AMOUNT) AS TOTAL_AMOUNT
FROM SAMPLE_TRADING
WHERE PROD_ID = :prodId
GROUP BY strftime('%Y-%m', TRADE_DATE)
ORDER BY TRADE_MONTH;
```

### 10.7 UPDATE + Optimistic Concurrency

```sql
UPDATE SAMPLE_PROD
SET
    PROD_NAME = :prodName,
    ROW_VERSION = ROW_VERSION + 1
WHERE PROD_ID = :prodId
  AND ROW_VERSION = :expectedRowVersion;
```

如果 update row count = 0，可能代表資料已被別人修改。

### 10.8 DELETE

```sql
DELETE FROM SAMPLE_TRADING
WHERE TRADING_ID = :tradingId
  AND ROW_VERSION = :expectedRowVersion;
```

### 中文延伸閱讀

- [SQLite 中文網：CREATE TABLE](https://sqlite.readdevdocs.com/lang_createtable.html)
- [Python sqlite3 中文文件](https://docs.python.org/zh-tw/3/library/sqlite3.html)
- [SQLite 官方 SQL 語言參考（英文，作為最終權威）](https://sqlite.org/lang.html)

---

## 11. ECharts：兩個 Dashboard 都使用的圖表模型

核心心智模型：

```text
Data
 ↓
Option Object
 ↓
chart.setOption(option)
 ↓
ECharts render
```

### 11.1 Bar Chart

```javascript
const option = {
  xAxis: {
    type: 'category',
    data: ['P001', 'P002']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      type: 'bar',
      data: [100000, 80000]
    }
  ]
}
```

### 11.2 Line Chart

```javascript
const option = {
  xAxis: {
    type: 'category',
    data: ['2026-01', '2026-02']
  },
  yAxis: { type: 'value' },
  series: [
    {
      type: 'line',
      data: [50000, 75000]
    }
  ]
}
```

### 11.3 Click Event → Drill-down

```javascript
chart.on('click', event => {
  const productId = event.data.prodId
  loadDrilldown(productId)
})
```

### 11.4 Resize

```javascript
window.addEventListener('resize', () => chart.resize())
```

Vue / React Wrapper 版本會用 lifecycle hook 清除 listener / chart instance，避免 resource leak。

### 中文延伸閱讀

- [Apache ECharts：基礎長條圖](https://echarts.apache.org/handbook/zh/how-to/chart-types/bar/basic-bar/)
- [Apache ECharts：基礎折線圖](https://echarts.apache.org/handbook/zh/how-to/chart-types/line/basic-line/)


# Part IV — IT 共用 Backend：Java + Spring Boot 4

## 12. 先看懂 Backend Folder Structure

Vue / React 兩個 IT Template 共用同一套 Backend：

```text
backend/src/main/java/com/example/wut1sample/
│
├─ SampleApplication.java
│
├─ producttrading/
│  ├─ api/
│  │  ├─ ProductTradingController.java
│  │  ├─ ProductTradingDashboardController.java
│  │  ├─ ProductTradingApiMapper.java
│  │  └─ dto/
│  │
│  ├─ application/
│  │  ├─ ProductTradingService.java
│  │  ├─ ProductTradingDashboardService.java
│  │  ├─ RowVersionCodec.java
│  │  ├─ UpdateProductCommand.java
│  │  └─ UpsertTradingCommand.java
│  │
│  ├─ domain/
│  │  ├─ Product.java
│  │  ├─ Trading.java
│  │  ├─ ProductStatus.java
│  │  ├─ TradeType.java
│  │  └─ ProductTradingRepository.java
│  │
│  └─ infrastructure/
│     └─ persistence/
│        └─ JdbcProductTradingRepository.java
│
└─ shared/
   ├─ audit/
   └─ error/
```

這不是為了「分越多層越專業」，而是建立清楚依賴方向：

```text
api
 ↓
application
 ↓
domain
 ↑
infrastructure
```

Human Review 第一個問題不是「這段 Java 漂不漂亮」，而是：

> **這個 Business Logic 放的位置對不對？**

---

# 13. Java 基本語法：專案中實際會看到的全部主要形式

## 13.1 `package`

```java
package com.example.wut1sample.producttrading.domain;
```

用途：指定 class 所屬 namespace / package。

Folder 通常與 package 對應：

```text
com/example/wut1sample/producttrading/domain/Product.java
```

---

## 13.2 `import`

```java
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
```

Static import：

```java
import static org.assertj.core.api.Assertions.assertThat;
```

使用後可以直接：

```java
assertThat(result).isNotNull();
```

而不必寫完整 class name。

---

## 13.3 `class`

```java
public class ProductTradingService {
}
```

主要語法：

```text
[access modifier] class ClassName {
}
```

### Access modifier

- `public`：其他 package 可見。
- `private`：只有同一 class 可見。
- package-private：不寫 modifier，只有 package 內可見。

---

## 13.4 Constructor

```java
public ProductTradingService(ProductTradingRepository repository) {
    this.repository = repository;
}
```

`this.repository`：目前 object 的 field。

Spring 專案使用 constructor injection，讓 dependency 明確而且容易 test。

---

## 13.5 Field / `final`

```java
private final ProductTradingRepository repository;
```

`final` 在這裡代表 reference 初始化後不重新指向別的 object。

常見 static constant：

```java
private static final Logger log =
    LoggerFactory.getLogger(ProductTradingService.class);
```

---

## 13.6 Method

```java
public Product getProduct(long prodId) {
    // ...
}
```

拆解：

```text
public          access
Product         return type
getProduct      method name
(long prodId)   parameters
```

Void method：

```java
public void deleteTrading(long tradingId) {
}
```

---

## 13.7 Primitive 與常見 Reference Type

專案中主要會看到：

```java
long id;
int count;
String name;
BigDecimal amount;
LocalDate tradeDate;
Instant timestamp;
```

### 為什麼金額不用 `double`？

保險、交易、會計類金額應使用：

```java
BigDecimal
```

避免 binary floating-point 精度問題。

---

## 13.8 `record`

DTO / Command / Domain value 很適合：

```java
public record UpdateProductCommand(
    String prodName,
    String prodCategory,
    ProductStatus prodStatus,
    String currencyCode,
    BigDecimal listPrice,
    long expectedRowVersion
) {
}
```

Record 自動提供主要 constructor、accessor、`equals`、`hashCode`、`toString`。

讀值：

```java
command.prodName()
```

不是傳統 Bean：

```java
command.getProdName()
```

---

## 13.9 `enum`

```java
public enum ProductStatus {
    ACTIVE,
    INACTIVE
}
```

Trading：

```java
public enum TradeType {
    BUY,
    SELL
}
```

用途：把合法值限制在有限集合，而不是到處傳任意 String。

---

## 13.10 `interface`

```java
public interface ProductTradingRepository {
    Optional<Product> findProduct(long prodId);
    List<Trading> findTradingByProduct(long prodId);
}
```

Domain 定義「需要什麼能力」，Infrastructure 實作 SQL 細節。

Implementation：

```java
public class JdbcProductTradingRepository
        implements ProductTradingRepository {
}
```

---

## 13.11 `extends`

Exception：

```java
public class NotFoundException extends RuntimeException {
}
```

表示 inheritance。

---

## 13.12 Generic：`List<T>` / `Optional<T>` / `Map<K,V>`

```java
List<Product> products;
Optional<Product> product;
Map<String, Object> details;
```

`<T>` 指 container 內的 type。

### Optional

```java
return repository.findProduct(prodId)
    .orElseThrow(() -> new NotFoundException("找不到產品"));
```

語意是：結果可能不存在，但不要用裸 `null` 隱藏這件事。

---

## 13.13 Lambda

```java
item -> item.amount()
```

多行：

```java
item -> {
    log.info("item={}", item);
    return item.amount();
}
```

專案中常出現在：

- Stream `.map(...)`
- `orElseThrow(() -> ...)`
- Result mapping / callback

---

## 13.14 Method Reference

```java
ProductTradingApiMapper::toResponse
```

相當於：

```java
item -> ProductTradingApiMapper.toResponse(item)
```

Instance method reference：

```java
this::mapProduct
```

---

## 13.15 Stream API

```java
return products.stream()
    .map(ProductTradingApiMapper::toResponse)
    .toList();
```

讀法：

```text
List
 ↓ stream()
逐筆資料流
 ↓ map()
轉換
 ↓ toList()
重新收集成 List
```

---

## 13.16 `var`

```java
var result = repository.findDashboardSummary();
```

Compiler 仍知道 type，只是由右側推導。

教學上要區分：Java `var` **不是** JavaScript 的動態型別。

---

## 13.17 Java Text Block `"""`

專案 SQL 很適合：

```java
String sql = """
    SELECT
        PROD_ID,
        PROD_CODE,
        PROD_NAME
    FROM SAMPLE_PROD
    ORDER BY PROD_CODE
    """;
```

比大量 `"..." +` 更適合 Human Review SQL。

---

## 13.18 `if`

```java
if (updatedRows == 0) {
    throw new ConflictException("資料已被其他人修改");
}
```

---

## 13.19 Ternary Operator

```java
String value = remark == null ? "" : remark;
```

形式：

```text
condition ? whenTrue : whenFalse
```

---

## 13.20 Exception

```java
throw new NotFoundException("找不到產品");
```

Catch：

```java
try {
    // ...
} catch (RuntimeException ex) {
    // ...
}
```

不應用 exception 取代正常 Business branching；它適合表達 abnormal/error flow。

---

## 13.21 `@Override`

```java
@Override
public Optional<Product> findProduct(long prodId) {
}
```

告訴 compiler：此 method 應該是實作 / 覆寫 parent/interface method。

如果 signature 不匹配，compiler 會協助抓錯。

---

## 13.22 `BigDecimal`

```java
amount = quantity
    .multiply(unitPrice)
    .setScale(2, RoundingMode.HALF_UP);
```

需要理解：

- `multiply()` 不會改原物件，會回傳新的 BigDecimal。
- `setScale()` 明確定義小數位與 rounding rule。

---

## 13.23 Date / Time

```java
LocalDate tradeDate;
Instant createdAt;
```

- `LocalDate`：只有年月日，例如 Trade Date。
- `Instant`：時間軸上的 UTC instant，適合 audit timestamp。

### 中文延伸閱讀

- [廖雪峰 Java 教程：Java 基礎](https://liaoxuefeng.com/books/java/quick-start/basic/index.html)
- [廖雪峰 Java：Record](https://liaoxuefeng.com/books/java/oop/core/record/index.html)
- [廖雪峰 Java：BigDecimal](https://liaoxuefeng.com/books/java/oop/core/bigdecimal/index.html)
- [廖雪峰 Java：LocalDateTime / 日期時間](https://liaoxuefeng.com/books/java/datetime/local-datetime/index.html)

---

# 14. Spring Boot 啟動與 Dependency Injection

## 14.1 `@SpringBootApplication`

```java
@SpringBootApplication
public class SampleApplication {
    public static void main(String[] args) {
        SpringApplication.run(SampleApplication.class, args);
    }
}
```

### `public static void main`

Java Application entry point。

```text
java -jar xxx.jar
       ↓
main()
       ↓
SpringApplication.run()
       ↓
Spring 建立 ApplicationContext
       ↓
建立 Bean / 啟動 Embedded Tomcat
```

### `@SpringBootApplication`

可以把它理解成 Spring Boot 應用的總入口 annotation，啟用 component scanning 與 auto configuration 等核心機制。

---

## 15. Spring Bean Stereotype

專案使用：

```java
@Service
@Repository
@Component
```

概念上都是：

> 讓 Spring 管理這個 object 的生命週期與 dependency。

### `@Service`

```java
@Service
public class ProductTradingService {
}
```

代表 Application / Business service。

### `@Repository`

```java
@Repository
public class JdbcProductTradingRepository
        implements ProductTradingRepository {
}
```

代表 persistence adapter。

### `@Component`

```java
@Component
public class AuditUserProvider {
}
```

一般 Spring-managed component。

---

# 16. Spring MVC REST Controller

## 16.1 `@RestController`

```java
@RestController
@RequestMapping("/api/products")
public class ProductTradingController {
}
```

`@RestController` 表示 method 回傳值預設序列化成 HTTP response body（通常 JSON）。

---

## 16.2 `@RequestMapping`

```java
@RequestMapping("/api/products")
```

設定 controller 共用 URL prefix。

---

## 16.3 `@GetMapping`

```java
@GetMapping
public List<ProductResponse> getProducts() {
}
```

代表：

```text
GET /api/products
```

Path variable：

```java
@GetMapping("/{prodId}")
public ProductResponse getProduct(
        @PathVariable long prodId) {
}
```

對應：

```text
GET /api/products/1
```

---

## 16.4 `@PostMapping`

```java
@PostMapping("/{prodId}/trading")
@ResponseStatus(HttpStatus.CREATED)
public TradingResponse createTrading(...) {
}
```

對應新增資源。

---

## 16.5 `@PutMapping`

```java
@PutMapping("/{prodId}")
public ProductResponse updateProduct(...) {
}
```

WUT1 Sample 用 PUT 表示更新 Product / Trading。

---

## 16.6 `@DeleteMapping`

```java
@DeleteMapping("/{prodId}/trading/{tradingId}")
@ResponseStatus(HttpStatus.NO_CONTENT)
public void deleteTrading(...) {
}
```

---

## 16.7 `@PathVariable`

```java
@PathVariable long prodId
```

從 URL path 取得值。

---

## 16.8 `@RequestBody`

```java
@RequestBody ProductUpdateRequest request
```

把 JSON request body 轉成 Java DTO。

---

## 16.9 `@RequestParam`

```java
@RequestParam long expectedRowVersion
```

從 query string 等 request parameter 取得值。

---

## 16.10 `@ResponseStatus`

```java
@ResponseStatus(HttpStatus.CREATED)
```

指定成功 response status，例如新增回 201。

### 中文延伸閱讀

- [Spring MVC 中文文件：Request Mapping](https://docs.springframework.org.cn/spring-framework/reference/web/webmvc/mvc-controller/ann-requestmapping.html)
- [Spring MVC 中文文件：RequestBody](https://docs.springframework.org.cn/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/requestbody.html)

---

# 17. Bean Validation

DTO 會看到：

```java
@NotBlank
@Size(max = 100)
String prodName
```

```java
@NotNull
@DecimalMin("0.00")
BigDecimal listPrice
```

```java
@Pattern(regexp = "[A-Z]{3}")
String currencyCode
```

Controller：

```java
public ProductResponse update(
    @Valid @RequestBody ProductUpdateRequest request
) {
}
```

### Annotation 語意

| Annotation | 驗證 |
|---|---|
| `@NotNull` | 不能是 null |
| `@NotBlank` | String 不能 null/空/全空白 |
| `@Size` | String / collection 長度 |
| `@Pattern` | Regex |
| `@DecimalMin` | 數值下限 |
| `@Valid` | 要求驗證 nested/request object |
| `@Validated` | 啟用 Spring method validation 等情境 |

Validation 的價值：

> 不要讓不合法輸入一路走到 SQL 或 Business Logic 才爆炸。

### 中文延伸閱讀

- [Spring Boot 中文文件：Validation](https://docs.springframework.org.cn/spring-boot/reference/io/validation.html)

---

# 18. DTO / Command / Domain Model 為什麼不混在一起

### Request DTO

```text
HTTP JSON
 ↓
ProductUpdateRequest
```

### Command

```text
ProductUpdateRequest
 ↓ mapping
UpdateProductCommand
```

### Domain

```text
Product
Trading
ProductStatus
TradeType
```

### Response DTO

```text
Product
 ↓ mapper
ProductResponse
 ↓ JSON
Browser
```

這個教學的目的不是要求 Citizen 使用這種分層，而是讓 IT 開發理解：

> API contract、Application use case、Domain data structure 是不同責任。

---

# 19. `@Transactional`

```java
@Transactional
public Trading createTrading(...) {
    // 多個 DB operation
}
```

Transaction 的核心概念：

```text
全部成功 → COMMIT
任一步失敗 → ROLLBACK
```

教學時要連到 Business 意義，例如：

> 不要只更新 Trading 一半就留下正式狀態。

---

# 20. Repository Pattern + `JdbcClient`

Domain interface：

```java
public interface ProductTradingRepository {
    List<Product> findProducts();
}
```

Infrastructure：

```java
@Repository
public class JdbcProductTradingRepository
        implements ProductTradingRepository {

    private final JdbcClient jdbcClient;
}
```

## 20.1 Fluent API

```java
jdbcClient.sql(sql)
    .param("prodId", prodId)
    .query(this::mapProduct)
    .optional();
```

逐段：

```text
.sql(sql)             指定 SQL
.param(...)           綁定參數
.query(...)           定義 query / mapping
.optional() / list()  取得結果
```

Update：

```java
int affected = jdbcClient.sql(sql)
    .param("prodId", prodId)
    .param("rowVersion", rowVersion)
    .update();
```

### 為什麼不用字串拼 SQL？

不要：

```java
"WHERE PROD_ID = " + prodId
```

應該：

```sql
WHERE PROD_ID = :prodId
```

再 `.param()`，除了清楚，也避免 SQL injection 類型問題。

### 中文延伸閱讀

- [Spring Framework 中文文件：JdbcClient / JDBC Core](https://docs.springframework.org.cn/spring-framework/reference/data-access/jdbc/core.html)
- [廖雪峰 Java：JDBC Query](https://liaoxuefeng.com/books/java/jdbc/query/index.html)

---

# 21. ResultSet Mapping

典型概念：

```java
private Product mapProduct(ResultSet rs, int rowNum)
        throws SQLException {
    return new Product(
        rs.getLong("PROD_ID"),
        rs.getString("PROD_CODE"),
        rs.getString("PROD_NAME")
    );
}
```

需要理解：

- SQL column name 使用 DB 的全大寫 convention。
- Java domain property 保持 Java naming convention。
- Mapping 是兩個世界的邊界。

---

# 22. Error Handling

Custom exception：

```java
public class ConflictException extends RuntimeException {
}
```

Global handler：

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ApiError> handleNotFound(...) {
        // ...
    }
}
```

### `@RestControllerAdvice`

把跨 Controller 的 error mapping 集中管理。

### `@ExceptionHandler`

指定哪些 exception 由哪個 method 處理。

### `ResponseEntity`

```java
return ResponseEntity
    .status(HttpStatus.NOT_FOUND)
    .body(error);
```

這是明確控制 HTTP status + body。

---

# 23. Logging / Audit

SLF4J：

```java
private static final Logger log =
    LoggerFactory.getLogger(ProductTradingService.class);
```

```java
log.info("Update product prodId={}, user={}", prodId, user);
```

不要：

```java
System.out.println(...)
```

正式 Audit 與一般 debug log 是不同概念；Sample 的 `AuditUserProvider` 是為未來 Keycloak user identity 留邊界，不代表正式 Auth 已完成。

---

# 24. `@Value` 與 application.yml

Java：

```java
@Value("${app.audit.default-user:LOCAL_DEMO}")
private String defaultUser;
```

YAML：

```yaml
app:
  audit:
    default-user: ${APP_DEFAULT_USER:LOCAL_DEMO}
```

意思：

```text
優先讀環境變數 APP_DEFAULT_USER
沒有 → LOCAL_DEMO
```

### 中文延伸閱讀

- [Spring Boot 中文文件：外部化配置](https://docs.springframework.org.cn/spring-boot/reference/features/external-config.html)

---

# 25. YAML 語法

專案：

```yaml
spring:
  application:
    name: wut1-it-app-template
  profiles:
    default: local

server:
  port: ${SERVER_PORT:8080}
  shutdown: graceful
```

重要語法：

- 縮排代表 hierarchy。
- `key: value`。
- 不使用 tab 做 indentation。
- `${ENV:default}` 是 Spring property placeholder，不是 YAML 原生功能。

List：

```yaml
include:
  - health
  - info
```

或某些 Spring property 接受逗號字串：

```yaml
include: health,info
```

---

# 26. Spring Profiles

```yaml
spring:
  profiles:
    default: local
```

Files：

```text
application.yml
application-local.yml
```

心智模型：

```text
共同設定
application.yml
      +
local 專用覆寫
application-local.yml
```

WUT1 Local profile 使用 SQLite。

---

# 27. Hikari / DataSource / SQLite URL

Local configuration 會有 JDBC URL：

```text
jdbc:sqlite:./data/wut1-sample.db
```

Spring Boot 建 DataSource，Repository 透過 JdbcClient 使用。

教學重點不是背 Hikari parameter，而是知道：

```text
Repository
 ↓
JdbcClient
 ↓
DataSource / Connection Pool
 ↓
SQLite JDBC Driver
 ↓
.db file
```

---

# 28. Spring SQL Init

Local Standalone 版本會利用 Spring SQL initialization 載入：

```text
classpath:db/CURRENT_SCHEMA.sql
classpath:db/LOCAL_SAMPLE_DATA.sql
```

這是 **Local 教學環境例外**。

正式企業 DB 原則仍是：

```text
Application 不自行 migration Production Schema
DB schema change → 人工填單 / 審核 / 執行
Repo 只保留最新版 approved CURRENT_SCHEMA.sql
```

不要把 Local initialization 誤解成 Production Flyway。

---

# 29. Spring Actuator

設定：

```yaml
management:
  endpoints:
    web:
      exposure:
        include: health,info
```

會提供例如：

```text
/actuator/health
```

用途是 Operational Health，不是 Business API。

### 中文延伸閱讀

- [Spring Boot 中文文件：Actuator Endpoints](https://docs.springframework.org.cn/spring-boot/reference/actuator/endpoints.html)

---

# 30. Spring Modulith

Package：

```java
@org.springframework.modulith.ApplicationModule
package com.example.wut1sample.producttrading;
```

Architecture test：

```java
@Test
void verifiesModuleStructure() {
    ApplicationModules.of(SampleApplication.class).verify();
}
```

目的：把「架構規範」變成 executable rule。

可以檢查：

- Module cycle。
- 不合法的跨 module internal access。
- 額外宣告的 module dependency rule。

### 中文延伸閱讀

- [Spring Modulith 繁中：驗證應用程式模組結構](https://docs.springframework.tw/spring-modulith/reference/verification.html)

---

# 31. JUnit / Spring Boot Test / AssertJ

### `@Test`

```java
@Test
void calculatesTradeAmount() {
}
```

### Spring Integration Test

```java
@SpringBootTest
@ActiveProfiles("local")
class LocalSqliteIntegrationTest {
}
```

### Injection in Test

```java
@Autowired
ProductTradingService service;
```

### AssertJ

```java
assertThat(products).hasSize(5);
assertThat(result).isEqualByComparingTo("306550.00");
```

Exception assertion：

```java
assertThatThrownBy(() -> service.update(...))
    .isInstanceOf(ConflictException.class);
```

Test 教學必須強調：

> Agent 說「完成」不是證據；可重複執行的 test 才是證據的一部分。

---

# 32. Maven POM / XML

## 32.1 XML 基礎

```xml
<project>
  <groupId>com.example</groupId>
  <artifactId>wut1-it-app-template</artifactId>
  <version>1.0.0</version>
</project>
```

XML 是 element tree。

```text
<tag>value</tag>
```

---

## 32.2 Parent

```xml
<parent>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-parent</artifactId>
  <version>4.1.1</version>
</parent>
```

從 parent 繼承 Spring Boot dependency / plugin management。

---

## 32.3 Properties

```xml
<properties>
  <java.version>25</java.version>
  <node.version>v22.16.0</node.version>
</properties>
```

引用：

```xml
<version>${some.version}</version>
```

---

## 32.4 Modules

Root POM：

```xml
<packaging>pom</packaging>
<modules>
  <module>backend</module>
</modules>
```

這表示 root 主要是 build orchestration，不產 executable application。

---

## 32.5 Dependency

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-webmvc</artifactId>
</dependency>
```

Test scope：

```xml
<scope>test</scope>
```

---

## 32.6 Plugin / Execution

Frontend Maven Plugin 概念：

```text
Maven build
 ↓
安裝 Node/npm
 ↓
npm install
 ↓
npm run build
 ↓
Vite dist/
 ↓
copy 到 Spring Boot static/
 ↓
package JAR
```

XML 會看到：

```xml
<plugin>
  <executions>
    <execution>
      <phase>generate-resources</phase>
      <goals>
        <goal>npm</goal>
      </goals>
    </execution>
  </executions>
</plugin>
```

### Maven Lifecycle

常用：

```text
clean
compile
test
package
verify
```

`mvn package` 會依 lifecycle 跑前面必要 phase，不是只執行一個孤立動作。

### 中文延伸閱讀

- [Maven 中文：Build Lifecycle](https://maven.org.cn/guides/introduction/introduction-to-the-lifecycle.html)

---

# 33. Executable JAR

Build：

```powershell
.\mvnw.cmd clean package
```

Output：

```text
backend/target/wut1-it-app-template.jar
```

Run：

```powershell
java -jar backend\target\wut1-it-app-template.jar
```

Runtime：

```text
JAR
├─ Spring Boot code
├─ Embedded Tomcat
├─ Vue / React build 後的 static files
└─ classpath SQL sample files
```

所以 Production / standalone run 不需要啟動 Vite。


# Part V — IT Vue 路線：Vue 3 + TypeScript + Vite

## 34. Vue 路線先學什麼、不學什麼

這個專案使用：

```text
Vue 3
Composition API
<script setup>
TypeScript
Vue Router
Vite
Bootstrap 5
ECharts
```

第一階段**沒有**：

```text
Pinia
Nuxt
Vuex
Options API 為主的寫法
SSR
複雜 component framework
```

所以教學網站不要一開始把 Vue 生態全部塞給學員。

---

# 35. Vue Single File Component（SFC）

典型 `.vue`：

```vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">
    {{ count }}
  </button>
</template>

<style scoped>
/* optional */
</style>
```

一個檔案同時描述：

```text
<script>   行為 / State
<template> 畫面
<style>    樣式
```

WUT1 專案主要把共用 CSS 放在 `src/styles/`，不必每個 component 都寫 style。

### `<script setup lang="ts">`

- `setup`：Composition API 的簡化語法。
- `lang="ts"`：script 使用 TypeScript。
- script 中宣告的 variable / function 可以直接在 template 使用。

### 中文延伸閱讀

- [Vue 中文：Component 基礎](https://cn.vuejs.org/guide/essentials/component-basics)
- [Vue 中文：Template Syntax](https://cn.vuejs.org/guide/essentials/template-syntax)

---

# 36. Vue `ref()`

```typescript
const selectedProductId = ref<number | null>(null)
```

JavaScript 中實際 value：

```typescript
selectedProductId.value = 1
```

Template 會自動 unwrap：

```vue
<div>{{ selectedProductId }}</div>
```

### 使用時機

單一 reactive value：

```text
selectedProductId
loading
saving
error
```

### 中文延伸閱讀

- [Vue 中文：Reactivity Fundamentals](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals)

---

# 37. Vue `reactive()`

Form object：

```typescript
const form = reactive<ProductUpdateRequest>({
  prodName: '',
  prodCategory: '',
  prodStatus: 'ACTIVE',
  currencyCode: 'TWD',
  listPrice: 0,
  remark: null,
  rowVersion: ''
})
```

適合管理一組彼此相關的 form fields。

修改：

```typescript
form.prodName = 'New Name'
```

不要重新指定整個 `form` binding，而是修改 properties 或用 `Object.assign()`。

---

# 38. Vue `computed()`

```typescript
const selectedProduct = computed(() =>
  products.value.find(p => p.prodId === selectedProductId.value) ?? null
)
```

用途：

> 從既有 state **推導**新值，而不是再保存一份容易不同步的 state。

```text
products + selectedProductId
            ↓
      selectedProduct
```

### 中文延伸閱讀

- [Vue 中文：Computed](https://cn.vuejs.org/guide/essentials/computed)

---

# 39. Vue `watch()`

Product Form 會需要在 parent 換 Product 時同步 form：

```typescript
watch(
  () => props.product,
  product => {
    Object.assign(form, {
      prodName: product.prodName,
      // ...
    })
  },
  { immediate: true }
)
```

拆解：

```text
第一個參數  watch source
第二個參數  source 改變後執行
第三個參數  option
```

`immediate: true`：component 建立時先執行一次。

### 不要濫用 watch

能用 `computed()` 表達的 derived state，不要全部改成 `watch()` + 手動同步。

---

# 40. Vue Lifecycle：`onMounted()` / `onBeforeUnmount()`

ECharts wrapper：

```typescript
onMounted(() => {
  chart = echarts.init(container.value!)
})

onBeforeUnmount(() => {
  chart?.dispose()
})
```

心智模型：

```text
Component 建立 DOM
      ↓
onMounted
      ↓
建立 ECharts / ResizeObserver
      ↓
Component 要離開
      ↓
onBeforeUnmount
      ↓
dispose / cleanup
```

這是 resource lifecycle，不只是「Vue 語法」。

---

# 41. Vue Props：`defineProps`

```typescript
const props = defineProps<{
  product: Product
  saving: boolean
}>()
```

Parent：

```vue
<ProductMasterForm
  :product="product"
  :saving="saving"
/>
```

核心：

```text
Parent
  │ props
  ▼
Child
```

Child 不應直接任意修改 parent state。

### 中文延伸閱讀

- [Vue 中文：Props](https://cn.vuejs.org/guide/components/props)

---

# 42. Vue Events：`defineEmits`

Child：

```typescript
const emit = defineEmits<{
  save: [request: ProductUpdateRequest]
}>()

function submit() {
  emit('save', { ...form })
}
```

Parent：

```vue
<ProductMasterForm @save="saveProduct" />
```

資料方向：

```text
Parent → Child：Props
Child → Parent：Events
```

### 中文延伸閱讀

- [Vue 中文：Component Events](https://cn.vuejs.org/guide/components/events)

---

# 43. Vue Template Interpolation `{{ }}`

```vue
<td>{{ trading.tradeAmount }}</td>
```

`{{ expression }}`：把 JavaScript expression 結果渲染成文字。

不要放大量複雜 business calculation：

```vue
<!-- 不建議把正式金額規則塞這裡 -->
{{ quantity * unitPrice * someRule }}
```

Business Rule 應由 Backend 決定。

---

# 44. `v-bind` / `:`

完整：

```vue
<input v-bind:disabled="saving" />
```

簡寫：

```vue
<input :disabled="saving" />
```

Component prop：

```vue
<TradingDetailGrid :items="tradings" />
```

---

# 45. `v-on` / `@`

完整：

```vue
<button v-on:click="reload">Reload</button>
```

簡寫：

```vue
<button @click="reload">Reload</button>
```

Custom event：

```vue
<TradingDetailGrid @edit="openEdit" />
```

---

# 46. `@submit.prevent`

```vue
<form @submit.prevent="submit">
```

等於：

1. 聽 `submit` event。
2. 呼叫 `event.preventDefault()`。
3. 執行 `submit` function。

避免 browser 做傳統整頁 form submit。

---

# 47. `v-model`

```vue
<input v-model="form.prodName" />
```

概念上同時處理：

```text
input value ← state
input event → state
```

Number modifier：

```vue
<input type="number" v-model.number="form.listPrice" />
```

要求 Vue 嘗試把 input string 轉 number。

---

# 48. `v-if` / `v-else`

```vue
<LoadingPanel v-if="loading" />
<ErrorAlert v-else-if="error" :message="error" />
<div v-else>
  ...
</div>
```

這是 declarative conditional rendering。

---

# 49. `v-for` + `:key`

```vue
<tr
  v-for="item in tradings"
  :key="item.tradingId"
>
```

`:key` 讓 Vue 能穩定追蹤每一筆 list item 身分。

不要用 index 當 key，如果資料本身已有 stable id。

---

# 50. Vue Template Ref

ECharts container：

```typescript
const chartElement = ref<HTMLDivElement | null>(null)
```

Template：

```vue
<div ref="chartElement"></div>
```

Mounted 後：

```typescript
echarts.init(chartElement.value!)
```

### 中文延伸閱讀

- [Vue 中文：Template Refs](https://cn.vuejs.org/guide/essentials/template-refs)

---

# 51. Vue Router

Router config：

```typescript
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: 'master-detail',
          component: ProductTradingPage
        },
        {
          path: 'dashboard',
          component: ProductTradingDashboardPage
        }
      ]
    }
  ]
})
```

### `createWebHashHistory()`

URL 類似：

```text
http://localhost:8080/#/dashboard
```

優點是 static hosting / Spring Boot fallback 設定較簡單。

### `RouterLink`

```vue
<RouterLink to="/dashboard">Dashboard</RouterLink>
```

### `RouterView`

```vue
<RouterView />
```

表示目前 route 對應 component 的渲染位置。

### 中文延伸閱讀

- [Vue Router 中文指南](https://router.vuejs.org/zh/guide/)
- [Vue Router 中文 API](https://router.vuejs.org/zh/api/)

---

# 52. Vue API Client

不要在每個 component 到處：

```typescript
fetch('/api/...')
```

WUT1 抽成：

```text
feature component
       ↓
product-trading.api.ts
       ↓
shared/api/api-client.ts
       ↓
HTTP
```

典型：

```typescript
export async function getProducts(): Promise<Product[]> {
  return apiClient.get<Product[]>('/api/products')
}
```

目的：

- HTTP error handling 集中。
- Header / auth 未來容易統一。
- Component 專注 UI state。

---

# 53. Vue Master / Detail State Flow

Page：

```text
ProductTradingPage.vue
│
├─ products
├─ selectedProductId
├─ product
├─ tradings
├─ loading
└─ error
```

流程：

```text
Page mounted
   ↓
load products
   ↓
選第一筆 product
   ↓
load product + tradings
   ↓
props
 ┌─────────────┬──────────────┐
 ▼             ▼
Master Form   Detail Grid
```

Update：

```text
Form emit save
     ↓
Page call API
     ↓
Backend
     ↓
reload page state
```

這一頁是理解 Vue 「State owner」最重要的案例。

---

# 54. Vue Dashboard Drill-down

```text
ProductTradingDashboardPage.vue
│
├─ dashboard summary
├─ product aggregates
└─ selectedProductId
        │
        ├─ TradingDrilldownChart
        └─ TradingDrilldownGrid
```

Bar chart click：

```text
ECharts
 ↓ emit chart-click
ProductSummaryChart
 ↓ emit product-select
Dashboard Page
 ↓ selectedProductId 更新
Drill-down components 更新
```

這就是 Vue 相對 Handlebars 最值得學的概念：

> **不是手動找 DOM 再逐個 refresh，而是 State 改變 → UI 依 dependency 更新。**

---

# 55. Vite

`vite.config.ts` 概念：

```typescript
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  build: {
    outDir: 'dist'
  }
})
```

### Vite 在這個專案的兩個職責

```text
DEV
Source → Vite Dev Server / HMR → Browser

BUILD
Source → vite build → dist HTML/JS/CSS
```

Production 不需要 Vite server。

### `import.meta.env`

若未來需要 Vite environment variable，會用這個 namespace；目前 Sample 主要靠 dev proxy，避免 frontend 硬編 backend URL。

### 中文延伸閱讀

- [Vite 中文指南](https://vitejs.cn/vite5-cn/guide/)
- [Vite 中文：Production Build](https://vitejs.cn/vite5-cn/guide/build.html)

> 注意：這個中文鏡像頁面是較早版本的 Vite 文件；概念可用，特定 option 應以專案實際 Vite 版本與官方英文文件為準。

---

# 56. Vue ESLint

用途不是「格式漂亮」而已，而是讓一些常見錯誤在 CI / local verification 被機器擋掉。

Flat config 會看到：

```javascript
export default [
  // ...
]
```

以及 Vue / TypeScript plugin config。

教學重點：

```text
Compiler / Typecheck → 型別問題
ESLint               → coding / framework rule
Test                 → behavior
```

三者不同。

---

# 57. Vue Playwright E2E

```typescript
import { test, expect } from '@playwright/test'

test('可以切換產品並看到交易明細', async ({ page }) => {
  await page.goto('/#/master-detail')
  await expect(page.getByTestId('product-form')).toBeVisible()
})
```

會看到：

- `test(...)`
- `async ({ page }) => {}`
- `page.goto()`
- `page.getByTestId()`
- `page.getByRole()`
- `.click()` / `.fill()` / `.selectOption()`
- `expect(...).toBeVisible()`
- `expect(...).toContainText()`

### 中文延伸閱讀

- [Playwright 繁中：Writing Tests](https://playwright.tw/docs/writing-tests)
- [Playwright 繁中：Assertions](https://playwright.tw/docs/test-assertions)
- [Playwright 繁中：TypeScript](https://playwright.tw/docs/test-typescript)

---

# Part VI — IT React 路線：React + TypeScript + TanStack Query

## 58. React 路線先學什麼、不學什麼

使用：

```text
React
TypeScript / TSX
React Router
TanStack Query
Vite
Bootstrap 5
ECharts
```

刻意沒有：

```text
Redux
Zustand
Next.js
React Server Components
Tailwind
CSS-in-JS
```

核心規則：

```text
Server State → TanStack Query
Local UI State → React useState
Navigation / shareable state → Router / URL
```

---

# 59. JSX / TSX

最基本 React Component：

```tsx
export function Hello() {
  return <div>Hello</div>
}
```

TSX = TypeScript + JSX syntax。

### JSX 不是 HTML String

```tsx
const element = <button>Save</button>
```

Build tool 會把 JSX transform 成 React element creation logic。

### `className`

HTML：

```html
<div class="card">
```

React：

```tsx
<div className="card">
```

因為 JSX attribute 使用 JavaScript naming convention。

---

# 60. React `createRoot()` / `StrictMode`

`main.tsx`：

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('找不到 root')
}

createRoot(rootElement).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>
)
```

讀法：

```text
index.html #root
      ↓
createRoot
      ↓
render React component tree
```

`StrictMode` 是開發輔助工具，不是 Security Mode。

---

# 61. React Functional Component

```tsx
export function ProductMasterForm(props: Props) {
  return (...)
}
```

Destructuring props：

```tsx
export function ProductMasterForm({
  product,
  saving,
  onSave
}: Props) {
}
```

---

# 62. React Props Interface

```typescript
interface Props {
  product: Product
  saving: boolean
  onSave: (request: ProductUpdateRequest) => Promise<void>
}
```

資料仍然是：

```text
Parent → Props → Child
```

Event callback：

```text
Child → callback prop → Parent
```

---

# 63. `PropsWithChildren`

Providers：

```tsx
export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

`children` 就是：

```tsx
<AppProviders>
  <App />
</AppProviders>
```

中間的 `<App />`。

---

# 64. `useState()`

```tsx
const [selectedProductId, setSelectedProductId] =
  useState<number | null>(null)
```

拆解：

```text
selectedProductId       現值
setSelectedProductId    更新 function
```

更新：

```tsx
setSelectedProductId(1)
```

React 重新 render，依新 state 產生新的 UI 描述。

### 中文延伸閱讀

- [React 中文：useState](https://zh-hans.react.dev/reference/react/useState)

---

# 65. Controlled Form

```tsx
<input
  value={form.prodName}
  onChange={event =>
    setForm({
      ...form,
      prodName: event.target.value
    })
  }
/>
```

Vue 的：

```vue
v-model="form.prodName"
```

React 通常拆成：

```text
value      State → UI
onChange   UI → State
```

這是學 React 最重要的認知差異之一。

---

# 66. `FormEvent` / `preventDefault()`

```tsx
function submit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()
  onSave(form)
}
```

Template：

```tsx
<form onSubmit={submit}>
```

---

# 67. Conditional Rendering

### `if`

```tsx
if (query.isPending) {
  return <LoadingPanel />
}
```

### Ternary

```tsx
{error ? <ErrorAlert message={error} /> : <Content />}
```

### `&&`

```tsx
{selectedProduct && (
  <ProductMasterForm product={selectedProduct} />
)}
```

### 中文延伸閱讀

- [React 中文：條件渲染](https://zh-hans.react.dev/learn/conditional-rendering)

---

# 68. List Rendering `.map()` + `key`

```tsx
<tbody>
  {tradings.map(item => (
    <tr key={item.tradingId}>
      <td>{item.tradeDate}</td>
    </tr>
  ))}
</tbody>
```

React 不提供 `v-for`；使用 JavaScript Array `.map()`。

`key` 與 Vue 相同概念：穩定識別 list item。

---

# 69. `useEffect()`

ECharts / browser API 等 side effect：

```tsx
useEffect(() => {
  const chart = echarts.init(elementRef.current!)

  return () => {
    chart.dispose()
  }
}, [])
```

### Dependency Array

```tsx
useEffect(() => {
  // effect
}, [option])
```

意思：`option` dependency 改變後重新執行 effect。

### Cleanup

Effect return function：

```tsx
return () => {
  observer.disconnect()
}
```

Component unmount 或重新執行 effect 前 cleanup。

### 不要拿 `useEffect + fetch` 當預設 Server State 解法

WUT1 React Template 已指定：

```text
Server State → TanStack Query
```

`useEffect` 主要保留給真正 external system synchronization，例如 ECharts / ResizeObserver。

### 中文延伸閱讀

- [React 中文：useEffect](https://zh-hans.react.dev/reference/react/useEffect)

---

# 70. `useRef()`

DOM ref：

```tsx
const elementRef = useRef<HTMLDivElement | null>(null)
```

JSX：

```tsx
<div ref={elementRef} />
```

也可以保存「不需要觸發 render」的 mutable value：

```tsx
const clickHandlerRef = useRef(onChartClick)
clickHandlerRef.current = onChartClick
```

---

# 71. `useMemo()`

```tsx
const chartOption = useMemo(() => ({
  // ...
}), [data])
```

用途：cache calculation/object identity。

不要把每個簡單 expression 都包 `useMemo()`；只有 dependency / expensive compute / identity 有理由時使用。

---

# 72. Inline Expression / Style Object

```tsx
<div style={{ height: `${height}px` }} />
```

JSX `{}` 內是 JavaScript expression。

Object literal：

```typescript
{ height: '320px' }
```

---

# 73. Optional Callback

```typescript
interface Props {
  onChartClick?: (params: unknown) => void
}
```

呼叫：

```typescript
onChartClick?.(params)
```

---

# 74. React Router

```tsx
export const router = createHashRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/master-detail" replace />
      },
      {
        path: 'master-detail',
        element: <ProductTradingPage />
      },
      {
        path: 'dashboard',
        element: <ProductTradingDashboardPage />
      }
    ]
  }
])
```

Layout：

```tsx
<Outlet />
```

Navigation：

```tsx
<NavLink to="/dashboard">Dashboard</NavLink>
```

Router Provider：

```tsx
<RouterProvider router={router} />
```

Hash route 的理由與 Vue 相同：Standalone static resource hosting 容易。

### 中文延伸閱讀

- [React Router 繁中參考站](https://router.react.com.tw/api/data-routers/createBrowserRouter)

> React Router 版本演進快，教學網站應以「route tree / layout / navigation / URL state」概念為主，API 細節需對照專案鎖定版本。

---

# 75. TanStack Query：為什麼 React 版多這一層

React 本身不替你管理 Server State cache / refetch / mutation lifecycle。

WUT1 定義：

```text
Backend data
    ↓
TanStack Query
    ↓
React Component
```

而不是：

```text
useEffect
+ fetch
+ loading state
+ error state
+ cache
+ refresh
+ mutation
全部自己寫
```

---

# 76. `QueryClient` / `QueryClientProvider`

```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
      refetchOnWindowFocus: false
    },
    mutations: {
      retry: false
    }
  }
})
```

Provider：

```tsx
<QueryClientProvider client={queryClient}>
  {children}
</QueryClientProvider>
```

### Numeric Separator

```typescript
30_000
```

等於 `30000`，底線只是提高可讀性。

---

# 77. Query Key

```typescript
export const productTradingKeys = {
  all: ['product-trading'] as const,
  products: () => [...productTradingKeys.all, 'products'] as const,
  product: (id: number) =>
    [...productTradingKeys.all, 'product', id] as const
}
```

Query Key 就像 Server State 的 identity/address。

---

# 78. `useQuery()`

```tsx
export function useProducts() {
  return useQuery({
    queryKey: productTradingKeys.products(),
    queryFn: productTradingApi.getProducts
  })
}
```

Dependent query：

```tsx
export function useProduct(prodId: number | null) {
  return useQuery({
    queryKey:
      prodId === null
        ? [...productTradingKeys.all, 'product', 'none']
        : productTradingKeys.product(prodId),
    queryFn: () => productTradingApi.getProduct(prodId as number),
    enabled: prodId !== null
  })
}
```

重要 property：

- `queryKey`
- `queryFn`
- `enabled`
- 回傳的 `data`
- `isPending`
- `error`

### 中文延伸閱讀

- [TanStack Query 中文：Quick Start](https://tanstack.com.cn/query/latest/docs/framework/react/quick-start)
- [TanStack Query 中文：Query Functions](https://tanstack.com.cn/query/latest/docs/framework/react/guides/query-functions)

---

# 79. `useMutation()`

```tsx
return useMutation({
  mutationFn: ({ prodId, request }) =>
    productTradingApi.updateProduct(prodId, request),
  onSuccess: invalidate
})
```

使用：

```tsx
await mutation.mutateAsync({
  prodId,
  request
})
```

Query 是「讀 Server State」，Mutation 是「改 Server State」。

### 中文延伸閱讀

- [TanStack Query 中文：Mutations](https://tanstack.com.cn/query/latest/docs/framework/react/guides/mutations)

---

# 80. `useQueryClient()` / `invalidateQueries()`

```tsx
const queryClient = useQueryClient()

await queryClient.invalidateQueries({
  queryKey: productTradingKeys.all
})
```

意思：

> mutation 成功後，標記相關 query data 已經舊了，讓 query 機制重新取得正確 server state。

這比手動：

```text
setProducts
setProduct
setTradings
setDashboard
...
```

逐個同步更穩定。

---

# 81. React Master / Detail State Flow

```text
ProductTradingPage
│
├─ Local UI State
│    selectedProductId → useState
│
├─ Server State
│    products          → useProducts()
│    product           → useProduct(id)
│    tradings          → useTradings(id)
│
└─ Mutation
     updateProduct     → useUpdateProduct()
     createTrading     → useCreateTrading()
```

這一頁是理解 React Golden Path 的關鍵：

> **不是所有東西都塞 `useState()`。**

---

# 82. React ECharts Wrapper

核心 pattern：

```tsx
const elementRef = useRef<HTMLDivElement | null>(null)

useEffect(() => {
  if (!elementRef.current) return

  const chart = echarts.init(elementRef.current)
  chart.setOption(option)

  const observer = new ResizeObserver(() => chart.resize())
  observer.observe(elementRef.current)

  return () => {
    observer.disconnect()
    chart.dispose()
  }
}, [])
```

另一個 effect 更新 option：

```tsx
useEffect(() => {
  chartRef.current?.setOption(option, true)
}, [option])
```

這是典型「React 管 component lifecycle、ECharts 管自己的 imperative chart instance」整合。

---

# 83. React Vite / ESLint / Playwright

Vite 的角色與 Vue 相同：

```text
DEV → HMR / Proxy
BUILD → TSX/TS → HTML/JS/CSS dist
```

差異只在 plugin：

```typescript
plugins: [react()]
```

Playwright test 的語法也與 Vue 版幾乎相同，因為 E2E test 測的是 Browser behavior，不應依賴 Vue / React internals。

這也是一個重要架構觀念：

> **好的 E2E test 可以在前端 framework 替換時大量沿用。**


# Part VII — Citizen Python 路線

## 84. Citizen 路線先學什麼、不學什麼

這一套不是「比較簡陋的 IT Application」，而是刻意為不同 Owner / Risk Level 設計：

```text
Python
FastAPI
Pydantic
Jinja2
Bootstrap 5
Vanilla JavaScript
ECharts
SQLite
pytest
```

第一階段不教：

```text
React / Vue
Vite / npm
Redux / Pinia
ORM
Microservices
複雜前端 build chain
```

主要工作流：

```text
Business Problem
      ↓
SPEC.md
      ↓
Agent Implementation
      ↓
Automated Verification
      ↓
Human Business Review
```

---

# 85. Python Module / Import

```python
from __future__ import annotations

from pathlib import Path
from decimal import Decimal
import sqlite3
```

Alias：

```python
from app.features.product_trading.routes import (
    router as product_trading_router,
)
```

概念與 Java import 類似，但 Python module 直接對應 `.py` file / package。

### 中文延伸閱讀

- [Python 官方繁中教學](https://docs.python.org/zh-tw/3/tutorial/index.html)

---

# 86. Variable / Constant Convention

```python
PROJECT_ROOT = Path(__file__).resolve().parents[1]
DATABASE_PATH = PROJECT_ROOT / "data" / "wut1-sample.db"
```

Python 沒有語言層級真正 immutable constant；全大寫是 convention。

---

# 87. Function

```python
def calculate_trade_amount(
    quantity: Decimal,
    unit_price: Decimal,
) -> Decimal:
    return quantity * unit_price
```

語法：

```text
def function_name(parameter: Type) -> ReturnType:
    body
```

Python block 由 indentation 決定，不使用 `{}`。

---

# 88. Type Hints

專案中會看到：

```python
str
int
Decimal
Path
list[Product]
Sequence[Trading]
Iterator[sqlite3.Connection]
str | None
Path | None
Literal["ACTIVE", "INACTIVE"]
Any
```

### Union

```python
str | None
```

等於「string 或 None」。

### Generic collection

```python
list[Product]
```

### `Literal`

```python
ProductStatus = Literal["ACTIVE", "INACTIVE"]
```

把 String 合法值縮小。

Type hint 不會把 Python 變成 Java static compiler；所以專案搭配 `mypy` / Pydantic / test 做 guardrail。

---

# 89. Class

```python
class ProductTradingService:
    def __init__(self, repository: ProductTradingRepository):
        self.repository = repository
```

### `self`

目前 instance。

### Constructor

Python 初始化 method 是：

```python
__init__
```

---

# 90. Inheritance

Pydantic：

```python
class Product(BaseModel):
    prod_id: int
    prod_code: str
```

Exception：

```python
class NotFoundError(RuntimeError):
    pass
```

`pass`：語法上需要一個 statement，但這裡沒有其他內容。

---

# 91. Dataclass

```python
@dataclass(frozen=True)
class AppConfig:
    database_path: Path
```

`@dataclass` 自動產生常見 constructor / repr / equality behavior。

`frozen=True`：建立後不應修改 fields。

---

# 92. Decorator

Python `@...` 是 decorator syntax。

專案會看到：

```python
@router.get(...)
@router.post(...)
@app.get(...)
@app.exception_handler(...)
@contextmanager
@asynccontextmanager
@pytest.fixture
@staticmethod
@dataclass(...)
```

Decorator 的概念是：

> 用另一個 callable 包裝 / 登記原 function 或 class，加入額外行為或 metadata。

不要因為 Java annotation 也用 `@` 就認為兩者底層機制相同。

---

# 93. `if` / `else`

```python
if product is None:
    raise NotFoundError("找不到產品")
else:
    return product
```

Inline conditional：

```python
product = _product(row) if row else None
```

---

# 94. List Comprehension

```python
return [_product(row) for row in rows]
```

等價概念：

```python
result = []
for row in rows:
    result.append(_product(row))
```

適合簡單 mapping，不要把複雜多層 business logic 全塞 comprehension。

---

# 95. Context Manager：`with`

```python
with connection() as conn:
    rows = conn.execute(sql).fetchall()
```

核心：

```text
取得 resource
 ↓
with block
 ↓
自動執行 cleanup
```

DB connection / file 等 resource 很適合。

---

# 96. Generator / `yield`

DB helper 可以：

```python
@contextmanager
def connection() -> Iterator[sqlite3.Connection]:
    conn = sqlite3.connect(...)
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()
```

`yield` 暫停 function，把 resource 交給 `with` block；退出後繼續 cleanup code。

---

# 97. `try / except / finally / raise`

```python
try:
    yield conn
    conn.commit()
except Exception:
    conn.rollback()
    raise
finally:
    conn.close()
```

Bare `raise`：重新拋出目前正在處理的 exception。

---

# 98. `assert`

Test：

```python
assert response.status_code == 200
assert len(response.json()) == 5
```

Application production validation 不應依賴 `assert`；test assertion 與 runtime input validation 是不同責任。

---

# 99. F-string

```python
message = f"找不到 Product: {prod_id}"
```

與 JavaScript template literal、Java formatted log 類似，但語法不同。

---

# 100. Dictionary / Keyword Arguments / `**`

```python
payload = {
    "prod_id": 1,
    "prod_name": "Motor Treaty",
}
```

Function keyword arguments：

```python
write_audit(action="UPDATE_PRODUCT", prod_id=prod_id)
```

Dictionary unpacking：

```python
write_audit("UPDATE", **fields)
```

---

# 101. `Path` / Path Operator `/`

```python
PROJECT_ROOT / "data" / "wut1-sample.db"
```

這裡 `/` 是 `pathlib.Path` overload，不是數學除法。

---

# 102. Environment Variable

```python
import os

path = os.getenv("SQLITE_DB_PATH", "data/wut1-sample.db")
```

Test 也可能：

```python
os.environ["SQLITE_DB_PATH"] = str(tmp_path / "test.db")
```

---

# 103. Decimal

```python
from decimal import Decimal, ROUND_HALF_UP

amount = (
    quantity * unit_price
).quantize(
    Decimal("0.01"),
    rounding=ROUND_HALF_UP,
)
```

與 Java `BigDecimal` 相同目的：正式金額不要用 binary floating point。

---

# 104. Date

```python
trade_date = date.fromisoformat("2026-09-25")
text = trade_date.isoformat()
```

API / DB 之間用 ISO date format 可降低 ambiguous format。

---

# 105. Pydantic `BaseModel`

```python
class ProductUpdateRequest(BaseModel):
    prod_name: str = Field(min_length=1, max_length=100)
    list_price: Decimal = Field(ge=0)
    remark: str | None = Field(default=None, max_length=500)
```

Pydantic 同時提供：

- 資料 parsing。
- Type validation。
- Constraint validation。
- JSON Schema / FastAPI OpenAPI integration。

### `Field()`

專案用到：

```text
min_length
max_length
ge       greater than or equal
 gt      greater than
default
```

### `Literal`

```python
prod_status: Literal["ACTIVE", "INACTIVE"]
```

### 中文延伸閱讀

- [Pydantic 中文文件](https://pydantic.com.cn/)

---

# 106. FastAPI Application

```python
app = FastAPI(
    title="WUT1 Citizen Sample",
    lifespan=lifespan,
)
```

### `async def`

FastAPI endpoint/lifespan 可能看到：

```python
async def lifespan(app: FastAPI):
```

要理解 async syntax，但不要誤以為所有 function 都必須 async。

---

# 107. FastAPI Lifespan

```python
@asynccontextmanager
async def lifespan(app: FastAPI):
    initialize_database()
    yield
```

用途：Application startup / shutdown lifecycle。

WUT1 Local Standalone 在 startup 初始化 local SQLite sample。

---

# 108. `APIRouter`

```python
router = APIRouter()
```

Route：

```python
@router.get("/api/products")
def get_products():
    return service.get_products()
```

Main：

```python
app.include_router(product_trading_router)
```

目的：不要把整個網站 endpoint 全塞 `main.py`。

---

# 109. FastAPI Route Decorators

專案主要使用：

```python
@router.get(...)
@router.post(...)
@router.put(...)
@router.delete(...)
```

Response model：

```python
@router.get(
    "/api/products",
    response_model=list[Product],
)
```

Status code：

```python
@router.post(
    "/api/products/{prod_id}/trading",
    status_code=201,
)
```

---

# 110. FastAPI Path Parameter

```python
@router.get("/api/products/{prod_id}")
def get_product(prod_id: int):
```

FastAPI 根據 function type hint 將 path text parse 成 integer，失敗會回 validation error。

---

# 111. Request Body + Pydantic

```python
@router.put("/api/products/{prod_id}")
def update_product(
    prod_id: int,
    request: ProductUpdateRequest,
):
```

HTTP JSON：

```text
 ↓
Pydantic validate
 ↓
ProductUpdateRequest
 ↓
Service
```

### 中文延伸閱讀

- [FastAPI 繁中：Tutorial](https://fastapi.tiangolo.com/zh-hant/tutorial/)
- [FastAPI 繁中：Request Body](https://fastapi.tiangolo.com/zh-hant/tutorial/body/)

---

# 112. `Request` / HTML Response / Template

```python
from fastapi import Request
from fastapi.responses import HTMLResponse

@router.get(
    "/master-detail",
    response_class=HTMLResponse,
)
def master_detail(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="master_detail.html",
        context={"page_title": "Master / Detail"},
    )
```

這就是 Server-side Rendering：

```text
Browser request
 ↓
FastAPI
 ↓
Jinja2 template + data
 ↓
完整 HTML
 ↓
Browser
```

### 中文延伸閱讀

- [FastAPI 繁中：Templates](https://fastapi.tiangolo.com/zh-hant/advanced/templates/)

---

# 113. Static Files

```python
app.mount(
    "/static",
    StaticFiles(directory=STATIC_DIR),
    name="static",
)
```

Jinja：

```jinja2
{{ url_for('static', path='/css/app.css') }}
```

### 中文延伸閱讀

- [FastAPI 繁中：Static Files](https://fastapi.tiangolo.com/zh-hant/tutorial/static-files/)

---

# 114. Redirect / JSON Response

Redirect：

```python
return RedirectResponse(url="/master-detail")
```

Custom error JSON：

```python
return JSONResponse(
    status_code=404,
    content={"message": str(exc)},
)
```

---

# 115. FastAPI Exception Handler

```python
@app.exception_handler(NotFoundError)
async def handle_not_found(request, exc):
    return JSONResponse(
        status_code=404,
        content={"message": str(exc)},
    )
```

目的與 Spring `@RestControllerAdvice` 類似：統一 error → HTTP contract。

---

# 116. Jinja2 Variable：`{{ }}`

```jinja2
<title>{{ page_title }}</title>
```

與 Vue Mustache 長得很像，但 runtime 完全不同：

```text
Jinja2：Server render HTML 後送到 Browser
Vue：Browser 裡 reactive render
```

這是 JSP 工程師最容易理解但也最需要分清楚的一點。

---

# 117. Jinja2 Template Inheritance

Base：

```jinja2
<!doctype html>
<html>
<head>
  {% block head %}{% endblock %}
</head>
<body>
  {% block content %}{% endblock %}
  {% block scripts %}{% endblock %}
</body>
</html>
```

Child：

```jinja2
{% extends "base.html" %}

{% block content %}
  <h1>Master / Detail</h1>
{% endblock %}
```

用來避免每頁重複 HTML skeleton。

### 中文延伸閱讀

- [Jinja 中文：Template Designer](https://jinja.flask.org.cn/en/3.1.x/templates/)
- [FastAPI 繁中：Jinja2 Templates](https://fastapi.tiangolo.com/zh-hant/advanced/templates/)

---

# 118. Citizen HTML + JavaScript 邊界

Jinja 先輸出基本頁面：

```text
Header
Navigation
Form skeleton
Table skeleton
Chart container
```

JavaScript 再處理：

```text
load data
save data
modal / panel state
chart interaction
partial UI update
```

這不是 SPA；它是：

> **Server-render first + progressive enhancement / local interaction。**

---

# 119. Vanilla JS `fetch()` Wrapper

```javascript
async function api(url, options = {}) {
  const response = await fetch(url, options)
  const body = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(body?.message ?? 'Request failed')
  }

  return body
}
```

專案需要理解：

- default parameter `options = {}`。
- `fetch()`。
- `response.ok`。
- `.json()` 回 Promise。
- `.catch(...)`。
- optional chaining / nullish coalescing。
- `throw new Error()`。

---

# 120. Vanilla JS DOM 更新

```javascript
const nameInput = document.getElementById('prod-name')
nameInput.value = product.prodName
```

Text：

```javascript
message.textContent = '儲存完成'
```

Class：

```javascript
alert.className = 'alert alert-success'
alert.classList.remove('d-none')
```

Form reset：

```javascript
form.reset()
```

---

# 121. Event Listener

```javascript
form.addEventListener('submit', async event => {
  event.preventDefault()
  await save()
})
```

Resize：

```javascript
window.addEventListener('resize', () => {
  chart.resize()
})
```

---

# 122. Event Delegation / `dataset`

Grid 上很多 row button，不一定每個都個別 register listener：

```javascript
grid.addEventListener('click', event => {
  const button = event.target.closest('button[data-action]')
  if (!button) return

  const action = button.dataset.action
  const id = Number(button.dataset.id)
})
```

HTML：

```html
<button
  data-action="edit"
  data-id="123"
>
  編輯
</button>
```

---

# 123. Vanilla JS Master / Detail State

```javascript
const state = {
  products: [],
  selectedProductId: null,
  tradings: []
}
```

這正是 Vue / React 解決得更系統化的問題。

Citizen Sample UI 複雜度刻意有限，所以這種小型 state object 可接受；如果開始自己造：

```text
subscribe
emit
store
selector
component registry
```

就代表應考慮升級到 Advanced Application / IT stack。

---

# 124. Python `sqlite3`

Connection：

```python
conn = sqlite3.connect(database_path)
conn.row_factory = sqlite3.Row
```

Foreign key：

```python
conn.execute("PRAGMA foreign_keys = ON")
```

Query：

```python
rows = conn.execute(
    """
    SELECT PROD_ID, PROD_CODE, PROD_NAME
    FROM SAMPLE_PROD
    ORDER BY PROD_CODE
    """
).fetchall()
```

Parameterized SQL：

```python
row = conn.execute(
    "SELECT * FROM SAMPLE_PROD WHERE PROD_ID = ?",
    (prod_id,),
).fetchone()
```

注意 `(prod_id,)` 的逗號：Python 單一元素 tuple。

Update：

```python
cursor = conn.execute(sql, params)
if cursor.rowcount == 0:
    raise ConflictError(...)
```

Auto ID：

```python
trading_id = cursor.lastrowid
```

Initialize script：

```python
conn.executescript(schema_sql)
```

Transaction：

```python
conn.commit()
conn.rollback()
```

### 中文延伸閱讀

- [Python 官方：sqlite3 中文文件](https://docs.python.org/zh-tw/3/library/sqlite3.html)

---

# 125. pytest

Fixture：

```python
@pytest.fixture
def client(tmp_path):
    # setup
    with TestClient(app) as test_client:
        yield test_client
```

Test：

```python
def test_get_products(client):
    response = client.get('/api/products')

    assert response.status_code == 200
    assert len(response.json()) == 5
```

Temp Path：

```python
tmp_path / "test.db"
```

讓 test 不污染正式 local sample DB。

---

# 126. FastAPI `TestClient`

```python
from fastapi.testclient import TestClient

with TestClient(app) as client:
    response = client.get('/api/products')
```

這是 Application Integration Test，不必真的另外啟一個外部 server process。

---

# 127. Python Playwright

E2E：

```python
playwright = pytest.importorskip("playwright.sync_api")

with playwright.sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto(base_url)
    page.get_by_text("Dashboard").click()
    browser.close()
```

`pytest.importorskip()`：如果 optional E2E dependency 沒安裝，test 可以標示 skip，而不是 import 時直接炸掉。

---

# 128. `pyproject.toml`

TOML 基礎：

```toml
[project]
name = "wut1-citizen-python-template"
version = "1.0.0"

[tool.pytest.ini_options]
testpaths = ["tests"]

[tool.ruff]
line-length = 100

[tool.mypy]
python_version = "3.13"
strict = true
```

語法：

```text
[section]
key = value
array = ["a", "b"]
boolean = true
```

### Tool 分工

```text
pytest → Behavior
Ruff   → lint / code rule
mypy   → static type analysis
```

---

# Part VIII — Scripts 與 Build Tooling

## 129. PowerShell 語法

Windows 教學環境大量使用 `.ps1`。

### Error policy

```powershell
$ErrorActionPreference = 'Stop'
```

讓很多非 terminating error 也中止 script。

### Variable

```powershell
$RootDir = Resolve-Path "$PSScriptRoot\.."
```

PowerShell variable 使用 `$`。

### `$PSScriptRoot`

目前 script 所在 directory。

### Path

```powershell
$Jar = Join-Path $RootDir 'backend\target\app.jar'
```

### `if`

```powershell
if (-not (Test-Path $Jar)) {
    throw "找不到 JAR"
}
```

### Create Directory

```powershell
New-Item -ItemType Directory -Force $DataDir | Out-Null
```

Pipeline `|`：把前一個 command output 傳給下一個 command。

### Location stack

```powershell
Push-Location $RootDir
try {
    .\mvnw.cmd clean package
}
finally {
    Pop-Location
}
```

### Execute external command

```powershell
java -jar $Jar
```

### 中文延伸閱讀

- [Microsoft Learn 繁中：PowerShell Functions](https://learn.microsoft.com/zh-tw/powershell/module/microsoft.powershell.core/about/about_functions?view=powershell-7.6)

---

# 130. POSIX Shell 語法

Linux/macOS `.sh`：

```sh
#!/usr/bin/env sh
set -eu
```

- `-e`：command fail 就停止。
- `-u`：使用未定義 variable 就 fail。

### Variable

```sh
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
```

### Command substitution

```sh
$(command)
```

### File test

```sh
if [ ! -f "$JAR" ]; then
  printf '%s\n' "找不到 JAR" >&2
  exit 1
fi
```

### Directory

```sh
mkdir -p "$DATA_DIR"
cd "$ROOT_DIR"
```

### `exec`

```sh
exec java -jar "$JAR"
```

用 Java process 取代目前 shell process。

---

# Part IX — 設定檔語法總覽

## 131. `package.json`

Vue / React：

```json
{
  "name": "frontend",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "..."
  },
  "dependencies": {},
  "devDependencies": {},
  "engines": {
    "node": ">=22.16.0"
  }
}
```

### `type: module`

JavaScript 使用 ESM semantics：

```javascript
import ... from ...
export ...
```

### scripts

```powershell
npm run dev
npm run build
npm run typecheck
npm run lint
```

只是一個命令名稱對 shell command 的 map。

---

# 132. `tsconfig.json`

重要 option：

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "noEmit": true
  }
}
```

React 還會設定 JSX mode，例如：

```json
"jsx": "react-jsx"
```

主要目的：

- 指定 JavaScript target。
- module handling。
- strict type checking。
- typecheck-only，不直接由 `tsc` 產 build asset；build 交給 Vite。

---

# 133. `.editorconfig`

用來讓 IDE / Agent / Editor 對：

```text
indent
charset
line endings
trim whitespace
```

取得基本一致，不要靠每個人手動設定。

---

# 134. `.gitignore`

目的：不要把 runtime / build / secret / local artifact 全 commit。

例如：

```text
node_modules/
dist/
target/
data/*.db
__pycache__/
.pytest_cache/
```

`data/wut1-sample.db` 在下載 Review ZIP 可以附帶，但不代表它應成為 Git source of truth；Schema source of truth 是 `database/CURRENT_SCHEMA.sql`。

---

# Part X — 同一個功能，三種寫法怎麼對照

## 135. 「顯示 Product Name」

### Vue

```vue
<input v-model="form.prodName" />
```

### React

```tsx
<input
  value={form.prodName}
  onChange={e =>
    setForm({ ...form, prodName: e.target.value })
  }
/>
```

### Citizen Jinja + JS

Server initial render：

```jinja2
<input id="prod-name" value="{{ product.prod_name }}" />
```

或 API load 後：

```javascript
document.getElementById('prod-name').value = product.prod_name
```

### 要學的不是誰最短

而是三種 State model：

```text
Vue      Reactive binding
React    Explicit state + event
Jinja    Server render；局部互動用 DOM
```

---

## 136. 「切換 Product 後刷新 Trading」

### Vue

```text
selectedProductId ref 改變
        ↓
watch / page function
        ↓
API
        ↓
tradings ref 更新
        ↓
Grid 自動 render
```

### React

```text
setSelectedProductId(id)
        ↓
useTradings(id)
queryKey 改變
        ↓
TanStack Query fetch/cache
        ↓
Component render
```

### Citizen

```text
selectedProductId = id
        ↓
fetch('/api/...')
        ↓
拿 JSON
        ↓
手動更新 DOM/table
```

---

## 137. 「Dashboard 點 Bar → Drill-down」

### Vue

```text
EChart emits click
 → Child emit
 → Parent selectedProductId ref
 → drill-down props / request 更新
```

### React

```text
EChart callback
 → setSelectedProductId
 → dependent query keys
 → drill-down components 更新
```

### Citizen

```text
chart.on('click')
 → state.selectedProductId = ...
 → Promise.all(fetch monthly, fetch trades)
 → setOption + innerHTML/DOM update
```

這一頁非常適合做互動式教學動畫。

---

# Part XI — Syntax Index：看到符號時應該想到什麼

## 138. Java Syntax Index

| Syntax | 意義 | 主要出現位置 |
|---|---|---|
| `package` | Package 宣告 | 所有 Java file |
| `import` | 引用 Type | 所有 Java file |
| `import static` | Static member import | Test |
| `class` | Class | Service / Repository / Error |
| `record` | Immutable data carrier | DTO / Command / Domain |
| `interface` | Contract | Repository |
| `enum` | 有限值集合 | Status / TradeType |
| `extends` | Inheritance | Exception |
| `implements` | 實作 interface | JDBC repository |
| `public/private` | Visibility | 各 class |
| `static` | Class-level member | main / logger |
| `final` | 不重新 assign | dependencies/logger |
| `new` | 建 object | mapping / exceptions |
| `this` | Current instance | constructors/method refs |
| `<T>` | Generic | List/Optional/Map |
| `Optional<T>` | 可能無值 | Repository lookup |
| `List<T>` | List | API / Repository |
| `Map<K,V>` | Key-value | Error detail |
| `var` | Local type inference | Service/Test |
| `->` | Lambda | stream / callbacks |
| `::` | Method reference | mapper |
| `.stream()` | Stream pipeline | mapping |
| `.map()` | Transform | mapping |
| `.toList()` | Collect | API mapping |
| `.orElseThrow()` | Optional absent → exception | Service |
| `if` | Branch | Validation/concurrency |
| `? :` | Ternary | simple conditional |
| `throw` | Throw exception | service/error |
| `try/catch/finally` | Exception/resource flow | infrastructure |
| `"""` | Text block | SQL |
| `@Override` | Override verification | repository/exceptions |
| `BigDecimal` | Decimal arithmetic | money |
| `LocalDate` | Date only | trade date |
| `Instant` | UTC instant | audit timestamp |

---

## 139. Spring Annotation Index

| Syntax | 作用 |
|---|---|
| `@SpringBootApplication` | Boot application entry |
| `@RestController` | REST controller |
| `@RequestMapping` | URL prefix / mapping |
| `@GetMapping` | GET endpoint |
| `@PostMapping` | POST endpoint |
| `@PutMapping` | PUT endpoint |
| `@DeleteMapping` | DELETE endpoint |
| `@PathVariable` | URL path value |
| `@RequestBody` | JSON body → object |
| `@RequestParam` | Query/request parameter |
| `@ResponseStatus` | Response status |
| `@Valid` | Bean validation |
| `@Validated` | Spring validation |
| `@NotBlank` | Nonblank string |
| `@NotNull` | Non-null |
| `@Size` | Length/size |
| `@Pattern` | Regex |
| `@DecimalMin` | Decimal minimum |
| `@Service` | Service bean |
| `@Repository` | Repository bean |
| `@Component` | General bean |
| `@Transactional` | Transaction boundary |
| `@RestControllerAdvice` | Global REST advice |
| `@ExceptionHandler` | Exception mapping |
| `@Value` | Config injection |
| `@SpringBootTest` | Boot integration test |
| `@Autowired` | Inject dependency in test/sample |
| `@ActiveProfiles` | Activate profile |
| `@TestPropertySource` | Test config override |
| `@ApplicationModule` | Modulith module metadata |
| `@Test` | JUnit test |

---

## 140. Vue Syntax Index

| Syntax | 作用 |
|---|---|
| `<script setup lang="ts">` | SFC Composition API + TS |
| `<template>` | UI template |
| `ref()` | Reactive scalar/reference |
| `.value` | Script 中取 ref value |
| `reactive()` | Reactive object |
| `computed()` | Derived state |
| `watch()` | Observe change + side effect |
| `onMounted()` | Mounted lifecycle |
| `onBeforeUnmount()` | Cleanup lifecycle |
| `defineProps<T>()` | Typed props |
| `defineEmits<T>()` | Typed component events |
| `{{ expr }}` | Text interpolation |
| `:prop` | `v-bind` shorthand |
| `@event` | `v-on` shorthand |
| `@submit.prevent` | event + preventDefault |
| `v-model` | Two-way form binding |
| `v-model.number` | Input number coercion |
| `v-if` | Conditional |
| `v-else-if` | Conditional |
| `v-else` | Conditional |
| `v-for` | List rendering |
| `:key` | Stable list identity |
| `ref="name"` | Template DOM ref |
| `<RouterLink>` | Navigation |
| `<RouterView>` | Route outlet |
| `createRouter()` | Router instance |
| `createWebHashHistory()` | Hash history |

---

## 141. React Syntax Index

| Syntax | 作用 |
|---|---|
| `function Component()` | Functional Component |
| `<Component />` | JSX component |
| `{expression}` | JSX expression |
| `className` | CSS class |
| `value={...}` | Controlled value |
| `onChange={...}` | Change event |
| `onSubmit={...}` | Submit event |
| `.map(...)` | List render |
| `key={id}` | Stable list identity |
| `condition ? A : B` | Conditional render |
| `condition && <X/>` | Conditional render |
| `useState()` | Local UI state |
| `useEffect()` | External side effect |
| `useRef()` | DOM / mutable ref |
| `useMemo()` | Memoized derived value |
| `PropsWithChildren` | Provider children type |
| `createRoot()` | React DOM root |
| `<StrictMode>` | Dev checks |
| `createHashRouter()` | Router |
| `<Navigate>` | Redirect/navigation |
| `<Outlet>` | Nested route slot |
| `<NavLink>` | Link with active state |
| `QueryClient` | Query cache/client |
| `<QueryClientProvider>` | Query context |
| `useQuery()` | Read server state |
| `useMutation()` | Change server state |
| `useQueryClient()` | Access query client |
| `invalidateQueries()` | Mark cached data stale |
| `queryKey` | Server-state identity |
| `queryFn` | Fetch function |
| `enabled` | Conditional query |
| `mutationFn` | Mutation function |
| `onSuccess` | Mutation callback |
| `mutateAsync()` | Execute mutation as Promise |

---

## 142. TypeScript / JavaScript Syntax Index

| Syntax | 作用 |
|---|---|
| `import` / `export` | ES Modules |
| `const` / `let` | Variable binding |
| `interface` | Object type contract |
| `type` | Type alias |
| `string \| null` | Union type |
| `prop?` | Optional property |
| `<T>` | Generic |
| `Promise<T>` | Async result type |
| `unknown` | Unknown-safe type |
| `Record<K,V>` | Key/value object type |
| `as` | Type assertion |
| `as const` | Literal readonly inference |
| `...obj` | Spread |
| `{ a } = obj` | Destructuring |
| `` `${x}` `` | Template literal |
| `?.` | Optional chaining |
| `??` | Nullish coalescing |
| `=>` | Arrow function |
| `async` / `await` | Promise async flow |
| `try/catch/finally` | Error flow |
| `Promise.all()` | Parallel waiting |
| `instanceof` | Runtime type narrowing |
| `.map()` | Array transform |
| `.find()` | Find item |
| `.join()` | Join strings |
| `URLSearchParams` | Query string |
| `document.getElementById()` | DOM lookup |
| `.addEventListener()` | DOM event |
| `.closest()` | Find ancestor |
| `.dataset` | `data-*` access |

---

## 143. Python Syntax Index

| Syntax | 作用 |
|---|---|
| `from __future__ import annotations` | Deferred annotation behavior |
| `import` / `from ... import` | Module import |
| `as` | Import alias |
| `def` | Function |
| `async def` | Async function |
| `-> Type` | Return type hint |
| `str \| None` | Union type |
| `list[T]` | Generic list hint |
| `Literal[...]` | Literal type |
| `class` | Class |
| `__init__` | Constructor initializer |
| `self` | Current instance |
| `@decorator` | Decorator |
| `@staticmethod` | Static method |
| `@dataclass` | Dataclass generation |
| `if/else` | Branch |
| `a if cond else b` | Conditional expression |
| `[x for x in xs]` | List comprehension |
| `with` | Context manager |
| `yield` | Generator / context resource |
| `try/except/finally` | Error/resource flow |
| `raise` | Throw error |
| `assert` | Test assertion |
| `f"{x}"` | F-string |
| `{}` | Dict |
| `**mapping` | Keyword unpacking |
| `Path / "child"` | pathlib join |
| `Decimal` | Exact decimal |
| `date.fromisoformat()` | Parse ISO date |

---

## 144. FastAPI / Pydantic / Jinja Index

| Syntax | 作用 |
|---|---|
| `FastAPI(...)` | App instance |
| `APIRouter()` | Feature router |
| `@router.get/post/put/delete` | Endpoint |
| `response_model=` | Response schema |
| `status_code=` | HTTP status |
| `Request` | Request object |
| `HTMLResponse` | HTML response class |
| `JSONResponse` | Explicit JSON response |
| `RedirectResponse` | Redirect |
| `app.include_router()` | Register router |
| `app.mount()` | Static files mount |
| `StaticFiles` | Static server |
| `Jinja2Templates` | Template engine integration |
| `TemplateResponse` | Render template |
| `BaseModel` | Pydantic schema |
| `Field(...)` | Validation constraints |
| `{{ value }}` | Jinja expression |
| `{% extends %}` | Template inheritance |
| `{% block %}` | Override block |
| `{% endblock %}` | Block end |
| `url_for(...)` | URL generation |

---

## 145. SQL Syntax Index

| Syntax | 作用 |
|---|---|
| `PRAGMA foreign_keys = ON` | SQLite foreign key enforcement |
| `CREATE TABLE IF NOT EXISTS` | 建 table |
| `PRIMARY KEY` | Primary key |
| `AUTOINCREMENT` | Auto identity |
| `NOT NULL` | Required |
| `DEFAULT` | Default value |
| `UNIQUE` | Unique constraint |
| `CHECK` | Check constraint |
| `FOREIGN KEY ... REFERENCES` | FK |
| `CREATE INDEX` | Index |
| `INSERT OR IGNORE` | Insert, conflict ignore |
| `SELECT` | Query |
| `FROM` | Source |
| `WHERE` | Filter |
| `ORDER BY` | Sort |
| `LEFT JOIN` | Join |
| `ON` | Join condition |
| `GROUP BY` | Aggregate grouping |
| `COUNT()` | Count |
| `SUM()` | Sum |
| `COALESCE()` | Null fallback |
| `strftime()` | SQLite date formatting |
| `UPDATE ... SET` | Update |
| `DELETE` | Delete |
| `ROW_VERSION = ROW_VERSION + 1` | App-managed version increment |

---

# Part XII — 建議學習順序

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

# Part XIII — 教學網站的實作頁面清單

## 148. 建議 40 個 Lesson

### Foundation

1. 一個 Browser Request 到底發生什麼事
2. WUT1 Master / Detail Business Problem
3. HTTP GET / POST / PUT / DELETE
4. JSON
5. HTML Form
6. HTML Table
7. Bootstrap Grid / Form / Table
8. JavaScript Variable / Function / Object / Array
9. JavaScript Promise / async / await / fetch
10. SQL CRUD / JOIN / GROUP BY
11. SQLite Local Standalone
12. ECharts 基礎

### Spring Boot

13. Java Class / Record / Enum / Interface
14. Generic / Optional / Collection
15. Lambda / Stream
16. BigDecimal / Date Time
17. Spring Boot 啟動
18. Controller / REST API
19. Validation
20. Service / Transaction
21. Repository / JdbcClient
22. Error Handling
23. application.yml / Profiles
24. Spring Modulith
25. JUnit / Integration Test
26. Maven / Executable JAR

### Vue

27. Vue SFC
28. ref / reactive / computed / watch
29. Template syntax / v-model / v-if / v-for
30. Props / Emits
31. Vue Router
32. Vue + API + ECharts

### React

33. JSX / Component / Props
34. useState / Controlled Form
35. useEffect / useRef / useMemo
36. React Router
37. TanStack Query Query / Mutation
38. React + ECharts

### Citizen

39. Python + FastAPI + Pydantic + Jinja + sqlite3
40. Citizen Vanilla JS + Verification + Graduation Gate

> 實際網站可以把 39、40 再拆成更多頁；這裡列的是第一版導航顆粒度。

---

# Part XIV — 每頁應提供的互動式 Lab

## 149. Lab：追 API

任務：點 Master / Detail 的 Product。

學員必須在 DevTools Network 找到：

```text
GET /api/products/{id}
GET /api/products/{id}/trading
```

回答：

1. Request URL 是什麼？
2. HTTP status 是什麼？
3. Response JSON 是什麼？
4. 哪個 Java Controller 處理？
5. 哪個 Repository SQL 查資料？

---

## 150. Lab：改 Business Rule

不要直接要求改程式。

先改：

```text
SPEC / BUSINESS_RULES
```

例如：

```text
交易金額小數位由 2 位改成 0 位，HALF_UP。
```

要求 Agent：

1. 提 Plan。
2. 找出所有 impacted files。
3. 修改 Backend rule。
4. 修改 Test。
5. 不在 Frontend 複製 rule。
6. 執行 Verification。

Human Review：只看 Business outcome 與 architecture boundary。

---

## 151. Lab：Optimistic Concurrency

模擬：

```text
User A 讀 ROW_VERSION=1
User B 讀 ROW_VERSION=1
User A update → version=2
User B 仍帶 version=1 update
```

預期：

```text
0 row updated
 ↓
Conflict
 ↓
HTTP 409
```

要求學員從：

```text
Frontend request
→ DTO
→ Command
→ SQL WHERE ROW_VERSION
→ exception
→ HTTP response
```

完整追一次。

---

## 152. Lab：Dashboard Drill-down

要求學員回答：

- Click event 在哪？
- selected Product state 放在哪？
- 哪個 API 取得 monthly data？
- SQL 如何 `GROUP BY` month？
- ECharts option 如何更新？

分別用 Vue / React / Citizen 對照。

---

# Part XV — Human Review Checklist

## 153. 不要求 Reviewer 記住所有框架 API

Reviewer 應依序看：

### Business

- 是否真的符合 SPEC？
- 計算規則正確嗎？
- 例外情境呢？

### Contract

- API Input / Output 改了嗎？
- Nullability / Type 改了嗎？
- Error code 合理嗎？

### Architecture

- Business Rule 是否跑到 Frontend？
- Component 是否直接碰 DB？
- Controller 是否塞過多 logic？
- Feature 是否跨 boundary？

### Security

- 是否直接拼 SQL？
- 是否把未信任字串塞 `innerHTML`？
- 是否繞過 authorization boundary？
- Secret 是否進 repo？

### Verification

- Typecheck？
- Lint？
- Unit test？
- Integration test？
- Architecture test？
- E2E？

---

# Part XVI — 中文延伸閱讀總表

> 原則：優先官方繁中 / 簡中；沒有成熟中文官方頁面時，再使用可信的中文翻譯站。技術版本更新快，**專案實際鎖定版本仍是最終依據**。

## Web / JavaScript

- [MDN 繁中：Fetch API](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API/Using_Fetch)
- [MDN 繁中：非同步 JavaScript](https://developer.mozilla.org/zh-TW/docs/Learn_web_development/Extensions/Async_JS/Introducing)
- [MDN 繁中：Web Forms](https://developer.mozilla.org/zh-TW/docs/Learn_web_development/Extensions/Forms)
- [MDN 繁中：HTML Form 結構](https://developer.mozilla.org/zh-TW/docs/Learn_web_development/Extensions/Forms/How_to_structure_a_web_form)
- [MDN 繁中：JavaScript Destructuring](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Destructuring)
- [MDN 繁中：Optional Chaining](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

## Bootstrap

- [Bootstrap 5 繁體中文文件](https://bootstrap5.hexschool.com/docs/5.1/getting-started/introduction/)

## TypeScript

- [TypeScript 中文文件](https://www.typescriptlang.org/zh/docs/)

## Vue

- [Vue 中文：Template Syntax](https://cn.vuejs.org/guide/essentials/template-syntax)
- [Vue 中文：Reactivity Fundamentals](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals)
- [Vue 中文：Computed](https://cn.vuejs.org/guide/essentials/computed)
- [Vue 中文：Template Refs](https://cn.vuejs.org/guide/essentials/template-refs)
- [Vue 中文：Component Basics](https://cn.vuejs.org/guide/essentials/component-basics)
- [Vue 中文：Props](https://cn.vuejs.org/guide/components/props)
- [Vue 中文：Events](https://cn.vuejs.org/guide/components/events)
- [Vue Router 中文指南](https://router.vuejs.org/zh/guide/)
- [Vue Router 中文 API](https://router.vuejs.org/zh/api/)

## React

- [React 中文：useState](https://zh-hans.react.dev/reference/react/useState)
- [React 中文：useEffect](https://zh-hans.react.dev/reference/react/useEffect)
- [React 中文：條件渲染](https://zh-hans.react.dev/learn/conditional-rendering)
- [React Router 繁中參考站](https://router.react.com.tw/api/data-routers/createBrowserRouter)

## TanStack Query

- [TanStack Query 中文：Quick Start](https://tanstack.com.cn/query/latest/docs/framework/react/quick-start)
- [TanStack Query 中文：Query Functions](https://tanstack.com.cn/query/latest/docs/framework/react/guides/query-functions)
- [TanStack Query 中文：Mutations](https://tanstack.com.cn/query/latest/docs/framework/react/guides/mutations)

## Vite

- [Vite 中文指南](https://vitejs.cn/vite5-cn/guide/)
- [Vite 中文：Production Build](https://vitejs.cn/vite5-cn/guide/build.html)
- [Vite 中文：Static Deploy](https://vitejs.cn/vite5-cn/guide/static-deploy.html)

## ECharts

- [ECharts 中文：基礎長條圖](https://echarts.apache.org/handbook/zh/how-to/chart-types/bar/basic-bar/)
- [ECharts 中文：基礎折線圖](https://echarts.apache.org/handbook/zh/how-to/chart-types/line/basic-line/)

## Java

- [廖雪峰：Java 基礎](https://liaoxuefeng.com/books/java/quick-start/basic/index.html)
- [廖雪峰：Record](https://liaoxuefeng.com/books/java/oop/core/record/index.html)
- [廖雪峰：BigDecimal](https://liaoxuefeng.com/books/java/oop/core/bigdecimal/index.html)
- [廖雪峰：日期時間](https://liaoxuefeng.com/books/java/datetime/local-datetime/index.html)
- [廖雪峰：JDBC Query](https://liaoxuefeng.com/books/java/jdbc/query/index.html)

## Spring Boot / Spring Framework

- [Spring MVC 中文：Request Mapping](https://docs.springframework.org.cn/spring-framework/reference/web/webmvc/mvc-controller/ann-requestmapping.html)
- [Spring MVC 中文：RequestBody](https://docs.springframework.org.cn/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/requestbody.html)
- [Spring Boot 中文：Validation](https://docs.springframework.org.cn/spring-boot/reference/io/validation.html)
- [Spring JDBC 中文：JdbcClient](https://docs.springframework.org.cn/spring-framework/reference/data-access/jdbc/core.html)
- [Spring Boot 中文：Externalized Configuration](https://docs.springframework.org.cn/spring-boot/reference/features/external-config.html)
- [Spring Boot 中文：Actuator Endpoints](https://docs.springframework.org.cn/spring-boot/reference/actuator/endpoints.html)
- [Spring Modulith 繁中：Module Verification](https://docs.springframework.tw/spring-modulith/reference/verification.html)

## Maven

- [Maven 中文：Build Lifecycle](https://maven.org.cn/guides/introduction/introduction-to-the-lifecycle.html)

## Python

- [Python 官方繁中：Python 教學](https://docs.python.org/zh-tw/3/tutorial/index.html)
- [Python 官方繁中：sqlite3](https://docs.python.org/zh-tw/3/library/sqlite3.html)

## FastAPI / Pydantic / Jinja2

- [FastAPI 繁中：Tutorial](https://fastapi.tiangolo.com/zh-hant/tutorial/)
- [FastAPI 繁中：First Steps](https://fastapi.tiangolo.com/zh-hant/tutorial/first-steps/)
- [FastAPI 繁中：Request Body](https://fastapi.tiangolo.com/zh-hant/tutorial/body/)
- [FastAPI 繁中：Static Files](https://fastapi.tiangolo.com/zh-hant/tutorial/static-files/)
- [FastAPI 繁中：Templates](https://fastapi.tiangolo.com/zh-hant/advanced/templates/)
- [Pydantic 中文文件](https://pydantic.com.cn/)
- [Jinja 中文 Template Designer 文件](https://jinja.flask.org.cn/en/3.1.x/templates/)

## SQLite

- [SQLite 中文網：CREATE TABLE](https://sqlite.readdevdocs.com/lang_createtable.html)
- [SQLite 官方 SQL Language（英文權威文件）](https://sqlite.org/lang.html)

## Testing

- [Playwright 繁中：Writing Tests](https://playwright.tw/docs/writing-tests)
- [Playwright 繁中：Assertions](https://playwright.tw/docs/test-assertions)
- [Playwright 繁中：TypeScript](https://playwright.tw/docs/test-typescript)

## PowerShell

- [Microsoft Learn 繁中：PowerShell Functions](https://learn.microsoft.com/zh-tw/powershell/module/microsoft.powershell.core/about/about_functions?view=powershell-7.6)

---

# Part XVII — 三個專案的技術責任邊界

## 154. IT Vue / React

```text
Frontend
  UI state / interaction / visualization
        ↓ REST
Backend
  validation / business rule / authorization boundary / transaction
        ↓
Database / Enterprise API
```

Frontend 可以決定：

- 顯示什麼。
- Filter / selected row。
- Drawer / modal / loading。
- Chart interaction。

Frontend 不應決定：

- 正式金額 Business Rule。
- Data-level authorization。
- DB transaction。
- 正式資料是否合法。

---

## 155. Citizen

```text
Citizen App
  Business composition / local app data / presentation
        ↓
Enterprise API
  trusted capability / auth / core rule
        ↓
Core System
```

Citizen Sample 使用 SQLite 是 Local Standalone 教學與 application-local data 的代表。

未來如果要操作核心資料：

```text
Citizen Python
   ↓ REST / company SDK
Spring Boot Enterprise API
   ↓
Core DB / System
```

而不是：

```text
Citizen Python → 直接 Core Oracle / SQL Server
```

---

# Part XVIII — 最後應該教會什麼

## 156. 對 IT Developer

最後不是要求：

> 可以不查文件手寫所有 React / Vue / Spring annotation。

而是要求能回答：

1. 這個 Business Feature 放在哪？
2. Request 如何走到 DB？
3. Business Rule 在哪裡？
4. API contract 是什麼？
5. State 誰擁有？
6. 哪些是 Server State，哪些是 UI State？
7. 哪些 boundary 不能跨？
8. Agent 修改後要跑哪些 verification？
9. 哪些 error 應該被使用者看到？
10. 如何知道結果真的正確？

---

## 157. 對 Citizen Developer

最後不是要求：

> 成為 Python / JavaScript 工程師。

而是要求能回答：

1. 問題是什麼？
2. Input 是什麼？
3. Output 是什麼？
4. Business Rule 是什麼？
5. 哪些 Rule 可以固定成 Program？
6. 哪些資料允許取得？
7. 哪些能力只能透過 Enterprise API？
8. Acceptance Criteria 是什麼？
9. Test 如何證明結果？
10. 什麼時候這個工具已經超過 Citizen Application 的安全邊界？

---

# 158. 最終教學主張

這三個專案不是三套互相競爭的技術。

```text
IT Vue
IT React
Citizen Python
```

真正共同的核心是：

```text
Business Problem
      ↓
Spec
      ↓
Clear Boundary
      ↓
Agent-friendly Implementation
      ↓
Executable Verification
      ↓
Human Review
```

語法能力的角色正在改變：

```text
過去：
人記住語法 → 人寫大部分程式 → 人靠經驗 Review

未來：
人理解 Business / Architecture → Agent 寫大量程式
→ Compiler / Typecheck / Lint / Test 做機械檢查
→ 人 Review Rule / Contract / Boundary / Outcome
```

因此，這個教學網站最不應該變成一個「Vue / React / FastAPI API 背誦網站」。

它應該是一個：

> **以真實 Business Feature 為主線，教人讀懂 Agent 產出的系統、判斷責任邊界、驗證結果，並在需要時知道去哪一份中文技術文件深入查詢的網站。**


---

# Appendix A — 實際 Template 版本基線

## 159. IT 共用 Backend 版本

> 以下不是「推薦全公司永遠鎖死的版本」，而是本次 Sample Template 目前實際使用版本。教學網站應顯示版本，避免學員拿不同 major version 文件硬套。

| 元件 | Sample 版本 |
|---|---:|
| Java | 25 |
| Spring Boot Parent | 4.1.1 |
| Spring Modulith | 2.1.1 |
| SQLite JDBC | 3.53.4.0 |
| Node（Maven frontend build） | 22.16.0 |
| npm | 10.9.2 |
| frontend-maven-plugin | 1.15.1 |

## 160. Vue Frontend 版本

| 元件 | Sample 版本 |
|---|---:|
| Vue | 3.5.43 |
| Vue Router | 5.3.1 |
| TypeScript | 7.0.2 |
| Vite | 8.3.0 |
| Bootstrap | 5.3.8 |
| ECharts | 6.1.0 |
| Playwright | 1.63.0 |
| ESLint | 10.11.0 |
| vue-tsc | 3.3.11 |

## 161. React Frontend 版本

| 元件 | Sample 版本 |
|---|---:|
| React / React DOM | 19.3.0 |
| React Router DOM | 7.18.3 |
| TanStack React Query | 5.103.2 |
| TypeScript | 7.0.2 |
| Vite | 8.3.0 |
| Bootstrap | 5.3.8 |
| ECharts | 6.1.0 |
| Playwright | 1.63.0 |
| ESLint | 10.11.0 |

## 162. Citizen Python 版本

| 元件 | Sample 版本 / Constraint |
|---|---:|
| Python | `>=3.12` |
| FastAPI | 0.128.2 |
| Uvicorn | 0.48.0 |
| Jinja2 | 3.1.6 |
| Pydantic | 2.13.4 |
| pytest | 9.0.2 |
| httpx | 0.28.1 |
| Ruff | `>=0.12,<1` |
| mypy | `>=1.15,<2` |
| Playwright | `>=1.50,<2` |

---

# Appendix B — 專案中另外會看到的 Web / TypeScript API

## 163. `RequestInit`

API client 可能會宣告：

```typescript
async function request<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
```

`RequestInit` 是瀏覽器 Fetch API 的 TypeScript type，描述：

```text
method
headers
body
signal
credentials
...
```

例如：

```typescript
await fetch(url, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(request)
})
```

---

## 164. `JSON.stringify()`

```typescript
body: JSON.stringify(request)
```

把 JavaScript object 序列化成 JSON text，才能作為 HTTP request body 傳送。

反向通常是：

```typescript
const body = await response.json()
```

---

## 165. `URLSearchParams`

```typescript
const params = new URLSearchParams({
  rowVersion
})

const url = `/api/trading/${id}?${params}`
```

用途：正確建立 URL query string，不用自己手動拼 `?a=...&b=...`。

---

## 166. `Object.assign()`

Vue reactive form 同步會看到：

```typescript
Object.assign(form, {
  prodName: product.prodName,
  rowVersion: product.rowVersion
})
```

它把 source properties copy 到既有 target object。

為什麼 Vue `reactive()` form 常這樣寫？因為保留原 reactive object identity，比重新把 binding 指向另一個普通 object 清楚。

---

## 167. `ResizeObserver`

Vue / React ECharts wrapper 會看到：

```typescript
const observer = new ResizeObserver(() => {
  chart.resize()
})

observer.observe(container)
```

當 chart container 大小改變時，自動讓 ECharts resize。

Cleanup：

```typescript
observer.disconnect()
```

這是典型「Browser imperative API 必須配合 framework lifecycle cleanup」案例。

---

## 168. Citizen JS 的 `Number()` / `toLocaleString()` / `confirm()`

Number conversion：

```javascript
const id = Number(button.dataset.id)
```

Localized display：

```javascript
amount.toLocaleString()
```

Browser confirm：

```javascript
if (!confirm('確定刪除？')) return
```

`confirm()` 適合 Sample；正式產品若有一致 UX / accessibility requirement，可改成公司 Modal component。

---

# Appendix C — CSS 語法完整補充

## 169. CSS Custom Properties

IT / Citizen CSS 都會看到：

```css
:root {
  --app-bg: #f5f6f8;
  --app-border: #d9dde3;
}
```

使用：

```css
body {
  background: var(--app-bg);
}
```

Bootstrap 自己也大量使用 CSS Variables，例如：

```css
background: var(--bs-tertiary-bg);
```

---

## 170. Selector

Element selector：

```css
body { }
```

ID selector：

```css
#app { }
```

Class selector：

```css
.app-card { }
```

Descendant selector：

```css
.table thead th { }
```

Pseudo-class：

```css
.app-header a:hover { }
```

---

## 171. Project 中常見 CSS Property

```css
margin: 0;
padding: 1rem;
min-width: 320px;
max-width: 1440px;
min-height: 100vh;
width: 100%;
height: 360px;
background: #fff;
color: #20262e;
border: 1px solid var(--app-border);
border-radius: .5rem;
box-shadow: 0 0.125rem 0.5rem rgb(0 0 0 / 0.06);
display: flex;
justify-content: space-between;
align-items: center;
gap: 1rem;
font-size: 1rem;
font-weight: 600;
text-align: right;
white-space: nowrap;
position: sticky;
top: 0;
z-index: 10;
```

需要理解的核心分類：

```text
Box Model     margin / padding / border
Sizing        width / height / min / max
Typography    font / color / text-align
Layout        display / flex / gap
Positioning   position / top / z-index
Visual        background / shadow / radius
```

---

## 172. Media Query

```css
@media (max-width: 767.98px) {
  .app-content {
    padding: 1.25rem 0.75rem 2rem;
  }
}
```

意思：viewport 寬度在條件內時覆寫樣式，做 responsive design。

---

# Appendix D — 專案檔案 → 教學章節對照

## 173. IT Vue

| 實際檔案 / 區域 | 教學重點 |
|---|---|
| `frontend/src/main.ts` | ES Module、Vue app entry、Router / CSS bootstrap |
| `frontend/src/App.vue` | SFC、App root |
| `frontend/src/app/router.ts` | Vue Router、route tree、hash history |
| `frontend/src/features/.../types.ts` | TypeScript interface/type/union |
| `frontend/src/features/.../api.ts` | async/await、Promise、Fetch API abstraction |
| `ProductTradingPage.vue` | `ref`、`computed`、async flow、state ownership |
| `ProductMasterForm.vue` | `reactive`、`watch`、props、emits、`v-model`、form submit |
| `TradingDetailGrid.vue` | `v-for`、`v-if`、events |
| `TradingEditPanel.vue` | form state、number/date input、CRUD request |
| Dashboard components | ECharts option、events、drill-down |
| `shared/chart/EChart.vue` | template ref、lifecycle、ResizeObserver、dispose |
| `vite.config.ts` | Vite plugin、proxy、build output |
| `eslint.config.js` | lint config |
| `playwright.config.ts` | E2E config |
| `e2e/*.spec.ts` | Browser test syntax |

## 174. IT React

| 實際檔案 / 區域 | 教學重點 |
|---|---|
| `frontend/src/main.tsx` | `createRoot`、`StrictMode`、TSX |
| `app/providers.tsx` | `PropsWithChildren`、QueryClient Provider |
| `app/router.tsx` | React Router route tree |
| `product-trading.api.ts` | HTTP / JSON / TypeScript |
| `product-trading.query-keys.ts` | Query key、spread、`as const` |
| `product-trading.queries.ts` | `useQuery`、enabled、server state |
| `product-trading.mutations.ts` | `useMutation`、invalidate query |
| `ProductTradingPage.tsx` | useState + Query composition |
| `ProductMasterForm.tsx` | controlled form、event type、props callbacks |
| Grid / Edit Panel | `.map()`、conditional render、CRUD interaction |
| Dashboard components | useMemo、ECharts、drill-down |
| `shared/chart/EChart.tsx` | useRef/useEffect/cleanup/ResizeObserver |
| `vite.config.ts` | React Vite build |
| `e2e/*.spec.ts` | framework-independent E2E |

## 175. IT 共用 Backend

| 實際檔案 / 區域 | 教學重點 |
|---|---|
| `SampleApplication.java` | Spring Boot main |
| `api/*Controller.java` | REST mapping |
| `api/dto/*` | record + validation |
| `ProductTradingApiMapper.java` | DTO/domain mapping、Stream |
| `application/*Service.java` | use case、transaction、error |
| `*Command.java` | command record |
| `domain/Product.java` 等 | domain record / enum |
| `ProductTradingRepository.java` | interface / dependency inversion |
| `JdbcProductTradingRepository.java` | SQL text blocks、JdbcClient、ResultSet mapping |
| `shared/error/*` | exception → HTTP |
| `AuditUserProvider.java` | config injection / future auth boundary |
| `application.yml` | common config |
| `application-local.yml` | local profile / SQLite / SQL init |
| `ArchitectureTest.java` | Modulith verification |
| `LocalSqliteIntegrationTest.java` | local DB integration |
| `ProductTradingServiceTest.java` | business unit/service test |
| root `pom.xml` | parent/build properties/dependency management |
| `backend/pom.xml` | dependencies/plugins/frontend build/JAR |

## 176. Citizen Python

| 實際檔案 / 區域 | 教學重點 |
|---|---|
| `app/main.py` | FastAPI app、lifespan、static、router、exception handler |
| `app/config.py` | Path、env、dataclass |
| `models.py` | Pydantic / Literal / Field |
| `repository.py` | sqlite3、SQL、row mapping、transaction |
| `service.py` | business rule / Decimal / exceptions |
| `routes.py` | API route + HTML template route |
| `shared/db.py` | contextmanager、yield、commit/rollback |
| `shared/audit.py` | logging / kwargs |
| `base.html` | Jinja inheritance base |
| `master_detail.html` | Jinja block + Bootstrap form/table |
| `dashboard.html` | chart container + ECharts script |
| `master-detail.js` | fetch / DOM / event / CRUD |
| `dashboard.js` | Promise.all / ECharts / drill-down |
| `tests/conftest.py` | fixture / temp DB / TestClient |
| `tests/test_api.py` | API assertions |
| `tests/test_business_rules.py` | rule verification |
| `e2e/test_user_journey.py` | Python Playwright |
| `pyproject.toml` | project metadata / pytest / Ruff / mypy config |
| `requirements*.txt` | dependency pin / dev dependency |

---

# Appendix E — 語法教學的邊界：目前三個專案「沒有」使用什麼

## 177. IT Backend 沒有使用

```text
JPA / Hibernate
Flyway
Liquibase
Microservices
Kafka
GraphQL
Reactive WebFlux
外部 Tomcat WAR deployment
```

所以第一版教學網站不應把這些混入主要路線。

## 178. Vue 沒有使用

```text
Pinia
Vuex
Nuxt
Options API 作為主寫法
SSR
```

## 179. React 沒有使用

```text
Redux
Zustand
Next.js
React Server Components
Server Actions
```

## 180. Citizen 沒有使用

```text
React
Vue
Vite
npm
ORM
Database migration framework
```

這個「沒有使用清單」也是教學內容的一部分，因為它能防止學員與 Agent 不必要地擴張技術棧。

