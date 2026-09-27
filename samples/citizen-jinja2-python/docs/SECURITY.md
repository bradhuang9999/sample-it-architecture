# Security

Citizen Template 的安全核心不是讓 Citizen 自己實作更多 Security Code，而是限制邊界。

## 必守規則

- 不自行建立帳號密碼系統。
- 不直接連公司核心 Database。
- 不自行簽發 JWT。
- 正式環境應整合公司 SSO / Keycloak 或由平台 Gateway 提供身分。
- 使用者原本不能做的事情，Agent / Citizen App 也不能替他做。
- 核心 Authorization 必須由 Enterprise API 執行。

目前 Local Sample 沒有正式 Authentication，只用於教學與驗證。
