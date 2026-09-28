---
title: 共同 Web 基礎
group: shared-foundations
kind: course
---

# 共同 Web 基礎

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

| Method | 用途 | 範例 |
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
