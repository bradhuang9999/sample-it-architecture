# SPEC：Product / Trading Citizen Sample

## 1. 要解決的問題

使用者需要查看產品基本資料與對應交易明細，並快速掌握各產品交易金額與月別趨勢。

本 Sample 用兩個簡單畫面示範 Citizen App 如何從 Business Problem 出發，而不是從 Framework 出發。

## 2. 使用者

- 部門企劃人員
- 資料分析人員
- Citizen Developer

## 3. 功能一：Master / Detail

### Master：Product

使用者可以：

- 選擇 Product
- 查看 Product 基本資料
- 修改可維護欄位

顯示欄位：

- `PROD_CODE`
- `PROD_NAME`
- `PROD_CATEGORY`
- `PROD_STATUS`
- `CURRENCY_CODE`
- `LIST_PRICE`
- `EFFECTIVE_DATE`
- `OWNER_DEPT_CODE`
- `REMARK`

### Detail：Trading

依目前 Product 顯示：

- `TRADE_DATE`
- `TRADE_TYPE`
- `COUNTERPARTY`
- `QUANTITY`
- `UNIT_PRICE`
- `TRADE_AMOUNT`
- `MARKET_CODE`
- `REMARK`

使用者可以新增、修改、刪除 Trading。

## 4. 功能二：Dashboard

顯示：

- Product Count
- Trading Count
- Total Trading Amount
- Product Trading Amount Bar Chart

使用者點擊 Product 後：

- 顯示 Product 月別交易金額趨勢
- 顯示該 Product 的 Trading Detail

## 5. Business Rules

### BR-001 Trading Amount

```text
TRADE_AMOUNT = QUANTITY × UNIT_PRICE
```

`TRADE_AMOUNT` 由 Backend 計算，Frontend 不直接指定。

### BR-002 Currency

Sample Domain 固定使用 `TWD`，因此 Dashboard 可直接加總。

### BR-003 Optimistic Concurrency

Product 與 Trading 使用 `ROW_VERSION`。

更新時若畫面版本已過期，API 回傳 Conflict，不靜默覆蓋其他人的修改。

## 6. 完成條件

- Master / Detail 查詢正確。
- Product 更新可驗證。
- Trading 新增 / 修改 / 刪除可驗證。
- Dashboard Amount 與 Trading Detail 加總一致。
- Drill-down Product 與月別資料一致。
- Business Rule 有自動測試。
- `scripts/verify.*` 通過。
