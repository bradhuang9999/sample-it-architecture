# Data

## SAMPLE_PROD

Master Table，代表 Product 基本資料。

## SAMPLE_TRADING

Detail Table，以 `PROD_ID` 對應 Product。

## Naming Convention

Database Object 維持英文全大寫：

```text
SAMPLE_PROD
PROD_ID
ROW_VERSION
IX_SAMPLE_TRADING_DATE
```

Python / JSON 則使用一般 Python / Web 慣例，例如：

```text
prod_id
prodId
```

不要為了「全大寫 Database」把 Python Variable 也全部改成大寫。
