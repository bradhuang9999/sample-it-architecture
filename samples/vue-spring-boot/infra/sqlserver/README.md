# Local SQL Server

> 此目錄是改用 SQLite 前留下的舊教學資產；目前 Vue 專案的 Backend、Schema 與 Local 啟動流程均不使用此 compose。請勿將此目錄的 SQL Server 啟動步驟用於目前的 SQLite Schema。

此目錄只提供開發者快速啟動 Local SQL Server 的選項，**不代表 Production Database 部署方式**。

## 啟動

1. 複製 `.env.example` 為 `.env`，更換 Local 密碼。
2. 執行：

```bash
docker compose --env-file .env up -d
```

3. 以 SSMS / sqlcmd **人工執行**：
   - `database/CURRENT_SCHEMA.sql`
   - `database/LOCAL_SAMPLE_DATA.sql`

## 明確限制

- Application 不會自動建立或修改 Schema。
- 本 compose 不會自動掛載 SQL 初始化腳本。
- Production Schema 異動仍須依公司填單、審核、人工執行流程。
