"""Optional Playwright E2E。

執行前：
1. 啟動 Application。
2. pip install -r requirements-dev.txt
3. playwright install chromium
4. pytest e2e -q
"""

import os

import pytest

playwright = pytest.importorskip("playwright.sync_api")

BASE_URL = os.getenv("E2E_BASE_URL", "http://127.0.0.1:8000")


def test_master_detail_and_dashboard() -> None:
    with playwright.sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto(f"{BASE_URL}/master-detail")
        page.get_by_text("Product / Trading Master Detail").wait_for()
        page.goto(f"{BASE_URL}/dashboard")
        page.get_by_text("Product / Trading Dashboard").wait_for()
        browser.close()
