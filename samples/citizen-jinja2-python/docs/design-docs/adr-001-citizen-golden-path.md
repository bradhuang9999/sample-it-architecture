# ADR-001：Citizen Golden Path

## Decision

預設技術：Python + FastAPI + Pydantic + Jinja2 + Bootstrap + ECharts + SQLite。

## Rationale

- Citizen 主要能力應集中於 Business Problem。
- Python 適合 Excel / PDF / Data / AI 等 Citizen Use Case。
- FastAPI / Pydantic 提供清楚的 Input / Output Contract。
- Server Rendering 降低 Frontend Toolchain 複雜度。
