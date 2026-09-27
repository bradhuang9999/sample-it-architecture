# Business Rules

## BR-001：Trading Amount

```text
TRADE_AMOUNT = QUANTITY × UNIT_PRICE
```

- 計算位置：Backend `service.py`
- 小數位：2
- Frontend 不接受使用者直接指定 `TRADE_AMOUNT`

## BR-002：Dashboard Currency

Sample 固定使用 TWD，因此 Dashboard 可以直接加總。

真實多幣別需求不能照抄本規則，必須先定義基準幣別與匯率來源。

## BR-003：Optimistic Concurrency

Product / Trading 使用 `ROW_VERSION`。

若使用者以舊版資料更新，系統回傳 HTTP 409，避免靜默覆蓋別人的異動。
