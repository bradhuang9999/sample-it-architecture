# Security

## 本 Sample 的邊界

此 Template 主要教學範圍是 Architecture、Master / Detail、Dashboard、DB Access 與 Agent Harness。

為避免把企業 SSO 細節與教學 Sample 混在一起，Local Sample 預設不實作公司 Keycloak 登入流程。

**正式系統上線前必須接入公司標準 Authentication / Authorization。**

## 正式環境原則

- Authentication 使用公司 Keycloak / OIDC。
- Authorization 必須由 Backend 執行，Frontend 隱藏按鈕不能視為權限控制。
- 不自建 Password Table。
- 不自行發明 JWT 格式。
- 不把 Access Token、Password、Client Secret 寫入 Git。
- Database Account 使用最小權限。
- Application 不擁有正式環境 DDL 權限。
- 對外部 API 的呼叫需有 timeout、error handling 與 audit boundary。

## Dependency

新增第三方 dependency 前確認：

- License
- Maintenance status
- Known vulnerability
- 是否真的需要

## AI 產生程式

Agent 產生的 Security Code 不得因「可以執行」就直接視為通過；Security Boundary 需要人工 Review 與公司安全檢查。
