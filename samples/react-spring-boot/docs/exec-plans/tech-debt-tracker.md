# Technical Debt Tracker

| ID | 項目 | 風險 | 處理時機 |
| --- | --- | --- | --- |
| TD-001 | Sample 尚未接公司 Keycloak | 正式上線不可接受 | 建立真實應用時 |
| TD-002 | SQLite 與未來正式 Database Dialect 可能不同 | 正式切換 DB 時需重新驗證 Repository SQL | 建立真實應用時 |
| TD-003 | Frontend Feature Boundary 尚未 custom lint | 目前單一 Feature 風險低 | Feature 增加後 |

## API Contract 自動同步

- 現況：Frontend 以 TypeScript interface 明確描述 Request / Response，Backend 以 Java DTO 描述。
- 風險：大型系統擴充後，兩端型別可能發生 drift。
- 觸發條件：API 數量明顯增加、跨多個前端 Consumer，或公司決定把 OpenAPI 設為正式 Contract。
- 候選改善：由 OpenAPI 產生 TypeScript client / model，`generated` 內容禁止人工修改。
- 本版決策：教學 Sample 先保留最少 toolchain，將這項差距明確列入 Review，而不是偷偷增加 Generator。
