/*
    Product / Trading Sample - Current SQLite Schema

    規則：
    1. 本檔只代表「目前最新版 Schema」，不是 Migration Script Chain。
    2. Local Standalone 會在啟動時建立 SQLite Table；不需要額外 Database Server。
    3. Table / Column / Constraint / Index 名稱維持公司慣例：英文全大寫。
    4. 若未來使用公司正式 Database，應重新產出對應正式 Database 的 CURRENT_SCHEMA.sql，
       不保留 Migration Chain。
*/

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS SAMPLE_PROD
(
    PROD_ID             INTEGER PRIMARY KEY AUTOINCREMENT,
    PROD_CODE           TEXT              NOT NULL,
    PROD_NAME           TEXT              NOT NULL,
    PROD_CATEGORY       TEXT              NOT NULL,
    PROD_STATUS         TEXT              NOT NULL,
    CURRENCY_CODE       TEXT              NOT NULL,
    LIST_PRICE          NUMERIC           NOT NULL,
    EFFECTIVE_DATE      TEXT              NOT NULL,
    OWNER_DEPT_CODE     TEXT              NOT NULL,
    REMARK              TEXT              NULL,
    CREATED_BY          TEXT              NOT NULL,
    CREATED_AT          TEXT              NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_BY          TEXT              NULL,
    UPDATED_AT          TEXT              NULL,
    ROW_VERSION         INTEGER           NOT NULL DEFAULT 1,

    CONSTRAINT UK_SAMPLE_PROD_CODE
        UNIQUE (PROD_CODE),

    CONSTRAINT CK_SAMPLE_PROD_STATUS
        CHECK (PROD_STATUS IN ('ACTIVE', 'INACTIVE')),

    /*
       教學 Dashboard 直接加總 TRADE_AMOUNT，因此 Sample Domain 固定使用 TWD。
       真實多幣別系統必須先定義匯率與基準幣別規則，不可直接跨幣別相加。
    */
    CONSTRAINT CK_SAMPLE_PROD_CURRENCY
        CHECK (CURRENCY_CODE = 'TWD'),

    CONSTRAINT CK_SAMPLE_PROD_LIST_PRICE
        CHECK (LIST_PRICE >= 0),

    CONSTRAINT CK_SAMPLE_PROD_ROW_VERSION
        CHECK (ROW_VERSION > 0)
);

CREATE TABLE IF NOT EXISTS SAMPLE_TRADING
(
    TRADING_ID          INTEGER PRIMARY KEY AUTOINCREMENT,
    PROD_ID             INTEGER           NOT NULL,
    TRADE_DATE          TEXT              NOT NULL,
    TRADE_TYPE          TEXT              NOT NULL,
    COUNTERPARTY        TEXT              NOT NULL,
    QUANTITY            NUMERIC           NOT NULL,
    UNIT_PRICE          NUMERIC           NOT NULL,
    TRADE_AMOUNT        NUMERIC           NOT NULL,
    MARKET_CODE         TEXT              NULL,
    REMARK              TEXT              NULL,
    CREATED_BY          TEXT              NOT NULL,
    CREATED_AT          TEXT              NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_BY          TEXT              NULL,
    UPDATED_AT          TEXT              NULL,
    ROW_VERSION         INTEGER           NOT NULL DEFAULT 1,

    CONSTRAINT FK_SAMPLE_TRADING_PROD
        FOREIGN KEY (PROD_ID)
        REFERENCES SAMPLE_PROD(PROD_ID),

    CONSTRAINT CK_SAMPLE_TRADING_TYPE
        CHECK (TRADE_TYPE IN ('BUY', 'SELL')),

    CONSTRAINT CK_SAMPLE_TRADING_QUANTITY
        CHECK (QUANTITY > 0),

    CONSTRAINT CK_SAMPLE_TRADING_UNIT_PRICE
        CHECK (UNIT_PRICE >= 0),

    CONSTRAINT CK_SAMPLE_TRADING_AMOUNT
        CHECK (TRADE_AMOUNT >= 0),

    CONSTRAINT CK_SAMPLE_TRADING_ROW_VERSION
        CHECK (ROW_VERSION > 0)
);

CREATE INDEX IF NOT EXISTS IX_SAMPLE_PROD_STATUS
    ON SAMPLE_PROD (PROD_STATUS, PROD_CODE);

CREATE INDEX IF NOT EXISTS IX_SAMPLE_TRADING_PROD_DATE
    ON SAMPLE_TRADING (PROD_ID, TRADE_DATE DESC);

CREATE INDEX IF NOT EXISTS IX_SAMPLE_TRADING_DATE
    ON SAMPLE_TRADING (TRADE_DATE);
