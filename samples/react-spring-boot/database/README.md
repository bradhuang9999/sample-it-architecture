# Database

## 目的

本目錄保存目前專案需要的 Database Current State。

目前教學模板採 **SQLite**，目的是讓專案可以 Local Standalone 驗證，不需要另外安裝 SQL Server 或啟動 Docker。

## 檔案

- `CURRENT_SCHEMA.sql`：目前最新版 Schema，包含兩個 Sample Table 與 Index。
- `LOCAL_SAMPLE_DATA.sql`：Local 教學資料，只供開發與驗證。

Repo 不保存 `V001`、`V002` 等 Migration Chain，也不使用 Flyway / Liquibase。

## Local 啟動

Spring Boot Local Profile 會：

1. 建立 `data/wut1-sample.db`。
2. 執行 `CURRENT_SCHEMA.sql`。
3. 執行 `LOCAL_SAMPLE_DATA.sql`。

Schema 使用 `CREATE ... IF NOT EXISTS`，Sample Data 使用 `INSERT OR IGNORE`，因此重啟不會重複新增。

若要回到乾淨資料：刪除 `data/wut1-sample.db` 後重新啟動。

## 正式 Database Governance

Local SQLite 的自動初始化只是教學便利機制。

未來建立正式企業應用時仍遵循：

- Schema 異動需填單、審核、由授權人員人工執行。
- Application 不自動修改正式 Database Schema。
- Git 只保存當下最新版正式 Schema，不保存 Migration Chain。
- 若正式 Database 不是 SQLite，`CURRENT_SCHEMA.sql` 必須改成該正式 Database 的真實 Schema。

## 命名

即使 SQLite 本身不要求大寫，本 Template 仍維持公司慣例：

- TABLE：英文全大寫
- COLUMN：英文全大寫
- CONSTRAINT：英文全大寫
- INDEX：英文全大寫
