from fastapi.testclient import TestClient


def test_sample_database_and_dashboard(client: TestClient) -> None:
    products = client.get("/api/products")
    assert products.status_code == 200
    assert len(products.json()) == 5

    summary = client.get("/api/dashboard/summary")
    assert summary.status_code == 200
    body = summary.json()
    assert body["productCount"] == 5
    assert body["tradingCount"] == 18
    assert float(body["totalTradingAmount"]) == 306550.0
    assert body["currencyCode"] == "TWD"


def test_master_detail_pages_are_available(client: TestClient) -> None:
    master = client.get("/master-detail")
    dashboard = client.get("/dashboard")
    assert master.status_code == 200
    assert "Product / Trading Master Detail" in master.text
    assert dashboard.status_code == 200
    assert "Product / Trading Dashboard" in dashboard.text


def test_create_trade_ignores_client_side_amount_and_uses_business_rule(client: TestClient) -> None:
    payload = {
        "tradeDate": "2026-05-01",
        "tradeType": "BUY",
        "counterparty": "Citizen Test",
        "quantity": "2",
        "unitPrice": "123.456",
        "marketCode": "TPE",
        "remark": "pytest",
        "rowVersion": None,
    }
    response = client.post("/api/products/1001/trades", json=payload)
    assert response.status_code == 201
    assert float(response.json()["tradeAmount"]) == 246.91


def test_optimistic_concurrency(client: TestClient) -> None:
    product = client.get("/api/products/1001").json()
    payload = {
        "prodName": product["prodName"],
        "prodCategory": product["prodCategory"],
        "prodStatus": product["prodStatus"],
        "listPrice": product["listPrice"],
        "effectiveDate": product["effectiveDate"],
        "ownerDeptCode": product["ownerDeptCode"],
        "remark": product["remark"],
        "rowVersion": product["rowVersion"],
    }
    first = client.put("/api/products/1001", json=payload)
    assert first.status_code == 200

    stale = client.put("/api/products/1001", json=payload)
    assert stale.status_code == 409
