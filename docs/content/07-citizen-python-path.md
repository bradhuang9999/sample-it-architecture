---
title: Citizen Python 路線
group: citizen-and-comparison
kind: course
---

# Citizen Python 路線

## 84. Citizen 路線先學什麼、不學什麼

這一套不是「比較簡陋的 IT Application」，而是刻意為不同 Owner / Risk Level 設計：

```text
Python
FastAPI
Pydantic
Jinja2
Bootstrap 5
Vanilla JavaScript
ECharts
SQLite
pytest
```

第一階段不教：

```text
React / Vue
Vite / npm
Redux / Pinia
ORM
Microservices
複雜前端 build chain
```

主要工作流：

```text
Business Problem
      ↓
SPEC.md
      ↓
Agent Implementation
      ↓
Automated Verification
      ↓
Human Business Review
```

---

# 85. Python Module / Import

```python
from __future__ import annotations

from pathlib import Path
from decimal import Decimal
import sqlite3
```

Alias：

```python
from app.features.product_trading.routes import (
    router as product_trading_router,
)
```

概念與 Java import 類似，但 Python module 直接對應 `.py` file / package。

### 中文延伸閱讀

- [Python 官方繁中教學](https://docs.python.org/zh-tw/3/tutorial/index.html)

---

# 86. Variable / Constant Convention

```python
PROJECT_ROOT = Path(__file__).resolve().parents[1]
DATABASE_PATH = PROJECT_ROOT / "data" / "wut1-sample.db"
```

Python 沒有語言層級真正 immutable constant；全大寫是 convention。

---

# 87. Function

```python
def calculate_trade_amount(
    quantity: Decimal,
    unit_price: Decimal,
) -> Decimal:
    return quantity * unit_price
```

語法：

```text
def function_name(parameter: Type) -> ReturnType:
    body
```

Python block 由 indentation 決定，不使用 `{}`。

---

# 88. Type Hints

專案中會看到：

```python
str
int
Decimal
Path
list[Product]
Sequence[Trading]
Iterator[sqlite3.Connection]
str | None
Path | None
Literal["ACTIVE", "INACTIVE"]
Any
```

### Union

```python
str | None
```

等於「string 或 None」。

### Generic collection

```python
list[Product]
```

### `Literal`

```python
ProductStatus = Literal["ACTIVE", "INACTIVE"]
```

把 String 合法值縮小。

Type hint 不會把 Python 變成 Java static compiler；所以專案搭配 `mypy` / Pydantic / test 做 guardrail。

---

# 89. Class

```python
class ProductTradingService:
    def __init__(self, repository: ProductTradingRepository):
        self.repository = repository
```

### `self`

目前 instance。

### Constructor

Python 初始化 method 是：

```python
__init__
```

---

# 90. Inheritance

Pydantic：

```python
class Product(BaseModel):
    prod_id: int
    prod_code: str
```

Exception：

```python
class NotFoundError(RuntimeError):
    pass
```

`pass`：語法上需要一個 statement，但這裡沒有其他內容。

---

# 91. Dataclass

```python
@dataclass(frozen=True)
class AppConfig:
    database_path: Path
```

`@dataclass` 自動產生常見 constructor / repr / equality behavior。

`frozen=True`：建立後不應修改 fields。

---

# 92. Decorator

Python `@...` 是 decorator syntax。

專案會看到：

```python
@router.get(...)
@router.post(...)
@app.get(...)
@app.exception_handler(...)
@contextmanager
@asynccontextmanager
@pytest.fixture
@staticmethod
@dataclass(...)
```

Decorator 的概念是：

> 用另一個 callable 包裝 / 登記原 function 或 class，加入額外行為或 metadata。

不要因為 Java annotation 也用 `@` 就認為兩者底層機制相同。

---

# 93. `if` / `else`

```python
if product is None:
    raise NotFoundError("找不到產品")
else:
    return product
```

Inline conditional：

```python
product = _product(row) if row else None
```

---

# 94. List Comprehension

```python
return [_product(row) for row in rows]
```

等價概念：

```python
result = []
for row in rows:
    result.append(_product(row))
```

適合簡單 mapping，不要把複雜多層 business logic 全塞 comprehension。

---

# 95. Context Manager：`with`

```python
with connection() as conn:
    rows = conn.execute(sql).fetchall()
```

核心：

```text
取得 resource
 ↓
with block
 ↓
自動執行 cleanup
```

DB connection / file 等 resource 很適合。

---

# 96. Generator / `yield`

DB helper 可以：

```python
@contextmanager
def connection() -> Iterator[sqlite3.Connection]:
    conn = sqlite3.connect(...)
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()
```

`yield` 暫停 function，把 resource 交給 `with` block；退出後繼續 cleanup code。

---

# 97. `try / except / finally / raise`

```python
try:
    yield conn
    conn.commit()
except Exception:
    conn.rollback()
    raise
finally:
    conn.close()
```

Bare `raise`：重新拋出目前正在處理的 exception。

---

# 98. `assert`

Test：

```python
assert response.status_code == 200
assert len(response.json()) == 5
```

Application production validation 不應依賴 `assert`；test assertion 與 runtime input validation 是不同責任。

---

# 99. F-string

```python
message = f"找不到 Product: {prod_id}"
```

與 JavaScript template literal、Java formatted log 類似，但語法不同。

---

# 100. Dictionary / Keyword Arguments / `**`

```python
payload = {
    "prod_id": 1,
    "prod_name": "Motor Treaty",
}
```

Function keyword arguments：

```python
write_audit(action="UPDATE_PRODUCT", prod_id=prod_id)
```

Dictionary unpacking：

```python
write_audit("UPDATE", **fields)
```

---

# 101. `Path` / Path Operator `/`

```python
PROJECT_ROOT / "data" / "wut1-sample.db"
```

這裡 `/` 是 `pathlib.Path` overload，不是數學除法。

---

# 102. Environment Variable

```python
import os

path = os.getenv("SQLITE_DB_PATH", "data/wut1-sample.db")
```

Test 也可能：

```python
os.environ["SQLITE_DB_PATH"] = str(tmp_path / "test.db")
```

---

# 103. Decimal

```python
from decimal import Decimal, ROUND_HALF_UP

amount = (
    quantity * unit_price
).quantize(
    Decimal("0.01"),
    rounding=ROUND_HALF_UP,
)
```

與 Java `BigDecimal` 相同目的：正式金額不要用 binary floating point。

---

# 104. Date

```python
trade_date = date.fromisoformat("2026-09-25")
text = trade_date.isoformat()
```

API / DB 之間用 ISO date format 可降低 ambiguous format。

---

# 105. Pydantic `BaseModel`

```python
class ProductUpdateRequest(BaseModel):
    prod_name: str = Field(min_length=1, max_length=100)
    list_price: Decimal = Field(ge=0)
    remark: str | None = Field(default=None, max_length=500)
```

Pydantic 同時提供：

- 資料 parsing。
- Type validation。
- Constraint validation。
- JSON Schema / FastAPI OpenAPI integration。

### `Field()`

專案用到：

```text
min_length
max_length
ge       greater than or equal
 gt      greater than
default
```

### `Literal`

```python
prod_status: Literal["ACTIVE", "INACTIVE"]
```

### 中文延伸閱讀

- [Pydantic 中文文件](https://pydantic.com.cn/)

---

# 106. FastAPI Application

```python
app = FastAPI(
    title="WUT1 Citizen Sample",
    lifespan=lifespan,
)
```

### `async def`

FastAPI endpoint/lifespan 可能看到：

```python
async def lifespan(app: FastAPI):
```

要理解 async syntax，但不要誤以為所有 function 都必須 async。

---

# 107. FastAPI Lifespan

```python
@asynccontextmanager
async def lifespan(app: FastAPI):
    initialize_database()
    yield
```

用途：Application startup / shutdown lifecycle。

WUT1 Local Standalone 在 startup 初始化 local SQLite sample。

---

# 108. `APIRouter`

```python
router = APIRouter()
```

Route：

```python
@router.get("/api/products")
def get_products():
    return service.get_products()
```

Main：

```python
app.include_router(product_trading_router)
```

目的：不要把整個網站 endpoint 全塞 `main.py`。

---

# 109. FastAPI Route Decorators

專案主要使用：

```python
@router.get(...)
@router.post(...)
@router.put(...)
@router.delete(...)
```

Response model：

```python
@router.get(
    "/api/products",
    response_model=list[Product],
)
```

Status code：

```python
@router.post(
    "/api/products/{prod_id}/trading",
    status_code=201,
)
```

---

# 110. FastAPI Path Parameter

```python
@router.get("/api/products/{prod_id}")
def get_product(prod_id: int):
```

FastAPI 根據 function type hint 將 path text parse 成 integer，失敗會回 validation error。

---

# 111. Request Body + Pydantic

```python
@router.put("/api/products/{prod_id}")
def update_product(
    prod_id: int,
    request: ProductUpdateRequest,
):
```

HTTP JSON：

```text
 ↓
Pydantic validate
 ↓
ProductUpdateRequest
 ↓
Service
```

### 中文延伸閱讀

- [FastAPI 繁中：Tutorial](https://fastapi.tiangolo.com/zh-hant/tutorial/)
- [FastAPI 繁中：Request Body](https://fastapi.tiangolo.com/zh-hant/tutorial/body/)

---

# 112. `Request` / HTML Response / Template

```python
from fastapi import Request
from fastapi.responses import HTMLResponse

@router.get(
    "/master-detail",
    response_class=HTMLResponse,
)
def master_detail(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="master_detail.html",
        context={"page_title": "Master / Detail"},
    )
```

這就是 Server-side Rendering：

```text
Browser request
 ↓
FastAPI
 ↓
Jinja2 template + data
 ↓
完整 HTML
 ↓
Browser
```

### 中文延伸閱讀

- [FastAPI 繁中：Templates](https://fastapi.tiangolo.com/zh-hant/advanced/templates/)

---

# 113. Static Files

```python
app.mount(
    "/static",
    StaticFiles(directory=STATIC_DIR),
    name="static",
)
```

Jinja：

```jinja2
{{ url_for('static', path='/css/app.css') }}
```

### 中文延伸閱讀

- [FastAPI 繁中：Static Files](https://fastapi.tiangolo.com/zh-hant/tutorial/static-files/)

---

# 114. Redirect / JSON Response

Redirect：

```python
return RedirectResponse(url="/master-detail")
```

Custom error JSON：

```python
return JSONResponse(
    status_code=404,
    content={"message": str(exc)},
)
```

---

# 115. FastAPI Exception Handler

```python
@app.exception_handler(NotFoundError)
async def handle_not_found(request, exc):
    return JSONResponse(
        status_code=404,
        content={"message": str(exc)},
    )
```

目的與 Spring `@RestControllerAdvice` 類似：統一 error → HTTP contract。

---

# 116. Jinja2 Variable：`{{ }}`

```jinja2
<title>{{ page_title }}</title>
```

與 Vue Mustache 長得很像，但 runtime 完全不同：

```text
Jinja2：Server render HTML 後送到 Browser
Vue：Browser 裡 reactive render
```

這是 JSP 工程師最容易理解但也最需要分清楚的一點。

---

# 117. Jinja2 Template Inheritance

Base：

```jinja2
<!doctype html>
<html>
<head>
  {% block head %}{% endblock %}
</head>
<body>
  {% block content %}{% endblock %}
  {% block scripts %}{% endblock %}
</body>
</html>
```

Child：

```jinja2
{% extends "base.html" %}

{% block content %}
  <h1>Master / Detail</h1>
{% endblock %}
```

用來避免每頁重複 HTML skeleton。

### 中文延伸閱讀

- [Jinja 中文：Template Designer](https://jinja.flask.org.cn/en/3.1.x/templates/)
- [FastAPI 繁中：Jinja2 Templates](https://fastapi.tiangolo.com/zh-hant/advanced/templates/)

---

# 118. Citizen HTML + JavaScript 邊界

Jinja 先輸出基本頁面：

```text
Header
Navigation
Form skeleton
Table skeleton
Chart container
```

JavaScript 再處理：

```text
load data
save data
modal / panel state
chart interaction
partial UI update
```

這不是 SPA；它是：

> **Server-render first + progressive enhancement / local interaction。**

---

# 119. Vanilla JS `fetch()` Wrapper

```javascript
async function api(url, options = {}) {
  const response = await fetch(url, options)
  const body = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(body?.message ?? 'Request failed')
  }

  return body
}
```

專案需要理解：

- default parameter `options = {}`。
- `fetch()`。
- `response.ok`。
- `.json()` 回 Promise。
- `.catch(...)`。
- optional chaining / nullish coalescing。
- `throw new Error()`。

---

# 120. Vanilla JS DOM 更新

```javascript
const nameInput = document.getElementById('prod-name')
nameInput.value = product.prodName
```

Text：

```javascript
message.textContent = '儲存完成'
```

Class：

```javascript
alert.className = 'alert alert-success'
alert.classList.remove('d-none')
```

Form reset：

```javascript
form.reset()
```

---

# 121. Event Listener

```javascript
form.addEventListener('submit', async event => {
  event.preventDefault()
  await save()
})
```

Resize：

```javascript
window.addEventListener('resize', () => {
  chart.resize()
})
```

---

# 122. Event Delegation / `dataset`

Grid 上很多 row button，不一定每個都個別 register listener：

```javascript
grid.addEventListener('click', event => {
  const button = event.target.closest('button[data-action]')
  if (!button) return

  const action = button.dataset.action
  const id = Number(button.dataset.id)
})
```

HTML：

```html
<button
  data-action="edit"
  data-id="123"
>
  編輯
</button>
```

---

# 123. Vanilla JS Master / Detail State

```javascript
const state = {
  products: [],
  selectedProductId: null,
  tradings: []
}
```

這正是 Vue / React 解決得更系統化的問題。

Citizen Sample UI 複雜度刻意有限，所以這種小型 state object 可接受；如果開始自己造：

```text
subscribe
emit
store
selector
component registry
```

就代表應考慮升級到 Advanced Application / IT stack。

---

# 124. Python `sqlite3`

Connection：

```python
conn = sqlite3.connect(database_path)
conn.row_factory = sqlite3.Row
```

Foreign key：

```python
conn.execute("PRAGMA foreign_keys = ON")
```

Query：

```python
rows = conn.execute(
    """
    SELECT PROD_ID, PROD_CODE, PROD_NAME
    FROM SAMPLE_PROD
    ORDER BY PROD_CODE
    """
).fetchall()
```

Parameterized SQL：

```python
row = conn.execute(
    "SELECT * FROM SAMPLE_PROD WHERE PROD_ID = ?",
    (prod_id,),
).fetchone()
```

注意 `(prod_id,)` 的逗號：Python 單一元素 tuple。

Update：

```python
cursor = conn.execute(sql, params)
if cursor.rowcount == 0:
    raise ConflictError(...)
```

Auto ID：

```python
trading_id = cursor.lastrowid
```

Initialize script：

```python
conn.executescript(schema_sql)
```

Transaction：

```python
conn.commit()
conn.rollback()
```

### 中文延伸閱讀

- [Python 官方：sqlite3 中文文件](https://docs.python.org/zh-tw/3/library/sqlite3.html)

---

# 125. pytest

Fixture：

```python
@pytest.fixture
def client(tmp_path):
    # setup
    with TestClient(app) as test_client:
        yield test_client
```

Test：

```python
def test_get_products(client):
    response = client.get('/api/products')

    assert response.status_code == 200
    assert len(response.json()) == 5
```

Temp Path：

```python
tmp_path / "test.db"
```

讓 test 不污染正式 local sample DB。

---

# 126. FastAPI `TestClient`

```python
from fastapi.testclient import TestClient

with TestClient(app) as client:
    response = client.get('/api/products')
```

這是 Application Integration Test，不必真的另外啟一個外部 server process。

---

# 127. Python Playwright

E2E：

```python
playwright = pytest.importorskip("playwright.sync_api")

with playwright.sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto(base_url)
    page.get_by_text("Dashboard").click()
    browser.close()
```

`pytest.importorskip()`：如果 optional E2E dependency 沒安裝，test 可以標示 skip，而不是 import 時直接炸掉。

---

# 128. `pyproject.toml`

TOML 基礎：

```toml
[project]
name = "wut1-citizen-python-template"
version = "1.0.0"

[tool.pytest.ini_options]
testpaths = ["tests"]

[tool.ruff]
line-length = 100

[tool.mypy]
python_version = "3.13"
strict = true
```

語法：

```text
[section]
key = value
array = ["a", "b"]
boolean = true
```

### Tool 分工

```text
pytest → Behavior
Ruff   → lint / code rule
mypy   → static type analysis
```

---
