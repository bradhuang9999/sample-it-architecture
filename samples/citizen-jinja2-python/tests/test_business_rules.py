from decimal import Decimal

from app.features.product_trading.service import ProductTradingService


def test_trade_amount_is_calculated_by_backend() -> None:
    amount = ProductTradingService.calculate_trade_amount(
        Decimal("3.0000"),
        Decimal("1250.5550"),
    )
    assert amount == Decimal("3751.67")
