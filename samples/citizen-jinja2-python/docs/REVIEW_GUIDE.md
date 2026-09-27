# Review Guide

第一輪 Review 不建議逐行看 Python。

請依序看：

1. `SPEC.md`：Business Problem 是否合理？
2. `AGENTS.md`：Citizen / Agent 邊界是否足夠？
3. `ARCHITECTURE.md`：是否避免過度工程化？
4. `app/features/product_trading/`：一個 Feature 是否容易找到？
5. `docs/BUSINESS_RULES.md`：Business Rule 是否可驗證？
6. `tests/`：測試是否證明「做對」，而不是只證明程式能跑？

## 這個 Template 刻意沒有的東西

- React / Vue
- npm / Vite
- ORM
- Migration Framework
- Redux / Global State
- Microservices
- 自製 Authentication

如果有人想加入上述技術，必須先說明是哪個 Business Requirement 無法由現有 Golden Path 解決。
