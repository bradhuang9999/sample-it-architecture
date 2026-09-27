from __future__ import annotations

import os
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from app.main import app


@pytest.fixture()
def client(tmp_path: Path) -> TestClient:
    os.environ["WUT1_DB_PATH"] = str(tmp_path / "test.db")
    with TestClient(app) as test_client:
        yield test_client
    os.environ.pop("WUT1_DB_PATH", None)
