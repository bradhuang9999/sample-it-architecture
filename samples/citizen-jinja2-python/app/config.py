from __future__ import annotations

import os
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]


def database_path() -> Path:
    """回傳目前 Local SQLite 路徑。

    測試可以透過 WUT1_DB_PATH 指向 temporary DB，避免污染開發資料。
    """
    configured = os.getenv("WUT1_DB_PATH", "./data/wut1-citizen.db")
    path = Path(configured)
    if not path.is_absolute():
        path = PROJECT_ROOT / path
    return path.resolve()


def schema_path() -> Path:
    return PROJECT_ROOT / "database" / "CURRENT_SCHEMA.sql"


def sample_data_path() -> Path:
    return PROJECT_ROOT / "database" / "LOCAL_SAMPLE_DATA.sql"
