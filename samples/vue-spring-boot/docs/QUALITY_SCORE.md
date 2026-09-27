# Quality Score

本文件用來觀察 Repository 本身是否變得更容易理解、修改與驗證。

評級：A = 明確且有自動驗證；B = 可維護但仍有人工依賴；C = 邊界或驗證不足；D = 高風險。

## Product Domain

| Domain | Verification | Agent Legibility | Test Stability | Grade | Gap |
| --- | --- | --- | --- | --- | --- |
| Master / Detail | Unit + Typecheck + E2E spec | Feature 路徑清楚 | 初始模板 | B | 尚未在公司 CI 實際跑過 |
| Dashboard / Drill-down | Unit + Typecheck + E2E spec | State ownership 明確 | 初始模板 | B | 尚未有真實大量資料測試 |

## Architecture Layer

| Layer | Boundary | Mechanical Rule | Grade | Gap |
| --- | --- | --- | --- | --- |
| Backend Module | Spring Modulith | `ApplicationModules.verify()` | A | 未加入更多 Domain 後仍需持續驗證 |
| Database | Local SQLite + formal DB human-governed | Current Schema + SQLite integration test | B | 正式 DB Schema drift 仍依流程管控 |
| Frontend | Feature-oriented | TypeScript + ESLint | B | Feature boundary 尚未以 custom lint 強制；API Type 目前仍由前端明確定義，尚未導入 OpenAPI code generation |
| E2E | Playwright | Browser test | B | 需在目標環境安裝 browser |

## 更新時機

- 完成大型 Feature
- 發現重複 Review 問題
- Architecture 邊界調整
- 導入 / 移除 Harness 規則
