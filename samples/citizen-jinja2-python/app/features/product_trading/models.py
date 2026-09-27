from __future__ import annotations

from datetime import date
from decimal import Decimal
from typing import Literal

from pydantic import BaseModel, Field


class ProductSummary(BaseModel):
    prodId: int
    prodCode: str
    prodName: str
    prodStatus: str


class Product(BaseModel):
    prodId: int
    prodCode: str
    prodName: str
    prodCategory: str
    prodStatus: str
    currencyCode: str
    listPrice: Decimal
    effectiveDate: date
    ownerDeptCode: str
    remark: str | None = None
    rowVersion: int


class ProductUpdateRequest(BaseModel):
    prodName: str = Field(min_length=1, max_length=100)
    prodCategory: str = Field(min_length=1, max_length=30)
    prodStatus: Literal["ACTIVE", "INACTIVE"]
    listPrice: Decimal = Field(ge=0)
    effectiveDate: date
    ownerDeptCode: str = Field(min_length=1, max_length=30)
    remark: str | None = Field(default=None, max_length=500)
    rowVersion: int = Field(gt=0)


class Trading(BaseModel):
    tradingId: int
    prodId: int
    tradeDate: date
    tradeType: Literal["BUY", "SELL"]
    counterparty: str
    quantity: Decimal
    unitPrice: Decimal
    tradeAmount: Decimal
    marketCode: str | None = None
    remark: str | None = None
    rowVersion: int


class TradingUpsertRequest(BaseModel):
    tradeDate: date
    tradeType: Literal["BUY", "SELL"]
    counterparty: str = Field(min_length=1, max_length=100)
    quantity: Decimal = Field(gt=0)
    unitPrice: Decimal = Field(ge=0)
    marketCode: str | None = Field(default=None, max_length=20)
    remark: str | None = Field(default=None, max_length=500)
    rowVersion: int | None = Field(default=None, gt=0)


class DashboardSummary(BaseModel):
    productCount: int
    tradingCount: int
    totalTradingAmount: Decimal
    currencyCode: str


class ProductTradingAggregate(BaseModel):
    prodId: int
    prodCode: str
    prodName: str
    tradingCount: int
    tradingAmount: Decimal


class MonthlyTradingAggregate(BaseModel):
    month: str
    tradingCount: int
    tradingAmount: Decimal
