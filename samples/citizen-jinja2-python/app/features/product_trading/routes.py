from __future__ import annotations

from fastapi import APIRouter, Request, Response, status
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

from app.config import PROJECT_ROOT
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
from app.features.product_trading.service import ProductTradingService

router = APIRouter()
service = ProductTradingService()
templates = Jinja2Templates(directory=str(PROJECT_ROOT / "app" / "templates"))


@router.get("/master-detail", response_class=HTMLResponse)
def master_detail_page(request: Request) -> HTMLResponse:
    return templates.TemplateResponse(
        request=request,
        name="master_detail.html",
        context={"page_title": "Product / Trading Master Detail"},
    )


@router.get("/dashboard", response_class=HTMLResponse)
def dashboard_page(request: Request) -> HTMLResponse:
    return templates.TemplateResponse(
        request=request,
        name="dashboard.html",
        context={"page_title": "Product / Trading Dashboard"},
    )


@router.get("/api/products", response_model=list[ProductSummary])
def get_products() -> list[ProductSummary]:
    return service.list_products()


@router.get("/api/products/{prod_id}", response_model=Product)
def get_product(prod_id: int) -> Product:
    return service.get_product(prod_id)


@router.put("/api/products/{prod_id}", response_model=Product)
def update_product(prod_id: int, request: ProductUpdateRequest) -> Product:
    return service.update_product(prod_id, request)


@router.get("/api/products/{prod_id}/trades", response_model=list[Trading])
def get_trading(prod_id: int) -> list[Trading]:
    return service.list_trading(prod_id)


@router.post(
    "/api/products/{prod_id}/trades",
    response_model=Trading,
    status_code=status.HTTP_201_CREATED,
)
def create_trading(prod_id: int, request: TradingUpsertRequest) -> Trading:
    return service.create_trading(prod_id, request)


@router.put("/api/products/{prod_id}/trades/{trading_id}", response_model=Trading)
def update_trading(prod_id: int, trading_id: int, request: TradingUpsertRequest) -> Trading:
    return service.update_trading(prod_id, trading_id, request)


@router.delete("/api/products/{prod_id}/trades/{trading_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_trading(prod_id: int, trading_id: int, rowVersion: int) -> Response:
    service.delete_trading(prod_id, trading_id, rowVersion)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/api/dashboard/summary", response_model=DashboardSummary)
def get_dashboard_summary() -> DashboardSummary:
    return service.dashboard_summary()


@router.get("/api/dashboard/products", response_model=list[ProductTradingAggregate])
def get_product_aggregates() -> list[ProductTradingAggregate]:
    return service.product_aggregates()


@router.get(
    "/api/dashboard/products/{prod_id}/monthly",
    response_model=list[MonthlyTradingAggregate],
)
def get_monthly_aggregates(prod_id: int) -> list[MonthlyTradingAggregate]:
    return service.monthly_aggregates(prod_id)


@router.get("/api/dashboard/products/{prod_id}/trades", response_model=list[Trading])
def get_dashboard_trading(prod_id: int) -> list[Trading]:
    return service.list_trading(prod_id)
