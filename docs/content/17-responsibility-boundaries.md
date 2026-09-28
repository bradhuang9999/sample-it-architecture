---
title: 三個專案的技術責任邊界
group: citizen-and-comparison
kind: course
---

# 三個專案的技術責任邊界

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
