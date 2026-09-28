---
title: 同一功能的三種寫法比較
group: citizen-and-comparison
kind: course
---

# 同一功能的三種寫法比較

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
