from __future__ import annotations

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles

from app.config import PROJECT_ROOT
from app.features.product_trading.routes import router as product_trading_router
from app.shared.db import initialize_local_database
from app.shared.errors import ConflictError, NotFoundError

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s %(message)s")


@asynccontextmanager
async def lifespan(_: FastAPI):
    initialize_local_database()
    yield


app = FastAPI(
    title="WUT1 Citizen Application Template",
    version="1.0.0",
    lifespan=lifespan,
)

app.mount(
    "/static",
    StaticFiles(directory=str(PROJECT_ROOT / "app" / "static")),
    name="static",
)
app.include_router(product_trading_router)


@app.get("/", include_in_schema=False)
def root() -> RedirectResponse:
    return RedirectResponse(url="/master-detail")


@app.exception_handler(NotFoundError)
def handle_not_found(_: Request, exc: NotFoundError) -> JSONResponse:
    return JSONResponse(status_code=404, content={"detail": str(exc)})


@app.exception_handler(ConflictError)
def handle_conflict(_: Request, exc: ConflictError) -> JSONResponse:
    return JSONResponse(status_code=409, content={"detail": str(exc)})
