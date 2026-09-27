from __future__ import annotations

import sqlite3
from contextlib import contextmanager
from pathlib import Path
from typing import Iterator

from app.config import database_path, sample_data_path, schema_path


def _connect(path: Path | None = None) -> sqlite3.Connection:
    db_path = path or database_path()
    db_path.parent.mkdir(parents=True, exist_ok=True)

    connection = sqlite3.connect(db_path, detect_types=sqlite3.PARSE_DECLTYPES)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    return connection


@contextmanager
def connection() -> Iterator[sqlite3.Connection]:
    conn = _connect()
    try:
        yield conn
    finally:
        conn.close()


@contextmanager
def transaction() -> Iterator[sqlite3.Connection]:
    conn = _connect()
    try:
        conn.execute("BEGIN")
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def initialize_local_database() -> None:
    """建立 Local SQLite Schema 與 Sample Data。

    這是 Citizen Local Standalone 的便利機制，不代表公司正式 Database
    允許 Application 自動執行 DDL。
    """
    with _connect() as conn:
        conn.executescript(schema_path().read_text(encoding="utf-8"))
        conn.executescript(sample_data_path().read_text(encoding="utf-8"))
        conn.commit()
