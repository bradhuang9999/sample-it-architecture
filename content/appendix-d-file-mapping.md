---
title: 專案檔案與教學章節對照
group: reference
kind: reference
---

# 專案檔案與教學章節對照

## 173. IT Vue

| 實際檔案 / 區域 | 教學重點 |
|---|---|
| `frontend/src/main.ts` | ES Module、Vue app entry、Router / CSS bootstrap |
| `frontend/src/App.vue` | SFC、App root |
| `frontend/src/app/router.ts` | Vue Router、route tree、hash history |
| `frontend/src/features/.../types.ts` | TypeScript interface/type/union |
| `frontend/src/features/.../api.ts` | async/await、Promise、Fetch API abstraction |
| `ProductTradingPage.vue` | `ref`、`computed`、async flow、state ownership |
| `ProductMasterForm.vue` | `reactive`、`watch`、props、emits、`v-model`、form submit |
| `TradingDetailGrid.vue` | `v-for`、`v-if`、events |
| `TradingEditPanel.vue` | form state、number/date input、CRUD request |
| Dashboard components | ECharts option、events、drill-down |
| `shared/chart/EChart.vue` | template ref、lifecycle、ResizeObserver、dispose |
| `vite.config.ts` | Vite plugin、proxy、build output |
| `eslint.config.js` | lint config |
| `playwright.config.ts` | E2E config |
| `e2e/*.spec.ts` | Browser test syntax |

## 174. IT React

| 實際檔案 / 區域 | 教學重點 |
|---|---|
| `frontend/src/main.tsx` | `createRoot`、`StrictMode`、TSX |
| `app/providers.tsx` | `PropsWithChildren`、QueryClient Provider |
| `app/router.tsx` | React Router route tree |
| `product-trading.api.ts` | HTTP / JSON / TypeScript |
| `product-trading.query-keys.ts` | Query key、spread、`as const` |
| `product-trading.queries.ts` | `useQuery`、enabled、server state |
| `product-trading.mutations.ts` | `useMutation`、invalidate query |
| `ProductTradingPage.tsx` | useState + Query composition |
| `ProductMasterForm.tsx` | controlled form、event type、props callbacks |
| Grid / Edit Panel | `.map()`、conditional render、CRUD interaction |
| Dashboard components | useMemo、ECharts、drill-down |
| `shared/chart/EChart.tsx` | useRef/useEffect/cleanup/ResizeObserver |
| `vite.config.ts` | React Vite build |
| `e2e/*.spec.ts` | framework-independent E2E |

## 175. IT 共用 Backend

| 實際檔案 / 區域 | 教學重點 |
|---|---|
| `SampleApplication.java` | Spring Boot main |
| `api/*Controller.java` | REST mapping |
| `api/dto/*` | record + validation |
| `ProductTradingApiMapper.java` | DTO/domain mapping、Stream |
| `application/*Service.java` | use case、transaction、error |
| `*Command.java` | command record |
| `domain/Product.java` 等 | domain record / enum |
| `ProductTradingRepository.java` | interface / dependency inversion |
| `JdbcProductTradingRepository.java` | SQL text blocks、JdbcClient、ResultSet mapping |
| `shared/error/*` | exception → HTTP |
| `AuditUserProvider.java` | config injection / future auth boundary |
| `application.yml` | common config |
| `application-local.yml` | local profile / SQLite / SQL init |
| `ArchitectureTest.java` | Modulith verification |
| `LocalSqliteIntegrationTest.java` | local DB integration |
| `ProductTradingServiceTest.java` | business unit/service test |
| root `pom.xml` | parent/build properties/dependency management |
| `backend/pom.xml` | dependencies/plugins/frontend build/JAR |

## 176. Citizen Python

| 實際檔案 / 區域 | 教學重點 |
|---|---|
| `app/main.py` | FastAPI app、lifespan、static、router、exception handler |
| `app/config.py` | Path、env、dataclass |
| `models.py` | Pydantic / Literal / Field |
| `repository.py` | sqlite3、SQL、row mapping、transaction |
| `service.py` | business rule / Decimal / exceptions |
| `routes.py` | API route + HTML template route |
| `shared/db.py` | contextmanager、yield、commit/rollback |
| `shared/audit.py` | logging / kwargs |
| `base.html` | Jinja inheritance base |
| `master_detail.html` | Jinja block + Bootstrap form/table |
| `dashboard.html` | chart container + ECharts script |
| `master-detail.js` | fetch / DOM / event / CRUD |
| `dashboard.js` | Promise.all / ECharts / drill-down |
| `tests/conftest.py` | fixture / temp DB / TestClient |
| `tests/test_api.py` | API assertions |
| `tests/test_business_rules.py` | rule verification |
| `e2e/test_user_journey.py` | Python Playwright |
| `pyproject.toml` | project metadata / pytest / Ruff / mypy config |
| `requirements*.txt` | dependency pin / dev dependency |

---
