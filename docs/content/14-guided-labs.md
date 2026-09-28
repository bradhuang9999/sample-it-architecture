---
title: 每個範例的實作 Lab
group: reference
kind: reference
---

# 每個範例的實作 Lab

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
