# Verification Evidence — 2026-09-25

本檔記錄 ZIP 產出前實際完成的驗證，避免把「已撰寫」誤當成「已完整 Build」。

## 已完成

- `pom.xml` / `backend/pom.xml` XML parse：通過。
- `feature_list.json` / `frontend/package.json` / `frontend/tsconfig.json` JSON parse：通過。
- Backend Domain + `RowVersionCodec` 使用 JDK Compiler 驗證：通過。
- Backend main / test source 使用本地 API stub 進行 Java type/syntax compile：通過。
- Application / Domain Layer 不再依賴 `producttrading.api` DTO；HTTP DTO mapping 收斂在 API Layer：通過。
- Frontend `.ts` 與 Vue `<script setup>` 抽取後，以 TypeScript Compiler + API stub 驗證：通過。
- Vue Template 進行 HTML parse smoke check：通過。
- `LOCAL_SAMPLE_DATA.sql` 共 18 筆 Trading，逐筆驗證 `TRADE_AMOUNT = QUANTITY × UNIT_PRICE`：通過。
- `mvnw` shell syntax check：通過。

## 本執行環境尚未完成

目前 Artifact 產出容器無法完成對 npm / Maven Repository 的外部 dependency 下載，因此沒有辦法取得完整正式 dependency，以下驗證需在可連公司 Artifact Repository 或公開 Registry 的環境執行：

```text
./mvnw clean package
npm run typecheck
npm run lint
npm run build
```

另外，以下驗證需要 SQL Server / Browser Runtime：

```text
SQL Server schema smoke test
Spring Boot + SQL Server integration smoke test
Playwright E2E
```

## Review 建議

第一輪請優先 Review：

1. Business Feature 目錄邊界是否符合公司開發方式。
2. `CURRENT_SCHEMA.sql` 是否符合公司 DB Naming / Change Governance。
3. Master / Detail 的 UI 密度與操作模式。
4. Dashboard Drill-down 的 State ownership 是否夠直覺。
5. `AGENTS.md` 是否足以限制 Coding Agent 不自行擴充 Framework / Schema。
