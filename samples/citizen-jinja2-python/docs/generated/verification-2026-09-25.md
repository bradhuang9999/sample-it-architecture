# Verification Evidence — 2026-09-25

## 已實際執行

### Python Syntax

```text
python -m compileall -q app tests
PASS
```

### JavaScript Syntax

```text
node --check app/static/js/master-detail.js
node --check app/static/js/dashboard.js
PASS
```

### pytest

```text
5 passed
```

已覆蓋：

- SQLite Schema / Sample Data 初始化
- 5 筆 Product / 18 筆 Trading
- Dashboard Total Amount = 306550 TWD
- Master / Detail Page 可回應
- Dashboard Page 可回應
- `TRADE_AMOUNT = QUANTITY × UNIT_PRICE` 由 Backend 計算
- Product `ROW_VERSION` Optimistic Concurrency，舊版本更新回傳 HTTP 409

### 實際 Uvicorn Smoke Test

使用獨立 SQLite File 啟動：

```text
python -m uvicorn app.main:app --host 127.0.0.1 --port 8765
```

實際 HTTP 驗證：

```json
{"productCount":5,"tradingCount":18,"totalTradingAmount":"306550","currencyCode":"TWD"}
```

並確認：

- `/master-detail` 回傳 HTML
- `/dashboard` 回傳 HTML

## 尚未執行

目前執行環境未安裝 Ruff / mypy，因此下列項目已放入 `requirements-dev.txt` 與 `scripts/verify.*`，但本次沒有宣稱通過：

- Ruff
- mypy
- Playwright Browser E2E

正式 Review / CI 應先執行 `scripts/setup-local.*` 安裝 development dependencies，再執行完整 verification。
