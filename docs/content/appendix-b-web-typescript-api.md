---
title: Web 與 TypeScript API 補充
group: reference
kind: reference
---

# Web 與 TypeScript API 補充

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
