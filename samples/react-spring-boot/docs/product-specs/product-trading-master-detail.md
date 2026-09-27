# Product / Trading Master Detail

## Business Goal

用一個容易理解的 Master / Detail 畫面，示範傳統 JSP 工程師如何轉換到 React Component + TanStack Query + API + State 的開發方式。

## Data

Master：

`SAMPLE_PROD`

Detail：

`SAMPLE_TRADING`

Relationship：

```text
SAMPLE_PROD.PROD_ID
        1
        │
        N
SAMPLE_TRADING.PROD_ID
```

## UI

### 上半部 Master Form

顯示與編輯：

- PROD_CODE
- PROD_NAME
- PROD_CATEGORY
- PROD_STATUS
- CURRENCY_CODE
- LIST_PRICE
- EFFECTIVE_DATE
- OWNER_DEPT_CODE
- REMARK

### 下半部 Detail Grid

顯示：

- TRADE_DATE
- TRADE_TYPE
- COUNTERPARTY
- QUANTITY
- UNIT_PRICE
- TRADE_AMOUNT
- MARKET_CODE
- REMARK

支援：

- 新增 Trading
- 編輯 Trading
- 刪除 Trading

## Business Rules

1. `PROD_CODE` 不可空白。
2. `LIST_PRICE` 不得小於 0。
3. `QUANTITY` 必須大於 0。
4. `UNIT_PRICE` 不得小於 0。
5. `TRADE_AMOUNT` 不由 Frontend 輸入，由 Backend 以 `QUANTITY × UNIT_PRICE` 計算，四捨五入到小數 2 位。
6. Trading 必須隸屬存在的 Product。
7. Update 使用 `ROW_VERSION` 做 Optimistic Concurrency；過期版本回傳 409。

## Acceptance

- 使用者可以切換 Product，Master Form 與 Trading Grid 同步更新。
- Master 儲存成功後取得新的 `ROW_VERSION`。
- 新增 / 修改 Trading 後 Grid 重新顯示正確 `TRADE_AMOUNT`。
- 使用過期 `ROW_VERSION` 更新時，不得無聲覆蓋他人資料。
- Backend 不執行 Schema DDL。
