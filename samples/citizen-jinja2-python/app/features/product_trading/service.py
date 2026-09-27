from __future__ import annotations

from decimal import Decimal, ROUND_HALF_UP

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
from app.features.product_trading.repository import ProductTradingRepository
from app.shared.audit import audit
from app.shared.errors import ConflictError, NotFoundError


class ProductTradingService:
    def __init__(self, repository: ProductTradingRepository | None = None) -> None:
        self.repository = repository or ProductTradingRepository()

    @staticmethod
    def calculate_trade_amount(quantity: Decimal, unit_price: Decimal) -> Decimal:
        """BR-001：交易金額由 Backend 統一計算到小數兩位。"""
        return (quantity * unit_price).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)

    def list_products(self) -> list[ProductSummary]:
        return list(self.repository.list_products())

    def get_product(self, prod_id: int) -> Product:
        product = self.repository.get_product(prod_id)
        if product is None:
            raise NotFoundError(f"找不到 Product：{prod_id}")
        return product

    def update_product(self, prod_id: int, request: ProductUpdateRequest) -> Product:
        # 先確認 Entity 存在，才能把「不存在」和「版本衝突」分開回報。
        self.get_product(prod_id)
        updated = self.repository.update_product(prod_id, request)
        if updated is None:
            raise ConflictError("Product 已被其他人修改，請重新載入後再更新。")
        audit("update_product", prod_id=prod_id)
        return updated

    def list_trading(self, prod_id: int) -> list[Trading]:
        self.get_product(prod_id)
        return list(self.repository.list_trading(prod_id))

    def create_trading(self, prod_id: int, request: TradingUpsertRequest) -> Trading:
        self.get_product(prod_id)
        amount = self.calculate_trade_amount(request.quantity, request.unitPrice)
        created = self.repository.create_trading(prod_id, request, amount)
        audit("create_trading", prod_id=prod_id, trading_id=created.tradingId)
        return created

    def update_trading(self, prod_id: int, trading_id: int, request: TradingUpsertRequest) -> Trading:
        if request.rowVersion is None:
            raise ConflictError("修改 Trading 時必須提供 rowVersion。")
        if self.repository.get_trading(prod_id, trading_id) is None:
            raise NotFoundError(f"找不到 Trading：{trading_id}")
        amount = self.calculate_trade_amount(request.quantity, request.unitPrice)
        updated = self.repository.update_trading(prod_id, trading_id, request, amount)
        if updated is None:
            raise ConflictError("Trading 已被其他人修改，請重新載入後再更新。")
        audit("update_trading", prod_id=prod_id, trading_id=trading_id)
        return updated

    def delete_trading(self, prod_id: int, trading_id: int, row_version: int) -> None:
        if self.repository.get_trading(prod_id, trading_id) is None:
            raise NotFoundError(f"找不到 Trading：{trading_id}")
        if not self.repository.delete_trading(prod_id, trading_id, row_version):
            raise ConflictError("Trading 已被其他人修改，請重新載入後再刪除。")
        audit("delete_trading", prod_id=prod_id, trading_id=trading_id)

    def dashboard_summary(self) -> DashboardSummary:
        return self.repository.dashboard_summary()

    def product_aggregates(self) -> list[ProductTradingAggregate]:
        return list(self.repository.product_aggregates())

    def monthly_aggregates(self, prod_id: int) -> list[MonthlyTradingAggregate]:
        self.get_product(prod_id)
        return list(self.repository.monthly_aggregates(prod_id))
