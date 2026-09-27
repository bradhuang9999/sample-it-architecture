from __future__ import annotations

import sqlite3
from collections.abc import Sequence
from datetime import date
from decimal import Decimal

from app.features.product_trading.models import (
    DashboardSummary,
    MonthlyTradingAggregate,
    Product,
    ProductSummary,
    ProductTradingAggregate,
    ProductUpdateRequest,
    Trading,
    TradingUpsertRequest,
)
from app.shared.db import connection, transaction


def _product(row: sqlite3.Row) -> Product:
    return Product(
        prodId=row["PROD_ID"],
        prodCode=row["PROD_CODE"],
        prodName=row["PROD_NAME"],
        prodCategory=row["PROD_CATEGORY"],
        prodStatus=row["PROD_STATUS"],
        currencyCode=row["CURRENCY_CODE"],
        listPrice=Decimal(str(row["LIST_PRICE"])),
        effectiveDate=date.fromisoformat(row["EFFECTIVE_DATE"]),
        ownerDeptCode=row["OWNER_DEPT_CODE"],
        remark=row["REMARK"],
        rowVersion=row["ROW_VERSION"],
    )


def _trading(row: sqlite3.Row) -> Trading:
    return Trading(
        tradingId=row["TRADING_ID"],
        prodId=row["PROD_ID"],
        tradeDate=date.fromisoformat(row["TRADE_DATE"]),
        tradeType=row["TRADE_TYPE"],
        counterparty=row["COUNTERPARTY"],
        quantity=Decimal(str(row["QUANTITY"])),
        unitPrice=Decimal(str(row["UNIT_PRICE"])),
        tradeAmount=Decimal(str(row["TRADE_AMOUNT"])),
        marketCode=row["MARKET_CODE"],
        remark=row["REMARK"],
        rowVersion=row["ROW_VERSION"],
    )


