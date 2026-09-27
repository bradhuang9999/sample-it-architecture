# Product Trading Dashboard

## Business Goal

示範大型 Dashboard 最核心的 Reactive UI 行為：同一個 Selection State 同時驅動 Chart 與 Grid Drill-down。

## 第一層

KPI：

- Product Count
- Trading Count
- Total Trading Amount

Chart：

- X：Product
- Y：Trading Amount

## Drill-down

使用者點擊 Product Bar 後：

```text
selectedProductId
   ├─ 月別 Trading Amount Line Chart
   └─ Trading Detail Grid
```

## Rules

- Aggregate 在 Database / Backend 完成，不把所有資料拉到 Browser 再加總。
- Sample Data 使用相同 Currency，避免跨 Currency Amount 直接相加造成錯誤示範。
- Chart Click 只改變 Selection State；資料取得由 Page 統一控制。

## Acceptance

- Dashboard 初次載入顯示 KPI 與 Product Bar Chart。
- 點擊任一 Product 後，下方顯示該 Product 名稱。
- Monthly Chart 與 Detail Grid 必須同步為同一個 Product。
- 切換 Product 不需整頁 Reload。
