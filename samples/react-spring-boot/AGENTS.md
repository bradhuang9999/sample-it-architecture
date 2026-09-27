# AGENTS.md

這個 Repository 是公司 IT 正式應用的教學模板，採用長時間 Coding Agent 工作模式。

本檔案必須保持短小，作為 Agent 的入口與路由。不要把所有規則持續堆進本檔案；需要細節時，讀取對應文件。

## 開工流程

修改程式前：

1. 確認目前位於 Repository Root。
2. 讀取 `ARCHITECTURE.md`，理解系統地圖、Business Module 與硬性依賴規則。
3. 讀取 `docs/QUALITY_SCORE.md`，了解目前已知弱點。
4. 讀取 `docs/PLANS.md` 與本次相關的 active execution plan。
5. 讀取相關 `docs/product-specs/`。
6. Backend 工作再讀 `backend/AGENTS.md`；Frontend 工作再讀 `frontend/AGENTS.md`。
7. Database 工作先讀 `docs/DATABASE.md` 與 `database/CURRENT_SCHEMA.sql`。
8. 修改前先執行與本次範圍相關的 baseline verification；baseline 失敗時，不要把既有失敗誤算成新變更成果。

## 路由地圖

- `ARCHITECTURE.md`：頂層架構、Business Module、依賴規則
- `docs/design-docs/index.md`：架構決策與核心信念
- `docs/product-specs/index.md`：產品行為與驗收條件
- `docs/PLANS.md`：Execution Plan 使用方式
- `docs/QUALITY_SCORE.md`：產品與架構健康度
- `docs/RELIABILITY.md`：執行、監控與可恢復性
- `docs/SECURITY.md`：Security Boundary 與正式環境要求
- `docs/FRONTEND.md`：React / TypeScript / State / UI 規則
- `docs/DATABASE.md`：SQLite Local Standalone 與正式 Database Governance
- `docs/TESTING.md`：驗證層級與測試規則

## 工作約定

- 一次只處理一個有邊界的 Business Feature 或 Execution Plan。
- 優先沿既有 Feature 修改，不要先建立新的 Generic Framework。
- 不得因為 Agent 能快速產生程式碼，就增加不必要的 Architecture Complexity。
- 不能只靠閱讀程式或 Agent 自我宣告判定完成，必須留下可執行驗證。
- 重複出現的 Review 問題應升級成 Type、Lint、Test、Architecture Rule 或 CI Gate。
- 文件、規格與註解以繁體中文為優先；程式識別名稱維持英文。
- 不得自行新增 Framework / State Library / ORM / Database Migration Tool；需要新增依賴時先在 Execution Plan 說明理由。

## Database 硬規則

- Local Profile 可自動建立 SQLite Sample Schema / Data，目的只限本機教學與驗證。
- 正式企業 Database Schema 由公司人工變更流程管理；Application 不得自行執行正式環境 DDL。
- 禁止加入 Flyway、Liquibase 或其他自動 Schema Migration Framework。
- `database/CURRENT_SCHEMA.sql` 只代表目前專案最新版 Schema；正式系統採用時應同步為已核准的正式 Schema。
- Repo 不保存 migration chain。
- 需要修改 Schema 時，先提出需求與 DDL 建議；正式異動必須依公司流程填單並由人員執行。
- 正式企業 Database 異動完成後才更新正式專案的 `CURRENT_SCHEMA.sql`。
- 不得為了讓程式比較好寫而自行改 Schema。

## 完成定義

一個變更只有在以下項目都成立時才算完成：

- Spec 要求的行為已實作。
- 受影響的 Type Check / Lint / Unit Test / Architecture Test 已通過。
- 需要 UI 行為驗證時，E2E 或人工驗證證據已完成。
- 受影響的 Product Spec / Architecture / Database 文件保持最新。
- 沒有留下未說明的 Framework、Dependency 或 Schema 變更。
- Repository 能依標準啟動方式重新啟動。

## 收尾

1. 更新 active execution plan 的進度與驗證結果。
2. 如產品或架構健康度有明顯變化，更新 `docs/QUALITY_SCORE.md`。
3. 延後處理的問題記錄於 `docs/exec-plans/tech-debt-tracker.md`。
4. 完成的 plan 移到 `docs/exec-plans/completed/`。
5. 說明本次變更範圍、驗證證據、仍存在的風險與下一步。