class ProductTradingRepository:
    def list_products(self) -> Sequence[ProductSummary]:
        sql = """
            SELECT PROD_ID, PROD_CODE, PROD_NAME, PROD_STATUS
            FROM SAMPLE_PROD
            ORDER BY PROD_CODE
        """
        with connection() as conn:
            rows = conn.execute(sql).fetchall()
        return [
            ProductSummary(
                prodId=row["PROD_ID"],
                prodCode=row["PROD_CODE"],
                prodName=row["PROD_NAME"],
                prodStatus=row["PROD_STATUS"],
            )
            for row in rows
        ]

    def get_product(self, prod_id: int) -> Product | None:
        with connection() as conn:
            row = conn.execute(
                "SELECT * FROM SAMPLE_PROD WHERE PROD_ID = ?",
                (prod_id,),
            ).fetchone()
        return _product(row) if row else None

    def update_product(self, prod_id: int, request: ProductUpdateRequest) -> Product | None:
        sql = """
            UPDATE SAMPLE_PROD
               SET PROD_NAME = ?,
                   PROD_CATEGORY = ?,
                   PROD_STATUS = ?,
                   LIST_PRICE = ?,
                   EFFECTIVE_DATE = ?,
                   OWNER_DEPT_CODE = ?,
                   REMARK = ?,
                   UPDATED_BY = 'LOCAL_USER',
                   UPDATED_AT = CURRENT_TIMESTAMP,
                   ROW_VERSION = ROW_VERSION + 1
             WHERE PROD_ID = ?
               AND ROW_VERSION = ?
        """
        with transaction() as conn:
            cursor = conn.execute(
                sql,
                (
                    request.prodName,
                    request.prodCategory,
                    request.prodStatus,
                    str(request.listPrice),
                    request.effectiveDate.isoformat(),
                    request.ownerDeptCode,
                    request.remark,
                    prod_id,
                    request.rowVersion,
                ),
            )
            if cursor.rowcount != 1:
                return None
            row = conn.execute(
                "SELECT * FROM SAMPLE_PROD WHERE PROD_ID = ?",
                (prod_id,),
            ).fetchone()
        return _product(row)

    def list_trading(self, prod_id: int) -> Sequence[Trading]:
        with connection() as conn:
            rows = conn.execute(
                """
                SELECT *
                  FROM SAMPLE_TRADING
                 WHERE PROD_ID = ?
                 ORDER BY TRADE_DATE DESC, TRADING_ID DESC
                """,
                (prod_id,),
            ).fetchall()
        return [_trading(row) for row in rows]

    def get_trading(self, prod_id: int, trading_id: int) -> Trading | None:
        with connection() as conn:
            row = conn.execute(
                """
                SELECT * FROM SAMPLE_TRADING
                WHERE PROD_ID = ? AND TRADING_ID = ?
                """,
                (prod_id, trading_id),
            ).fetchone()
        return _trading(row) if row else None

    def create_trading(
        self,
        prod_id: int,
        request: TradingUpsertRequest,
        trade_amount: Decimal,
    ) -> Trading:
        with transaction() as conn:
            cursor = conn.execute(
                """
                INSERT INTO SAMPLE_TRADING
                (
                    PROD_ID, TRADE_DATE, TRADE_TYPE, COUNTERPARTY,
                    QUANTITY, UNIT_PRICE, TRADE_AMOUNT, MARKET_CODE, REMARK,
                    CREATED_BY, CREATED_AT, ROW_VERSION
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'LOCAL_USER', CURRENT_TIMESTAMP, 1)
                """,
                (
                    prod_id,
                    request.tradeDate.isoformat(),
                    request.tradeType,
                    request.counterparty,
                    str(request.quantity),
                    str(request.unitPrice),
                    str(trade_amount),
                    request.marketCode,
                    request.remark,
                ),
            )
            trading_id = int(cursor.lastrowid)
            row = conn.execute(
                "SELECT * FROM SAMPLE_TRADING WHERE TRADING_ID = ?",
                (trading_id,),
            ).fetchone()
        assert row is not None
        return _trading(row)

    def update_trading(
        self,
        prod_id: int,
        trading_id: int,
        request: TradingUpsertRequest,
        trade_amount: Decimal,
    ) -> Trading | None:
        assert request.rowVersion is not None
        with transaction() as conn:
            cursor = conn.execute(
                """
                UPDATE SAMPLE_TRADING
                   SET TRADE_DATE = ?,
                       TRADE_TYPE = ?,
                       COUNTERPARTY = ?,
                       QUANTITY = ?,
                       UNIT_PRICE = ?,
                       TRADE_AMOUNT = ?,
                       MARKET_CODE = ?,
                       REMARK = ?,
                       UPDATED_BY = 'LOCAL_USER',
                       UPDATED_AT = CURRENT_TIMESTAMP,
                       ROW_VERSION = ROW_VERSION + 1
                 WHERE PROD_ID = ?
                   AND TRADING_ID = ?
                   AND ROW_VERSION = ?
                """,
                (
                    request.tradeDate.isoformat(),
                    request.tradeType,
                    request.counterparty,
                    str(request.quantity),
                    str(request.unitPrice),
                    str(trade_amount),
                    request.marketCode,
                    request.remark,
                    prod_id,
                    trading_id,
                    request.rowVersion,
                ),
            )
            if cursor.rowcount != 1:
                return None
            row = conn.execute(
                "SELECT * FROM SAMPLE_TRADING WHERE TRADING_ID = ?",
                (trading_id,),
            ).fetchone()
        assert row is not None
        return _trading(row)

    def delete_trading(self, prod_id: int, trading_id: int, row_version: int) -> bool:
        with transaction() as conn:
            cursor = conn.execute(
                """
                DELETE FROM SAMPLE_TRADING
                 WHERE PROD_ID = ?
                   AND TRADING_ID = ?
                   AND ROW_VERSION = ?
                """,
                (prod_id, trading_id, row_version),
            )
        return cursor.rowcount == 1

    def dashboard_summary(self) -> DashboardSummary:
        with connection() as conn:
            row = conn.execute(
                """
                SELECT
                    (SELECT COUNT(*) FROM SAMPLE_PROD) AS PRODUCT_COUNT,
                    COUNT(T.TRADING_ID) AS TRADING_COUNT,
                    COALESCE(SUM(T.TRADE_AMOUNT), 0) AS TOTAL_AMOUNT
                FROM SAMPLE_TRADING T
                """
            ).fetchone()
        assert row is not None
        return DashboardSummary(
            productCount=row["PRODUCT_COUNT"],
            tradingCount=row["TRADING_COUNT"],
            totalTradingAmount=Decimal(str(row["TOTAL_AMOUNT"])),
            currencyCode="TWD",
        )

    def product_aggregates(self) -> Sequence[ProductTradingAggregate]:
        with connection() as conn:
            rows = conn.execute(
                """
                SELECT
                    P.PROD_ID,
                    P.PROD_CODE,
                    P.PROD_NAME,
                    COUNT(T.TRADING_ID) AS TRADING_COUNT,
                    COALESCE(SUM(T.TRADE_AMOUNT), 0) AS TRADING_AMOUNT
                FROM SAMPLE_PROD P
                LEFT JOIN SAMPLE_TRADING T ON T.PROD_ID = P.PROD_ID
                GROUP BY P.PROD_ID, P.PROD_CODE, P.PROD_NAME
                ORDER BY P.PROD_CODE
                """
            ).fetchall()
        return [
            ProductTradingAggregate(
                prodId=row["PROD_ID"],
                prodCode=row["PROD_CODE"],
                prodName=row["PROD_NAME"],
                tradingCount=row["TRADING_COUNT"],
                tradingAmount=Decimal(str(row["TRADING_AMOUNT"])),
            )
            for row in rows
        ]

    def monthly_aggregates(self, prod_id: int) -> Sequence[MonthlyTradingAggregate]:
        with connection() as conn:
            rows = conn.execute(
                """
                SELECT
                    substr(TRADE_DATE, 1, 7) AS MONTH_KEY,
                    COUNT(*) AS TRADING_COUNT,
                    SUM(TRADE_AMOUNT) AS TRADING_AMOUNT
                FROM SAMPLE_TRADING
                WHERE PROD_ID = ?
                GROUP BY substr(TRADE_DATE, 1, 7)
                ORDER BY MONTH_KEY
                """,
                (prod_id,),
            ).fetchall()
        return [
            MonthlyTradingAggregate(
                month=row["MONTH_KEY"],
                tradingCount=row["TRADING_COUNT"],
                tradingAmount=Decimal(str(row["TRADING_AMOUNT"])),
            )
            for row in rows
        ]
