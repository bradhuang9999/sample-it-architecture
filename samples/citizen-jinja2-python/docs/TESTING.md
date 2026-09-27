# Testing

## 預設 Verification

```bash
./scripts/verify.sh
```

包含：

1. `compileall`
2. Ruff
3. mypy
4. pytest

## Business Rule Test

`tests/test_business_rules.py`

目的不是測 Framework，而是直接證明關鍵計算符合 Spec。

## API / SQLite Integration Test

`tests/test_api.py`

每個 Test 使用獨立 temporary SQLite DB，並從：

```text
database/CURRENT_SCHEMA.sql
database/LOCAL_SAMPLE_DATA.sql
```

建立資料。

## Browser E2E

E2E 是第二層驗證，不納入最小 Local Setup：

```bash
playwright install chromium
pytest e2e -q
```
